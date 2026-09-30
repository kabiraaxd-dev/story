<template>
  <div class="search page">
    <!-- <h6 class="center-align page-title">{{name}}</h6> -->
    <h5 class="head blue-text text-darken-4" v-html="page.title.rendered"></h5>
      <div class="card-panel" v-show="errors.length > 0">
          <span class="white-text">{{errors[0]}}</span>
      </div>
      <div class="card-content grey-text text-darken-2">
        <div class="" v-html="page.content.rendered"></div>
      </div>
      
    </div>
  
</template>
<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      name: "Page",
      id: '',
      page: [],
      errors: []
    }
  },
  watch: {
    '$route' (){
      // console.log(to);
      this.loadPage();
    }
  },
  mounted: function() {
    this.loadPage();
  },
  methods: {
    loadPage: function() {
      this.$emit('back',true);
      this.$emit('loading',true);
      /*fetch page detail*/
      axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/pages/' + this.$route.params.id )
        .then(response => {
          // console.log(response.data);
          this.page = response.data;
        })
        .catch(e => { this.errors.push(e) })
        .then(()=>{
          this.$emit('loading',false);
        });
    }
  }
}

</script>
<style>
.page .head {
  padding: 10px 10px 0;
}

.page .card-content {
  padding: 5px 10px;
  word-break: break-word;
  text-align: justify;
}

.page .card-content p {
  margin-top: 0;
}

.page .card-content * {
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
}
.page .card-content blockquote {
  padding-left: 10px;
}
.page .card-content img {
  max-width: 100%;
  height: auto;
}
.page .card-content h1 {
  font-size: 2em;
}
.page .card-content h2 {
  font-size: 1.5em;
}
.page .card-content h3 {
  font-size: 1.25em;
}
.page .card-content h4 {
  font-size: 1.125em;
}
.page .card-meta {
  padding: 10px;
}

.page .card-meta span {
  float: none;
  margin-left: 4px;
}

</style>
