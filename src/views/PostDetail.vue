<template>
  <div class="container story">
    
    <div class="card indigo darken-2" v-if="story">
      <div class="card-content white-text">
        <span class="card-title">{{story?.title}}</span>
        <p class="card-subtitle gray-text lighten-2">{{ story?.quote }}</p>
        <p class="">{{ story?.summary }}</p>
      </div>
      <div class="card-action">
          <a  class="">{{ useHumanDate(story?.datePublished) }}</a>
          <a  class="">{{story?.emotionTag}}</a>
          
        </div>
      </div>
    <!-- results -->
    <!-- <div class="row" v-if="posts.length > 0" >
      <div class="col s12" >
        <div class="card horizontal" v-for="item in posts" v-bind:id="item.id" v-bind:key="item.id">
          <div class="card-image" v-bind:style="{'position':'relative', 'background-image': 'url('+ featuredMedia(item._embedded).media +')'}" >
            <router-link v-bind:to="'/post/'+item.id">&nbsp;</router-link>
            <img v-bind:src="featuredMedia(item._embedded).media" >
          </div>
          <div class="card-stacked">
            <div class="card-content ">
              <h6 class="card-title " >
                <router-link v-bind:to="'/post/'+item.id" class="blue-text text-darken-4"><span v-html="item.title.rendered" ></span></router-link>
              </h6>
              <div class="grey-text text-darken-2 excerpt" v-html="item.excerpt.rendered"></div>
              <div class="meta grey-text">
                <span class="text"><i class=" flaticon-user-1 blue-text text-darken-4">
  </i> {{featuredMedia(item._embedded).author}}</span> <span class="text" ><i class=" flaticon-calendar blue-text text-darken-4"></i> {{ item.date}}</span>
              </div>
              <div class="card-action">
                <router-link v-bind:to="'/post/'+item.id">Read More</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div v-if="errors.length>0" class="card-panel red lighten-2">
      <p v-for="(value, index) in errors" v-bind:key="index">{{index}}: {{value}}</p>
    </div>
  <!-- <div class="center-align">
    <ul class="pagination">
      <li v-show="next"><a v-on:click="currpage--"><i class="flaticon-back"></i></a></li>
      
      <li class="waves-effect" v-bind:class="{active : currpage == (index+1)}" v-for="(p, index) in pages" v-bind:key="index"><a v-on:click="currpage=p" v-bind:title="p">{{p}}</a></li>
      
      <li v-show="prev"><a v-on:click="currpage++"><i class="flaticon-next"></i></a></li>
    </ul>
  </div> -->
    
  </div>
</template>
<script>
import axios from 'axios'
import { useHumanDate } from '../composables/useHumanDate.js'
export default {
  data: function() {
    return {
      name: "Story detail",
      // catdetail: '',
      // oldcat: '',
      // posts: [],
      // perpage: 10,
      // total:'',
      // pages:'',
      // currpage:1,
      story: null,
      errors: [],
      // previous: ''
    }
  },
  emits: ['back', 'loading'],
  /* watch: {
    '$route'() {
      // console.log(to, from);
      this.currpage = 1;
      this.loadStories();
    },
    currpage: function() {
      window.sessionStorage.setItem('currpage',this.currpage);
      this.loadStories();
    }
  }, */
  /* computed:{
    next: function() {
      if (this.currpage==1) {
        return false;
      }else{
        return true;
      }
    },
    prev: function() {
      if (this.currpage==this.pages) {
        return false;
      }else{
        return true;
      }
    }
  }, */
  mounted: function() {
    
    this.errors = [];
    this.loadStories();
    /* if (window.sessionStorage.getItem('catid')) {
      if (this.$route.params.id == JSON.parse(window.sessionStorage.getItem('catid'))) {
        this.posts = JSON.parse(window.sessionStorage.getItem('story'));
        this.total = window.sessionStorage.getItem('total');
        this.currpage = window.sessionStorage.getItem('currpage');
        this.paging();
      } else {
        this.loadStories();
      }
    }  */
  },
  methods: {
    useHumanDate: useHumanDate,
    loadStories: function() {
      this.$emit('back', true);
      this.$emit('loading', true);
      axios.get('https://actually-relevant-api.onrender.com/api/stories/' + this.$route.params.id)
        .then((response) => {
          console.log(response.data);
          this.story = response.data;
          // if (response.data.status == 200) {
            /* this.oldcat = this.$route.params.id;
            window.sessionStorage.setItem('story', JSON.stringify(response.data));
            window.sessionStorage.setItem('catid', this.$route.params.id);
            window.sessionStorage.setItem('currpage',this.currpage);
            this.paging(); */
          // }
        })
        .catch(e => { this.errors.push(e) })
        .then(() => {
          this.$emit('loading', false);
        });
      /*category details*/
      /* axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/categories/' + this.$route.params.id)
        .then(response => {
          // console.log(response.data);
          this.catdetail = response.data;
          this.total = response.data.count;
          window.sessionStorage.setItem('total',this.total);
        })
        .catch(e => { this.errors.push(e) }); */
    },
    /* featuredMedia: function(data) {
      // console.log(data);
      var newobj = {};
      for (var k in data) {
        newobj[k.replace(":", "")] = data[k];
      }

      var returnobj = {};

      function category(loopobject) {
        var output = [];
        for (var i = 0; i < loopobject.length; i++) {
          try {
            output.push(loopobject[i].name);
          } catch (err) {
            // console.log(err);
            this.errors.push(err);
          }
        }
        return output;
      }
      returnobj.media = (newobj.wpfeaturedmedia) ? (newobj.wpfeaturedmedia[0].source_url) : 'img/noimage.jpg';
      returnobj.category = category(newobj.wpterm[0]); //newobj.wpterm[0][0].name;
      returnobj.tags = category(newobj.wpterm[1]); //[0].name;
      returnobj.author = newobj.author[0].name;

      // console.log(returnobj);
      return returnobj;
    }, */
    /* paging: function() {
      for (var i = 0; i < this.total; i++) {
        var item = (this.total/this.perpage);
        if (item < 0) {
          // console.log(item);
          this.pages = 1;
        } else {
          // console.log(item);
          this.pages = Math.ceil(item);
        }
      }
    } */
  }
}

</script>
<style scoped>
/* .story {
  padding: 0;
} */
.card .card-subtitle {
  font-size: 1.175rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
}
.card.horizontal .card-stacked {
  flex: 2;
}

.card.horizontal .card-content {
  padding: 5px 10px;
  font-size: 14px;
}

.card.horizontal .card-content .excerpt {
  word-break: break-word;
  text-align: justify;
  max-height: 3.5em;
  overflow: hidden;
}

.card.horizontal .card-title {
  font-size: 1em;
  margin-top: 3px;
  margin-bottom: 2px;
  line-height: 1.25;
  font-weight: 500;
  text-transform: uppercase;
}

.card.horizontal p {
  line-height: 1.35;
  font-size: 0.875em;
}

.card.horizontal .card-image {
  flex: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.card.horizontal .card-image a {
  display: block;
  height: 100%;
}

.card.horizontal .meta {
  font-size: 0.75em;
  padding-top: 6px;
}

.card.horizontal .meta span {
  line-height: 1.5;
}

.card.horizontal .meta span:first-child {
  margin-right: 10px;
}

/*.card .card-action {
  padding: 0;
}

.card .card-action a {
  font-size: 0.75em;
}*/

</style>
