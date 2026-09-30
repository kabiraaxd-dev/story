<template>
  <div>
    <h6 class="center-align page-title">{{name}}</h6>
    <div class="search">
      <div class="search-input white">
        <form class="form-input" v-on:submit.prevent="searchPost()">
          <input type="text" name="username" placeholder="Search Stories & Interviews" v-model="query">
          <button type="submit" class="btn white blue-text" ><i class="flaticon-search"></i></button>
        </form>
      </div>
      <!-- message -->
      <div v-if="previous" class="card yellow lighten-2">
        <div class="card-content">Your previous search results for <strong style="font-weight: bold;">{{previous}}</strong></div>
      </div>
      <!-- results -->
      <div v-if="posts.length > 0">
        <div class="card horizontal" v-for="item in posts" v-bind:id="item.id" v-bind:key="item.id">
          <div class="card-stacked">
            <div class="card-content ">
              <h6 class="card-title" >
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
          <div class="card-image" v-bind:style="{'position':'relative', 'background-image': 'url('+ featuredMedia(item._embedded).media +')'}">
            <router-link v-bind:to="'/post/'+item.id">&nbsp;</router-link>
            <!-- <img v-bind:src="featuredMedia(item._embedded).media" > -->
          </div>
        </div>
      </div>
      <div v-if="posts.length<1" class="card-panel amber lighten-2">No results found</div>
      <div v-if="errors.length>0" class="card-panel red lighten-2">
        <p v-for="(value, index) in errors" v-bind:key="index">{{index}}: {{value}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      name: "Search",
      query: '',
      posts: [],
      errors: [],
      previous: ''
    }
  },
  mounted: function() {
    /*fetch session data*/
    if (window.sessionStorage.getItem('search')) {
      /*this.errors.push('session data available');*/
      this.posts = JSON.parse(window.sessionStorage.getItem('search'));
      this.previous = window.sessionStorage.getItem('previous');
      this.query = this.previous;
    }
  },
  methods: {
    searchPost: function() {
      this.$emit('loading', true);
      axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/posts?_embed&per_page=20&search=' + this.query)
        .then((response) => {
          // console.log(response);
          if (response.status == 200) {
            this.posts = response.data;
            window.sessionStorage.setItem('search', JSON.stringify(response.data));
            window.sessionStorage.setItem('previous', this.query);
            this.previous='';
            this.errors = [];
          } else {
            this.errors.push("Error");
          }
        })
        .catch(e => { this.errors.push(e.message) })
        .then(() => {
          this.$emit('loading', false);
        });
    },
    featuredMedia: function(data) {
      // console.log(data);
      var newobj = {};
      for (var k in data) {
        var key = k.replace(":", "");
        var val = data[k];
        newobj[key] = val;
      }
      // console.log(newobj);
      var returnobj = {};

      function category(loopobject) {
        var output = [];
        for (var i = 0; i < loopobject.length; i++) {
          output.push(loopobject[i].name);
        }
        return output;
      }
      returnobj.media = (newobj.wpfeaturedmedia)?(newobj.wpfeaturedmedia[0].source_url):'dist/noimage.jpg';
      returnobj.category = category(newobj.wpterm[0]?newobj.wpterm[0]:[{name:'None',slug:'none'}]); //newobj.wpterm[0][0].name;
      returnobj.tags = category(newobj.wpterm[1]); //[0].name;
      returnobj.author = (newobj.author[0].name)?newobj.author[0].name:[{name:'None',slug:'none'}];

      // console.log(returnobj);
      return returnobj;
    }
  }
}

</script>
<style>
.search {
  padding: 0 10px;
}

.search-input {}

.search-input .form-input {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  border: 1px solid #ddd;
}

.search-input .form-input input,
.search-input .form-input button {
  border: 0 none;
  height: 44px;
  margin: 0;
  box-shadow: none;
  background-color: #fff;
  border-radius: 0;
}

.search-input .form-input input {
  padding-left: 10px;
}

.search-input .form-input button {}

.search .card.horizontal .card-stacked {
  flex: 2;
}

.search .card.horizontal .card-content {
  padding: 5px 10px;
}

.search .card.horizontal .card-content .excerpt {
  word-break: break-word;
  text-align: justify;
  max-height: 3.5em;
  overflow: hidden;
}

.search .card.horizontal .card-title {
  font-size: 13px;
  margin-top: 3px;
  margin-bottom: 2px;
  line-height: 1.25;
  font-weight: 500;
  text-transform: uppercase;
}

.search .card.horizontal p {
  line-height: 1.35;
  font-size: 12px;
}

.search .card.horizontal .card-image {
  /*width: 120px;*/
  flex: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.search .card.horizontal .card-image a {
  display: block;
  height: 100%;
}

.search .card.horizontal .meta {
  font-size: 10px;
  padding-top: 6px;
}

.search .card.horizontal .meta .material-icons {
  vertical-align: middle;
}

.search .card.horizontal .meta span {
  line-height: 1.5;
}

.search .card.horizontal .meta span:first-child {
  margin-right: 10px;
}

.search .card .card-action {
  padding: 0;
}

.search .card .card-action a {
  font-size: 10px;
}

</style>
