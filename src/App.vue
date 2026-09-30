<template>
  <div id="app">
    <!-- <Header v-bind:back="back"></Header> -->
    <main>
      <transition name="slide" mode="out-in">
        <router-view v-on:loading="loading = $event" v-on:back="back = $event"></router-view>
      </transition>
        <!-- <Loader v-bind:visible="loading" v-bind:msg="msg" ></Loader> -->
        <!-- <my-error v-bind:visible="error" v-bind:errmsg="errmsg" /> -->
    </main>
    <!-- <Footer /> -->
  </div>
</template>
<script setup>
// import Header from './components/Header.vue'
// import Footer from './components/Footer.vue'
// import Loader from './components/Loader.vue';
// import Error from './components/Error'
/* export default {
  name: 'app',
  data() {
    return {
      msg: 'Loading your content. Please wait...',
      errmsg: 'Some error occurred',
      loading: false,
      error: false,
      back: false
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer,
    Loader
    // 'my-error': Error
  },
  methods:{
    showLoader: function() {
      this.loading = true;
    },
    showError: function() {
      this.error = true;

    }
  }
} */

</script>
<style>
body { padding-bottom: 60px; background: whitesmoke; }
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
main { }
.page-title { text-align: center; color: #0d47a1; padding: 10px; background-color: #fff; font-weight: bold; text-transform: uppercase; }
.subtitle { margin-top: -8px; margin-bottom: 10px; padding-bottom: 10px; background-color: #fff; }

.slide-enter-active {
  transition: all .5s ease;
}
.slide-leave-active {
  transition: all .8s ease-in;
}
.slide-enter, .slide-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
.pagination li {
  height: 24px;
}
.pagination li a {
  line-height: 24px;
  padding: 0 8px;
}
.pagination li.active {
  background-color: #ffab40;
}
.pagination li i {
  font-size: 1em;
}
</style>
