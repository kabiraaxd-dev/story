<template>
    <div class="search post">
        <!-- <h6 class="center-align page-title">{{name}}</h6> -->
        <div class="flex textsize z-depth-1">
            <button v-bind:class="{'white-text orange':textSize=='0.9'}" class="waves-effect" v-on:click="fontSize(0.9)">A</button>
            <button v-bind:class="{'white-text orange':textSize=='1.1'}" class="waves-effect" v-on:click="fontSize(1.1)">A</button>
            <button v-bind:class="{'white-text orange':textSize=='1.25'}" class="waves-effect" v-on:click="fontSize(1.25)">A</button>
        </div>
        <h5 class="head blue-text text-darken-4" v-html="post.title.rendered"></h5>
        <div class="row">
            <div class="col s6 ">
                <span class="grey-text" style="display:inline-block; margin-top:5px;"><i class="flaticon-user blue-text"></i> {{featuredMedia(post._embedded).author}}</span></div>
            <div class="col s6"><span class="grey-text" style="display:inline-block; margin-top:5px;"><i class="flaticon-calendar blue-text"></i> {{post.date | datestring}}</span></div>
        </div>
        <div class="image">
            <img v-bind:src="featuredMedia(post._embedded).media" class="responsive-img">
        </div>
        <div class="card-content grey-text text-darken-2">
            <div v-html="post.content.rendered" v-bind:style="{fontSize:textSize+'em'}"></div>
        </div>
        <div class="card-meta">
            <i class="flaticon-price-tag"></i> Tagged: <span v-for="(value) in featuredMedia(post._embedded).tags" v-bind:key="value" class="badge light-blue accent-1">{{value}} </span>
            <hr>
            <i class="flaticon-grid"></i> Posted in: <span v-for="(value) in featuredMedia(post._embedded).category" v-bind:key="value" class="badge  lime accent-1">{{value}} </span>
            <hr>
            <a onclick="shareTo()" class="btn white waves-effect pink-text" >
                <svg height="2em" viewBox="0 0 480 480" width="2em" style="vertical-align:middle;margin-right:10px;" xmlns="http://www.w3.org/2000/svg">
                    <path d="m240 0c-132.546875 0-240 107.453125-240 240s107.453125 240 240 240 240-107.453125 240-240c-.148438-132.484375-107.515625-239.851562-240-240zm0 464c-123.710938 0-224-100.289062-224-224s100.289062-224 224-224 224 100.289062 224 224c-.140625 123.652344-100.347656 223.859375-224 224zm0 0" fill="#e91e63" />
                    <path d="m320 120c-12.460938-.054688-24.226562 5.726562-31.800781 15.621094-7.574219 9.894531-10.082031 22.765625-6.773438 34.777344l-75.402343 37.679687c-13.191407-19.148437-36.832032-28.171875-59.429688-22.683594s-39.46875 24.347657-42.410156 47.414063c-2.941406 23.070312 8.65625 45.558594 29.152344 56.542968 20.5 10.980469 45.648437 8.179688 63.222656-7.046874l42.464844 36.800781c-12.992188 21.375-7.4375 49.144531 12.78125 63.875s48.351562 11.511719 64.71875-7.410157c16.367187-18.917968 15.503906-47.222656-1.984376-65.109374-17.488281-17.886719-45.765624-19.386719-65.050781-3.453126l-42.398437-36.800781c9.1875-14.183593 11.40625-31.785156 6.03125-47.808593l75.527344-37.757813c7.5 9.707031 19.082031 15.382813 31.351562 15.359375 22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm-160 160c-19.714844-.007812-36.484375-14.382812-39.507812-33.863281-3.023438-19.484375 8.597656-38.261719 27.382812-44.25 18.785156-5.984375 39.128906 2.609375 47.933594 20.25 6.160156 12.402343 5.476562 27.113281-1.8125 38.890625-7.289063 11.777344-20.144532 18.953125-33.996094 18.972656zm120 32c15.054688-.007812 28.078125 10.476562 31.285156 25.183594 3.207032 14.707031-4.269531 29.660156-17.960937 35.917968-13.691407 6.261719-29.894531 2.128907-38.917969-9.917968s-8.429688-28.757813 1.425781-40.136719c6.074219-7.011719 14.890625-11.042969 24.167969-11.046875zm40-128c-9.121094.03125-17.457031-5.160156-21.457031-13.359375-1.695313-3.289063-2.570313-6.941406-2.542969-10.640625 0-13.253906 10.746094-24 24-24s24 10.746094 24 24-10.746094 24-24 24zm0 0" fill="#e91e63" />
                </svg> Share
            </a>
        </div>
        <hr>
        <div class="related grey lighten-3">
            <h5 class="blue-text text-darken-2">Related Posts</h5>
            <div class="grid">
                <div class="card horizontal" v-for="item in related" v-bind:id="item.id" v-bind:key="item.id">
                    <div class="card-image" v-bind:style="{'position':'relative', 'background-image': 'url('+ item.img.src +')'}">
                        <router-link v-bind:to="'/post/'+item.id">&nbsp;</router-link>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content ">
                            <h6 class="card-title ">
                                <router-link v-bind:to="'/post/'+item.id" v-html="item.title" class="blue-text text-darken-4"></router-link>
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data: function() {
        return {
            name: "Post",
            id: '',
            post: [],
            related: [],
            errors: [],
            textSize: 1.1
        }
    },
    watch: {
        '$route'() {
            // console.log(to, from);
            this.loadStory();
        }
    },
    mounted: function() {
        this.loadStory();
    },
    methods: {
        loadStory: function() {
            this.$emit('back', true);
            this.$emit('loading', true);
            /*fetch post detail*/
            axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/posts/' + this.$route.params.id + '/?_embed')
                .then(response => {
                    // console.log(response.data);
                    this.post = response.data;
                    window.sessionStorage.setItem('title', this.post.title.rendered);
                    window.sessionStorage.setItem('link', this.post.link);
                    window.sessionStorage.setItem('image', this.post.jetpack_featured_media_url);
                    for (var k in response.data) {
                        if (k == "jetpack-related-posts") {
                            this.related = response.data[k];
                        }
                    }
                })
                .catch(e => { this.errors.push(e) })
                .then(() => {
                    this.$emit('loading', false);
                    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
                });
        },
        featuredMedia: function(data) {
            // console.log(data);
            var newobj = {};
            for (var k in data) {
                newobj[k.replace(":", "")] = data[k];
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
            returnobj.media = (newobj.wpfeaturedmedia) ? (newobj.wpfeaturedmedia[0].source_url) : 'dist/post-place.jpg';
            returnobj.category = category(newobj.wpterm[0]); //newobj.wpterm[0][0].name;
            returnobj.tags = category(newobj.wpterm[1]); //[0].name;
            returnobj.author = newobj.author[0].name;

            // console.log(returnobj);
            return returnobj;
        },
        fontSize: function(argument) {
            this.textSize = argument;
        }
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

.textsize {
    float: right;
    background: white;
    font-size: 14px;
    margin-top: -1.05rem;
    position: sticky;
    top: 56px;
    right: 0;
    z-index: 5;
}

.textsize button {
    background: none;
    padding: 0.5em 0.75em;
    border: 0 none;
    font-size: 1.1em;
    min-width: 36px;
}

.textsize button:nth-child(1) {
    font-size: 0.9em;
}

.textsize button:nth-child(3) {
    font-size: 1.25em;
}

.post {
    padding: 0;
}

.post .head {
    padding: 10px 10px 0;
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