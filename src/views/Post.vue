<template>
    <div class="search post">
        <h6 class="center-align page-title">{{name}}</h6>
        
        <!-- <h5 class="head blue-text text-darken-4" v-html="post.title.rendered"></h5> -->
        <div class="container">

            <ul class="collection">
                <li v-for="s in posts" class="collection-item avatar">
                    <img src="../assets/noimage.jpg" alt="" class="circle">
                    <span class="title">{{ s.title }}</span><span class="badge lighten-5" :class="{'teal':s.emotionTag == 'calm', 'red':s.emotionTag == 'scary', 'orange':s.emotionTag == 'frustrating'}">{{ s.emotionTag }}</span>
                    <p>{{s.quote}}<br>{{ useHumanDate(s.datePublished) }}  </p>
                    <RouterLink :to="`/post/${ s.slug }`" class="secondary-content"><i class="material-icons">send</i></RouterLink>
                    
                </li>
            </ul>
        </div>
        
        
        <hr>
        <div class="related grey lighten-3">
            <h5 class="blue-text text-darken-2">Related Posts</h5>
            <div class="grid">
                <!-- <div class="card horizontal" v-for="item in related" v-bind:id="item.id" v-bind:key="item.id">
                    <div class="card-image" v-bind:style="{'position':'relative', 'background-image': 'url('+ item.img.src +')'}">
                        <router-link v-bind:to="'/post/'+item.id">&nbsp;</router-link>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content ">
                            <h6 class="card-title ">
                                <router-link v-bind:to="'/post/'+item.id" class="blue-text text-darken-4"><span v-html="item.title" ></span></router-link>
                            </h6>
                            <div class="grey-text text-darken-2 excerpt" v-html="item.excerpt"></div>
                            <div class="meta grey-text">
                                <span class="text"><i class=" flaticon-calendar "></i> {{ item.date }}</span>
                            </div>
                            <div class="card-action">
                                <router-link v-bind:to="'/post/'+item.id">Read More</router-link>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { useHumanDate } from '../composables/useHumanDate.js'
export default {
    data: function() {
        return {
            name: "Stories",
            id: '',
            posts: [],
            related: [],
            errors: [],
            // textSize: 1.1
        }
    },
    emits: ['back', 'loading'],
    
    mounted: function() {
        if (sessionStorage.getItem('posts')) {
            this.posts = JSON.parse(sessionStorage.getItem('posts'));
        } else {
            this.loadStories();
        }
    },
    methods: {
        useHumanDate,
        loadStories: function() {
            this.$emit('back', true);
            this.$emit('loading', true);
            /*fetch post detail*/
            axios.get('https://actually-relevant-api.onrender.com/api/stories?page=1&pageSize=25')
                .then(response => {
                    // console.log(response.data);
                    this.posts = response.data.data;
                    sessionStorage.setItem('posts', JSON.stringify(this.posts));
                })
                .catch(e => { this.errors.push(e) })
                .then(() => {
                    this.$emit('loading', false);
                    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
                });
        },
        
    }
}
</script>
<style>
.flex {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
}


.post .head {
    padding: 10px 10px 0;
}
.collection .collection-item.avatar .secondary-content {
    top: 50%;
    /* transform: translateY(-50%); */
}
.post .card-content {
    padding: 5px 10px;
    word-break: break-word;
}

.post .card-content p {
    margin-top: 0;
}

.post .card-content * {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
}

.post .card-content blockquote {
    padding-left: 10px;
}

.post .card-content img {
    max-width: 100%;
    height: auto;
}

.post .card-content h1 {
    font-size: 2em;
}

.post .card-content h2 {
    font-size: 1.5em;
}

.post .card-content h3 {
    font-size: 1.25em;
}

.post .card-content h4 {
    font-size: 1.125em;
}

.post .card-meta {
    padding: 10px;
}

.post .card-meta span {
    float: none;
    margin-left: 4px;
    display: inline-block;
    margin-bottom: 4px;
    border-radius: 4px;
}

.related {
    padding: 1em;
}

.related h5 {
    font-size: 1.5rem;
    margin-top: 0.1em;
}

.related .excerpt,
.related .card.horizontal .card-content .excerpt {
    max-height: 3.25em;
    text-align: left;
}

.related .card.horizontal .meta {
    font-size: 11px;
    padding-top: 0;
}

@media only screen and (min-width:700px) {
    .post .image {
        float: left;
        margin-right: 15px;
        margin-bottom: 10px;
        max-width: 52%
    }

    .related .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 15px;
    }
}
</style>