import { createWebHistory, createRouter } from "vue-router";
import Home from '../views/Home.vue'
import Search from '../components/Search.vue'
import Story from '../views/Story.vue'
import Women from '../components/Women.vue'
import Diary from '../components/Diary.vue'
import Post from '../views/Post.vue'
import Page from '../components/Page.vue'
import Contact from '../views/Contact.vue'
import PostDetail from "../views/PostDetail.vue";


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // base: import.meta.env.BASE_URL,
  routes: [
    { path: "/search", name: "Search", component: Search },
    { path: "/story/:id", name: "Story", component: Story },
    { path: "/women", name: "Women", component: Women },
    { path: "/diary", name: "Diary", component: Diary },
    { path: "/contact", name: "Contact", component: Contact },
    { path: "/", name: "Home", component: Home },
    { path: "/post", name: "Post", component: Post },
    { path: "/post/:id", name: "PostDetail", component: PostDetail },
    { path: "/page/:id", name: "Page", component: Page },
  ],
});
