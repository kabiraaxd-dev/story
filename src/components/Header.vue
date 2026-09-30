<template>
  <header class="top" back="false">
    <div class="navbar-fixed">
      <nav class="white z-depth-1">
        <div class="nav-wrapper ">
          <router-link to="/" class=" brand-logo center " id="logo_style"><img class="responsive-img" alt="Logo" src="../assets/logo.png" style=" height:50px; margin-top: 5px;"></router-link>
          <!-- <a href="#" class=" brand-logo center " id="logo_style"><img class="responsive-img" alt="Logo" src="../assets/logo.png" style=" height:50px; margin-top: 5px;"></a> -->
          <!-- <div class="logo"><img src="images/Logo.png"></div> -->
          <ul class="left " v-show="back">
            <li><a href="#" v-on:click="goBack()"><i class="flaticon-back blue-text text-darken-4"></i></a></li>
          </ul>
          <a href="#" class="sidenav-trigger " v-on:click="navTrigger"><i class="flaticon-menu-1 blue-text text-darken-4"></i></a>
        </div>
      </nav>
    </div>
    <ul class="sidenav right-aligned" v-bind:class="{open:nav}" id="navbar_sidebar">
      <li>
        <div class="user-view">
          <img src="../assets/SidebarLogo.png" alt="">
        </div>
      </li>
      <div class="divider"></div>
      <li v-on:click="navTrigger"><router-link to="/" class="white-text sidenav-close"><i class="flaticon-home white-text "></i>Home</router-link></li>
      <li v-on:click="navTrigger"><router-link to="/contact" class="white-text sidenav-close"><i class="flaticon-call white-text "></i>Contact-Us</router-link></li>
      <!-- <li v-on:click="navTrigger"><router-link to="/page/1461" class="white-text sidenav-close"><i class="flaticon-script white-text "></i>Submit a Story</router-link></li> -->
      <li v-on:click="navTrigger"><router-link to="/page/581" class="white-text sidenav-close"><i class="flaticon-conversation white-text "></i>Terms &amp; Conditions</router-link></li>
      <li v-on:click="navTrigger"><router-link to="/page/577" class="white-text sidenav-close"><i class="flaticon-shield white-text "></i>Privacy-Policy</router-link></li>
      <div class="divider"></div>
      <li v-on:click="navTrigger"><a href="javascript:void()" onclick="exitApp()" class="white-text sidenav-close"><i class="flaticon-exit white-text text-white"></i>Exit</a></li>
    </ul>
    <div class="sidenav-overlay" v-bind:class="{open:nav}" v-on:click="navTrigger"></div>
  </header>
</template>
<script>
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
nav .sidenav-trigger {
  float: right;
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
