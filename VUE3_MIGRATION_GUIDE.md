# Story — Vue 2 → Vue 3 Migration Guide

**Project:** `d:\app\story` (working name: "story" / "Tell Me A Story Mom")
**Generated:** 2026-09-29
**Status:** Vue 2 codebase mid-migration to Vue 3 + Vite — 4 blockers + ~12 code changes identified

---

## 1. Executive Summary

The project has already been partially migrated:

- `package.json` targets **Vue 3.5.43**, **vue-router 4.6.4**, **Vite 6**, and includes `@vitejs/plugin-vue` (the Vue 3 Vite plugin).
- `src/main.js` already uses the Vue 3 `createApp(...).mount(...)` API.
- `src/App.vue` already uses `<script setup>`.

However, the migration is incomplete. The app **cannot currently build or run** because of 4 blockers (missing `index.html`, wrong Vite plugin, broken router, dead Vue CLI config). After those are fixed, ~12 more Vue 2 patterns must be updated (filters, undeclared `$emit` events, `v-html` on components, dead files, ESLint stack, etc.).

Good news: the components use **Options API**, which is fully supported in Vue 3 — no rewrite of `data` / `computed` / `watch` / `methods` is needed. The migration is mostly mechanical.

---

## 2. Current Project State

| Area | Status |
|------|--------|
| Vue runtime | ✅ Vue 3.5.43 in `package.json` |
| Router | ⚠️ vue-router 4.6.4 installed, but `router/index.js` has bugs |
| Build tool | ⚠️ Vite 6 installed, but `vite.config.js` loads the **Vue 2** plugin |
| Entry HTML | ❌ `index.html` missing (Vite requires it) |
| Entry JS | ⚠️ `main.js` is Vue 3; `main-new.js` is still Vue 2 (dead code) |
| Components | ⚠️ Options API (fine), but use Vue 2 filters, undeclared emits, `v-html` on components |
| Config files | ❌ `vue.config.js` (Vue CLI) + `babel.config.js` (CLI preset) are dead |
| Lint stack | ❌ ESLint 5 + eslint-plugin-vue 5 (cannot parse Vue 3 SFCs) |
| Deployment | PhoneGap/Cordova (`config.xml`) — affects router history + global functions |

---

## 3. Blockers (App Cannot Start)

### 3.1 Missing `index.html` (Vite entry)
Vite needs `index.html` at the project root as the entry point. Without it, `npm run dev` and `npm run build` fail with "Could not resolve entry module".

**Action:** create `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tell Me A Story Mom</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

> Note: the old Vue CLI `index.html` also contained the Cordova/PhoneGap scripts that define `exitApp()` and `shareTo()` (called in `Header.vue` / `Post.vue`). Those `<script>` blocks must be re-added here (see §4.10).

### 3.2 `vite.config.js` loads the Vue 2 plugin
Current file imports `createVuePlugin` from `vite-plugin-vue2` — a **Vue 2** plugin that is **not installed** (`node_modules/vite-plugin-vue2` does not exist). The correct Vue 3 plugin, `@vitejs/plugin-vue`, **is installed but unused**.

**Action:** replace with:

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
```

### 3.3 `src/router/index.js` is broken
Three bugs:

