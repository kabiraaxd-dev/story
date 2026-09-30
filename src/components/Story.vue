<template>
  <div class=" story">
    <h6 class="center-align page-title">{{name}} - <small class="grey-text">{{catdetail.name}}</small></h6>
    <!-- <p class="center-align subtitle">{{catdetail.name}}</p> -->
    <!-- results -->
    <div class="row" v-if="posts.length > 0" >
      <div class="col s12" >
        <div class="card horizontal" v-for="item in posts" v-bind:id="item.id" v-bind:key="item.id">
          <div class="card-image" v-bind:style="{'position':'relative', 'background-image': 'url('+ featuredMedia(item._embedded).media +')'}" >
            <router-link v-bind:to="'/post/'+item.id">&nbsp;</router-link>
            <!-- <img v-bind:src="featuredMedia(item._embedded).media" > -->
          </div>
          <div class="card-stacked">
            <div class="card-content ">
              <h6 class="card-title " >
                <router-link v-bind:to="'/post/'+item.id" v-html="item.title.rendered" class="blue-text text-darken-4"></router-link>
              </h6>
              <div class="grey-text text-darken-2 excerpt" v-html="item.excerpt.rendered"></div>
              <div class="meta grey-text">
                <span class="text"><i class=" flaticon-user-1 blue-text text-darken-4">
  </i> {{featuredMedia(item._embedded).author}}</span> <span class="text" ><i class=" flaticon-calendar blue-text text-darken-4"></i> {{ item.date | datestring}}</span>
              </div>
              <div class="card-action">
                <router-link v-bind:to="'/post/'+item.id">Read More</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errors.length>0" class="card-panel red lighten-2">
      <p v-for="(value, index) in errors" v-bind:key="index">{{index}}: {{value}}</p>
    </div>
  <div class="center-align">
    <ul class="pagination">
      <li v-show="next"><a v-on:click="currpage--"><i class="flaticon-back"></i></a></li>
      <!-- <li class="active"><a href="#!">1</a></li> -->
      <li class="waves-effect" v-bind:class="{active : currpage == (index+1)}" v-for="(p, index) in pages" v-bind:key="index"><a v-on:click="currpage=p" v-bind:title="p">{{p}}</a></li>
      <!-- <li class="waves-effect"><a href="#!">2</a></li> -->
      <li v-show="prev"><a v-on:click="currpage++"><i class="flaticon-next"></i></a></li>
    </ul>
  </div>
    
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      name: "Story",
      catdetail: '',
      oldcat: '',
      posts: [],
      perpage: 10,
      total:'',
      pages:'',
      currpage:1,
      errors: [],
      previous: ''
    }
  },
  watch: {
    '$route'() {
      // console.log(to, from);
      this.currpage = 1;
      this.loadStories();
    },
    currpage: function() {
      window.sessionStorage.setItem('currpage',this.currpage);
      this.loadStories();
    }
  },
  computed:{
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
  },
  mounted: function() {
    
    this.errors = [];
    if (window.sessionStorage.getItem('catid')) {
      if (this.$route.params.id == JSON.parse(window.sessionStorage.getItem('catid'))) {
        this.posts = JSON.parse(window.sessionStorage.getItem('story'));
        this.total = window.sessionStorage.getItem('total');
        this.currpage = window.sessionStorage.getItem('currpage');
        this.paging();
      } else {
        this.loadStories();
      }
    } else {
      this.loadStories();
    }
  },
  methods: {
    loadStories: function() {
      this.$emit('back', true);
      this.$emit('loading', true);
      axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/posts/?_embed&categories=' + this.$route.params.id +'&page='+this.currpage)
        .then((response) => {
          /*console.log(response);*/
          if (response.status == 200) {
            this.posts = response.data;
            this.oldcat = this.$route.params.id;
            window.sessionStorage.setItem('story', JSON.stringify(response.data));
            window.sessionStorage.setItem('catid', this.$route.params.id);
            window.sessionStorage.setItem('currpage',this.currpage);
            this.paging();
          }
        })
        .catch(e => { this.errors.push(e) })
        .then(() => {
          this.$emit('loading', false);
        });
      /*category details*/
      axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/categories/' + this.$route.params.id)
        .then(response => {
          // console.log(response.data);
          this.catdetail = response.data;
          this.total = response.data.count;
          window.sessionStorage.setItem('total',this.total);
        })
        .catch(e => { this.errors.push(e) });
    },
    featuredMedia: function(data) {
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
    },
    paging: function() {
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
    }
  }
}

</script>
<style>
.story {
  padding: 0;
}

.story .card.horizontal .card-stacked {
  flex: 2;
}

.story .card.horizontal .card-content {
  padding: 5px 10px;
  font-size: 14px;
}

.story .card.horizontal .card-content .excerpt {
  word-break: break-word;
  text-align: justify;
  max-height: 3.5em;
  overflow: hidden;
}

.story .card.horizontal .card-title {
  font-size: 1em;
  margin-top: 3px;
  margin-bottom: 2px;
  line-height: 1.25;
  font-weight: 500;
  text-transform: uppercase;
}

.story .card.horizontal p {
  line-height: 1.35;
  font-size: 0.875em;
}

.story .card.horizontal .card-image {
  flex: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.story .card.horizontal .card-image a {
  display: block;
  height: 100%;
}

.story .card.horizontal .meta {
  font-size: 0.75em;
  padding-top: 6px;
}

.story .card.horizontal .meta span {
  line-height: 1.5;
}

.story .card.horizontal .meta span:first-child {
  margin-right: 10px;
}

.story .card .card-action {
  padding: 0;
}

.story .card .card-action a {
  font-size: 0.75em;
}

</style>
