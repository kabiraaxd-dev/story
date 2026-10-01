<template>
  <header class="top" :back="false">
    <div class="navbar-fixed">
      <nav class="white z-depth-1">
        <div class="nav-wrapper ">
          <RouterLink to="/" class=" brand-logo center indigo-text" id="logo_style">
            <img class="responsive-img" alt="Story Logo" src="/story-logo-big.jpg" style=" height:50px; margin-top: 5px;">
             
          </RouterLink>
          
          <ul class="left " v-show="back">
            <li><a href="#" v-on:click="goBack()"><i class="flaticon-back blue-text text-darken-4"></i></a></li>
          </ul>
          <a href="#" class="sidenav-trigger " v-on:click="navTrigger"><i class="flaticon-menu-1 blue-text text-darken-4"></i></a>
           
        </div>
      </nav>
    </div>
    <ul class="sidenav right-aligned" v-bind:class="{open:nav}" id="navbar_sidebar">
      <li>
        <div class="user-view white-text">
          <!-- <img src="../assets/SidebarLogo.png" alt=""> -->
           Story
        </div>
      </li>
      <div class="divider"></div>
      <li v-on:click="navTrigger"><RouterLink to="/" class="white-text sidenav-close"><i class="flaticon-home white-text "></i>Home</RouterLink></li>
      <li @click="navTrigger">
        <router-link to="/post" class="white-text sidenav-close"><i class="flaticon-home white-text"></i> Stories </router-link>
      </li>
      <li v-on:click="navTrigger"><RouterLink to="/contact" class="white-text sidenav-close"><i class="flaticon-call white-text "></i>Contact-Us</RouterLink></li>
      <!-- <li v-on:click="navTrigger"><RouterLink to="/page/1461" class="white-text sidenav-close"><i class="flaticon-script white-text "></i>Submit a Story</RouterLink></li> -->
      <li v-on:click="navTrigger"><RouterLink to="/page/581" class="white-text sidenav-close"><i class="flaticon-conversation white-text "></i>Terms &amp; Conditions</RouterLink></li>
      <li v-on:click="navTrigger"><RouterLink to="/page/577" class="white-text sidenav-close"><i class="flaticon-shield white-text "></i>Privacy-Policy</RouterLink></li>
      <div class="divider"></div>
      <!-- <li v-on:click="navTrigger"><a href="javascript:void()" onclick="exitApp()" class="white-text sidenav-close"><i class="flaticon-exit white-text text-white"></i>Exit</a></li> -->
    </ul>
    <div class="sidenav-overlay" v-bind:class="{open:nav}" v-on:click="navTrigger"></div>
  </header>
</template>
<script>
// import { RouterLink } from 'vue-router';
  export default{
    name: 'Header',
        data() {
            return {
                name: "Header",
                nav: false
            }
        },
        props:['back'],
        mounted: function() {
            /*var elems = document.querySelectorAll('.sidenav-close');
            for (var i = elems.length - 1; i >= 0; i--) {
              elems[i].addEventListener('click',function () {
                this.navTrigger();
              })
            }*/
            // document.addEventListener('DOMContentLoaded', function() {});
        },
        methods: {
          goBack: function() {
            // router.go(-1);
            window.history.go(-1);
          },
          navTrigger(){
            this.nav == false ? this.nav = true : this.nav = false;
          }
        }
    }
</script>
<style scoped>
nav .brand-logo {
  /* color: #061958; */
}
nav .sidenav-trigger {
  float: right;
  display: block;
}

.sidenav {
  width: 240px;
  background: linear-gradient(125deg, #4548bd, #061958);
  transition:transform 300ms ease-out;
}
.sidenav.open {
  transform:translateX(0);
}
.sidenav-overlay.open {
  display: block; opacity: 1;
}
.sidenav .user-view {

}
.sidenav li>a {
  padding: 0 10px;
}
.sidenav li>a>i {
  margin: 0;
  width: 32px;
  font-size: 18px;
}
.sidenav .divider {
  background-color:#585dc5;
}
</style>