1. **Wrong import paths** — the file lives in `src/router/`, so `./views/Home.vue` resolves to `src/router/views/Home.vue` (doesn't exist). All 8 route imports fail. Correct paths: `../views/Home.vue` and `../components/X.vue`.
2. **Named export vs default import** — router exports `export const router`, but `main.js` does `import router from "./router/index.js"` (default). `app.use(undefined)` would crash.
3. **`createMemoryHistory`** — designed for SSR/tests; the URL never changes and browser back/forward is broken. Use `createWebHistory(base)` for web hosting, or `createWebHashHistory()` for Cordova/`file://` loads (recommended here — see §4.12).

**Action:** see the fixed file in §7.

### 3.4 `vue.config.js` forces Vue 2 compat mode
This Vue CLI/webpack config aliases `vue` → `@vue/compat` with `compatConfig: { MODE: 2 }`. Vite ignores it, but it is misleading and keeps `@vue/compat` in dependencies.

**Action:** delete `vue.config.js` and remove `@vue/compat` from `package.json`.

---

## 4. Vue 2 → Vue 3 Code Changes

### 4.1 Filters removed — `{{ item.date | datestring }}`
Vue 3 deleted `Vue.filter()`. The `datestring` filter is used in **6 files**: `Home.vue`, `Diary.vue`, `Post.vue`, `Search.vue`, `Story.vue`, `Women.vue`. In pure Vue 3 this compiles to `datestring is not defined`.

**Action:** add a method to each component and update the template:

```js
methods: {
  formatDate(value) {
    return new Date(value).toDateString();
  }
}
```

```html
{{ formatDate(item.date) }}
```

*(Alternatively register once as `app.config.globalProperties.datestring` — but methods are simpler and type-safe.)*

### 4.2 Undeclared `$emit` events through `<router-view>`
Routed components emit `'loading'` / `'back'`; `App.vue` listens via `v-on:loading` / `v-on:back` on `<router-view>`. In Vue 3, listeners for events **not declared in `emits`** fall through to the component's root element and are **never triggered by `$emit`**.

**Action:** add to each emitting component (`Contact`, `Diary`, `Page`, `Post`, `Search`, `Story`, `Women`, `Home`):

```js
emits: ['back', 'loading'],
```

### 4.3 `App.vue` — empty `<script setup>`
The template references `loading` and `back` (via `v-on:loading="loading = $event"`), but the `<script setup>` block is empty. Also the transition CSS uses the Vue 2 class name `.slide-enter`.

**Action:**
- Either define `const loading = ref(false)` / `const back = ref(false)` in `<script setup>` (import `ref` from `vue`), or remove those bindings if `Header` / `Loader` stay commented out.
- Rename `.slide-enter` → `.slide-enter-from` in the `<style>` block.

### 4.4 `Home.vue` — commented-out methods
The template calls `featuredMedia(item._embedded)` 12 times, but the entire `methods:` block is commented out → runtime `TypeError: featuredMedia is not a function`.

**Action:** restore the `featuredMedia` method (un-comment the methods block in `Home.vue`).

### 4.5 `v-html` on `<router-link>`
Used in Home/Diary/Post/Search/Story/Women. `v-html` on a component relies on fragile attrs-fallthrough in Vue 3 and can be overridden.

**Action:** wrap the HTML in a `<span>`:

```html
<router-link :to="'/post/' + item.id" class="blue-text text-darken-4">
  <span v-html="item.title.rendered"></span>
</router-link>
```

### 4.6 Dead Vue 2 entry — `src/main-new.js`
Still uses `import Vue from 'vue'`, `new Vue({...}).$mount('#app')`, `Vue.config.productionTip`. Nothing references it.

**Action:** delete the file.

### 4.7 Dead Babel config — `babel.config.js`
References `@vue/cli-plugin-babel/preset`, which is not installed and unused by Vite.

**Action:** delete the file.

### 4.8 `Loader.vue` / `Error.vue` — custom element roots
Use self-closing HTML tags `<loader>` / `<error>` as their own root — Vue 3 warns about unknown custom elements.

**Action:** change root tags to `<div class="loader">` / `<div class="error">`.

### 4.9 `package.json` cleanup
- Remove bogus dependency `"16": "^0.0.2"`.
- Remove Vue 2-era deps: `@vue/compat`, `@vue/compiler-sfc` (bundled with `vue`), `core-js`.
- Upgrade lint stack: `eslint@^9`, `eslint-plugin-vue@^9` (or `^10`), replace `babel-eslint` with `@babel/eslint-parser`.
- Optional: `axios@^1` (currently `0.19`, from 2019).

### 4.10 Cordova globals — `exitApp()` / `shareTo()`
`Header.vue` calls `exitApp()`; `Post.vue` calls `shareTo()`. These were defined by inline scripts in the old `index.html` (or Cordova plugins).

**Action:** re-add the defining `<script>` blocks to the new `index.html`.

### 4.11 `Header.vue` — boolean prop binding
`<header class="top" back="false">` passes the **string** `"false"` (truthy) to the `back` prop.

**Action:** use `:back="false"` (or remove the attribute entirely).

### 4.12 Router history mode
`createMemoryHistory` is wrong for this app. Because `config.xml` indicates a PhoneGap/Cordova deployment (often loaded from `file://`), **`createWebHashHistory()`** is the safe choice; use `createWebHistory()` only if the app is served from a real web host.

---

## 5. Recommended (Optional) Modernization

- **Keep Options API** — fully supported in Vue 3; lowest-risk path.
- Extract the copy-pasted `featuredMedia()` + date formatting into a shared composable (`src/composables/useWordPress.js`).
- Consider `provide` / `inject` (or Pinia) instead of the `$emit`-through-`<router-view>` pattern for `loading` / `back` state.
- Lazy-load route components with `() => import(...)` to shrink the initial bundle.

---

## 6. File-by-File Action Plan

| File | Action |
|------|--------|
| `index.html` | **Create** — Vite entry + Cordova scripts |
| `vite.config.js` | **Rewrite** — use `@vitejs/plugin-vue` |
| `vue.config.js` | **Delete** |
| `babel.config.js` | **Delete** |
| `src/main-new.js` | **Delete** |
| `src/main.js` | Fix router import; remove Vue 2 comments |
| `src/router/index.js` | Fix paths, export, history mode |
| `src/App.vue` | Add refs / simplify; fix transition CSS |
| `src/views/Home.vue` | Restore methods; `formatDate`; `emits`; `v-html` span |
| `src/components/Diary.vue` | `formatDate`; `emits`; `v-html` span |
| `src/components/Post.vue` | `formatDate`; `emits`; `v-html` span |
| `src/components/Search.vue` | `formatDate`; `emits`; `v-html` span |
| `src/components/Story.vue` | `formatDate`; `emits`; `v-html` span |
| `src/components/Women.vue` | `formatDate`; `emits`; `v-html` span |
| `src/components/Page.vue` | `emits` |
| `src/components/Contact.vue` | `emits` |
| `src/components/Header.vue` | `:back="false"` |
| `src/components/Loader.vue` | Root tag → `<div>` |
| `src/components/Error.vue` | Root tag → `<div>` |
| `package.json` | Clean deps; upgrade ESLint stack |

---

## 7. Reference Snippets

### Fixed `vite.config.js`
```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
```

### Fixed `src/router/index.js`
```js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Search from "../components/Search.vue";
import Story from "../components/Story.vue";
import Women from "../components/Women.vue";
import Diary from "../components/Diary.vue";
import Post from "../components/Post.vue";
import Page from "../components/Page.vue";
import Contact from "../components/Contact.vue";

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/search", name: "Search", component: Search },
    { path: "/story/:id", name: "Story", component: Story },
    { path: "/women", name: "Women", component: Women },
    { path: "/diary", name: "Diary", component: Diary },
    { path: "/contact", name: "Contact", component: Contact },
    { path: "/", name: "Home", component: Home },
    { path: "/post/:id", name: "Post", component: Post },
    { path: "/page/:id", name: "Page", component: Page },
  ],
});
```

### Fixed `src/main.js`
```js
import { createApp } from "vue";
import App from "./App.vue";
import "materialize-css/dist/css/materialize.min.css";
import "./font/flaticon.css";
import "./font/socicon.css";
import router from "./router/index.js";

const app = createApp(App);
app.use(router);
app.mount("#app");
```

### Component change example (Contact.vue)
```js
export default {
  name: "Contact",
  emits: ["back", "loading"],
  data() { /* unchanged */ },
  // ...
};
```

---

## 8. Validation Checklist

1. `npm install` (after `package.json` cleanup)
2. `npm run dev` → app loads at `http://localhost:5173`, no console errors
3. `npm run build` → succeeds, `dist/` produced
4. `npm run lint` → passes with the upgraded ESLint stack
5. Manual smoke test: Home tabs, Search, Story list + pagination, Post detail, Page, Contact, Diary, Women
6. If deploying to PhoneGap/Cordova: test with `createWebHashHistory` (deep links / refresh must work)
