<template>
	<footer class="footer">
        <p class="center-align">Copyright information</p>
        <!-- <div class="submenu" v-show="sub">
            <nav>
                <router-link to="/story/215" class="blue-text text-darken-4">0-3 year</router-link>
                <router-link to="/story/216" class="blue-text text-darken-4">3-6 year</router-link>
                <router-link to="/story/217" class="blue-text text-darken-4">6-12 year</router-link>
                <router-link to="/story/324" class="blue-text text-darken-4">Stories in Hindi</router-link>
            </nav>
        </div>
        <nav>
            <router-link to="/" v-bind:class="{'move':active=='home'}"><i class=" flaticon-home"></i></router-link>
            <router-link to="/search" v-bind:class="{'move':active=='search'}"><i class=" flaticon-search "></i></router-link>
            <a v-on:click="showSub()" v-bind:class="{'move':active=='story'}"><i class=" flaticon-book "></i></a>
            <router-link to="/women" v-bind:class="{'move':active=='women'}"><i class=" flaticon-mother"></i></router-link>
            <router-link to="/diary" v-bind:class="{'move':active=='diary'}"><i class=" flaticon-open-book"></i></router-link>
        </nav> -->
    </footer>
</template>
<script>
	export default{
        name: 'Footer',
		data() {
			return {
				name: "Footer",
                sub: false,
                active: ''
			}
		},
        watch:{
            '$route' (to){
                // console.log(to.name);
                switch (to.name){
                    case 'Home':
                        this.active = 'home';
                        this.sub = false;
                        break;
                    case 'Search':
                        this.active = 'search';
                        this.sub = false;
                        break;
                    case 'Story':
                        this.active = 'story';
                        break;
                    case 'Post':
                        this.active = 'story';
                        break;
                    case 'Page':
                        this.active = '';
                        break;
                    case 'Women':
                        this.active = 'women';
                        this.sub = false;
                        break;
                    case 'Diary':
                        this.active = 'diary';
                        this.sub = false;
                        break;
                    default:
                        this.active = '';
                }
            }
        },
        methods: {
            showSub: function() {
                this.sub = !this.sub;
            }
        }
	}
</script>
<style type="text/css" scoped="">
 .footer {
     bottom: 0px;
     left: 0;
     right: 0;
     color: #fff;
     background-color: #263a7e;
     position: fixed;
     z-index: 99;
 }

 .footer nav {
     margin: 0;
     padding: 0;
     display: flex;
     background: #263a7e;
     height: auto;
     line-height: 44px;
 }
.footer nav i { font-size: 1.5em; height: auto; line-height: 44px; }
.footer nav a {
     margin: 0;
     flex: 1;
     box-sizing: border-box;
     text-align: center;
     border-right: 1px solid rgba(0, 0, 0, .25);
     position: relative;
}
.footer nav a:last-child { border: none; }

 .footer nav .move:before {
     content: '';
     margin: auto;
     position: absolute;
     left: 50%;
     top: -1px;
     width: 0;
     height: 0;
     margin-left: -10px;
     border-left: 10px solid transparent;
     border-right: 10px solid transparent;
     border-top: 8px solid #fff;
 }

.footer .submenu {
     position: absolute;
     left: 0;
     right: 0;
     bottom: 100%;
     width: 100%;
 }

.footer .submenu nav {
     margin: 0;
     padding: 0;
     display: flex;
     align-items: center;
     background: #fff;
     line-height: normal;
 }

.footer .submenu nav a {
     font-size: 12px;
     padding: 20px 5px;
     border-color: rgba(0, 0, 0, .15);
 }
</style>