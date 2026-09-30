<template>
    <div class="home">
        <!-- <div class="category blue lighten-5 z-depth-1">
            <div class="select">
                <label for="category">Select Category</label>
                <select class="browser-default blue-text text-darken-3" v-model="category" v-on:change="catDetail()" name="category">
                    <option value="" selected>Select Category</option>
                    <option v-for="item in categories" v-bind:value="item.id" v-bind:key="item.id">{{item.name}} ({{item.count}})</option>
                </select>
            </div>
        </div> -->
        <div class="home-tabs white z-depth-1">
            <ul>
                <li><a href="#" v-on:click="tab1=true,tab2=false,tab3=false" v-bind:class="{'active':tab1}">Recent Stories</a></li>
                <li><a href="#" v-on:click="tab1=false,tab2=true,tab3=false" v-bind:class="{'active':tab2}">Recent Interviews</a></li>
                <li><a href="#" v-on:click="tab1=false,tab2=false,tab3=true" v-bind:class="{'active':tab3}">Diary</a></li>
            </ul>
        </div>
        <div v-bind:key="tab1" v-show="tab1">
            <div class="home-tab-content">
                <div class="card horizontal" v-for="item in posts" v-bind:id="item.id" v-bind:key="item.id">
                    <div class="card-stacked">
                        <div class="card-content ">
                            <h6 class="card-title ">
                                <router-link v-html="item.title.rendered" v-bind:to="'/post/'+item.id" class="blue-text text-darken-4"></router-link>
                            </h6>
                            <div class="grey-text text-darken-1 excerpt" v-html="item.excerpt.rendered"></div>
                            <div class="meta grey-text">
                                <span class="text"><i class=" flaticon-user-1 blue-text text-darken-2">
                                    </i> {{featuredMedia(item._embedded).author}}</span> <span class="text"><i class=" flaticon-calendar blue-text text-darken-2"></i> {{ item.date | datestring}}</span>
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
                <!-- <hr> -->
                <div class="card horizontal" v-for="item in moreposts" v-bind:id="item.id" v-bind:key="item.id">
                    <div class="card-stacked">
                        <div class="card-content ">
                            <h6 class="card-title ">
                                <router-link v-html="item.title.rendered" v-bind:to="'/post/'+item.id" class="blue-text text-darken-4"></router-link>
                            </h6>
                            <div class="grey-text text-darken-1 excerpt" v-html="item.excerpt.rendered"></div>
                            <div class="meta grey-text">
                                <span class="text"><i class=" flaticon-user-1 blue-text text-darken-2">
                                    </i> {{featuredMedia(item._embedded).author}}</span> <span class="text"><i class=" flaticon-calendar blue-text text-darken-2"></i> {{ item.date | datestring}}</span>
                            </div>
                            <div class="card-action">
                                <router-link v-bind:to="'/post/'+item.id">Read More</router-link>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card-image" v-bind:style="{'position':'relative', 'background-image': 'url('+ featuredMedia(item._embedded).media +')'}">
                        <router-link v-bind:to="'/post/'+item.id">&nbsp;</router-link>
                    </div> -->
                </div>
                <!-- <div class="center-align" v-if="postarray[0].button" style="padding:1em;">
                    <button class="btn-small waves-effect blue darken-2" v-show="!postarray[0].loading" v-on:click="morePosts(postarray[0].currpage + 1)">Load more</button>
                    <div class="preloader-wrapper small active" v-show="postarray[0].loading">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <div v-show="tab2">
            <div class="home-tab-content">
                <!-- <div class="card horizontal" v-for="item in interviews" v-bind:id="item.id" v-bind:key="item.id">
                    <div class="card-stacked">
                        <div class="card-content ">
                            <h6 class="card-title ">
                                <router-link v-bind:to="'/post/'+item.id" v-html="item.title.rendered" class="blue-text text-darken-4"></router-link>
                            </h6>
                            <div class="grey-text text-darken-1 excerpt" v-html="item.excerpt.rendered"></div>
                            <div class="meta grey-text">
                                <span class="text"><i class=" flaticon-user-1 blue-text text-darken-2">
                                    </i> {{featuredMedia(item._embedded).author}}</span> <span class="text"><i class=" flaticon-calendar blue-text text-darken-2"></i> {{ item.date | datestring}}</span>
                            </div>
                            <div class="card-action">
                                <router-link v-bind:to="'/post/'+item.id">Read More</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="card-image" v-bind:style="{'position':'relative', 'background-image': 'url('+ featuredMedia(item._embedded).media +')'}">
                        <router-link v-bind:to="'/post/'+item.id">&nbsp;</router-link>
                        <img v-bind:src="featuredMedia(item._embedded).media" >
                    </div>
                </div> -->
                <!-- <div class="center-align" v-if="interviewbutton" style="padding:1em;">
                    <button class="btn-small waves-effect blue darken-2" v-show="!loading" v-on:click="moreinterview(interviewcurrentpage + 1)">Load more</button>
                    <div class="preloader-wrapper small active" v-show="loading">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <div v-show="tab3">
            <div class="home-tab-content">
                <!-- <div class="card horizontal" v-for="item in diary" v-bind:id="item.id" v-bind:key="item.id">
                    <div class="card-stacked">
                        <div class="card-content ">
                            <h6 class="card-title ">
                                <router-link v-bind:to="'/post/'+item.id" v-html="item.title.rendered" class="blue-text text-darken-4"></router-link>
                            </h6>
                            <div class="grey-text text-darken-1 excerpt" v-html="item.excerpt.rendered"></div>
                            <div class="meta grey-text">
                                <span class="text"><i class=" flaticon-user-1 blue-text text-darken-2">
                                    </i> {{featuredMedia(item._embedded).author}}</span> <span class="text"><i class=" flaticon-calendar blue-text text-darken-2"></i> {{ item.date | datestring}}</span>
                            </div>
                            <div class="card-action">
                                <router-link v-bind:to="'/post/'+item.id">Read More</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="card-image" v-bind:style="{'position':'relative', 'background-image': 'url('+ featuredMedia(item._embedded).media +')'}">
                        <router-link v-bind:to="'/post/'+item.id">&nbsp;</router-link>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data: function() {
        return {
            name: "",
            // categories: [],
            // category: "",
            // catdetail: "",
            posts: [],
            // interviews: [],
            // diary: [],
            tab1: true,
            tab2: false,
            tab3: false,
            // headers: [],
            // perpage: 10,
            postarray: [
                {posts:0, currpage:1, pages:0, button:true, loading:false}
            ],
            /*postscurrentpage: 1,
            postspages: 0,
            poststotal: 0,
            postsbutton: true,*/
            interviewcurrentpage: 1,
            interviewpages: 0,
            interviewtotal: 0,
            interviewbutton: true,
            diarycurrentpage: 1,
            diarypages: 0,
            errors: [],
            moreposts: [],
            moreinterviews: [],
            morediary: []
        }
    },
    mounted: function() {

        /*fetch recent*/
        if (window.sessionStorage.getItem('recent')) {
            this.posts = JSON.parse(window.sessionStorage.getItem('recent'));
            this.postarray[0].posts = JSON.parse(window.sessionStorage.getItem('poststotal'));
            this.postarray[0].pages = JSON.parse(window.sessionStorage.getItem('postspages'));
        } else {
            this.$emit('back', false);
            this.$emit('loading', true);
            /*fetch recent*/
            // axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/posts?_embed&page=' + Number(this.postarray[0].currpage) + '&per_page=' + this.perpage)
            // axios.get("https://shortstories-api.onrender.com/")
            axios.get("https://stephen-king-api.onrender.com/api/shorts")
                .then(response => {
                    // console.log(response);
                    this.posts = response.data
                    // let headers = response.headers;
                    window.sessionStorage.setItem('recent', JSON.stringify(response.data));
                    /* for (var k in headers) {
                        if (k == 'x-wp-total') {
                            this.postarray[0].posts = Number(headers[k]);
                            window.sessionStorage.setItem('poststotal', JSON.stringify(headers[k]));
                        } else if (k == 'x-wp-totalpages') {
                            this.postarray[0].pages = Number(headers[k]);
                            window.sessionStorage.setItem('postspages', JSON.stringify(headers[k]));
                        }
                    } */
                })
                .catch(e => { this.errors.push(e) })
                .then(() => {
                    this.$emit('loading', false);
                });
        }

        /*fetch interview*/
        /* if (window.sessionStorage.getItem('women')) {
            this.interviews = JSON.parse(window.sessionStorage.getItem('women'));
        } else {
            
            axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/posts?_embed&categories=248')
                .then(response => {
                    console.log(response);
                    this.interviews = response.data;
                    let headers = response.headers;
                    window.sessionStorage.setItem('women', JSON.stringify(response.data));
                    for (var k in headers) {
                        if (k == 'x-wp-total') {
                            this.interviewtotal = Number(headers[k]);
                            window.sessionStorage.setItem('interviewtotal', JSON.stringify(headers[k]));
                        } else if (k == 'x-wp-totalpages') {
                            this.interviewpages = Number(headers[k]);
                            window.sessionStorage.setItem('interviewpages', JSON.stringify(headers[k]));
                        }
                    }
                })
                .catch(e => { this.errors.push(e) });
        } */

        /*fetch diary*/
        /* if (window.sessionStorage.getItem('diary')) {
            this.diary = JSON.parse(window.sessionStorage.getItem('diary'));
        } else {
            axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/posts?_embed&categories=347')
                .then(response => {
                    console.log(response);
                    this.diary = response.data;
                    window.sessionStorage.setItem('diary', JSON.stringify(response.data));
                })
                .catch(e => { this.errors.push(e) });
        } */

        /*fetch categories*/
        /* if (window.sessionStorage.getItem('categories')) {
            this.categories = JSON.parse(window.sessionStorage.getItem('categories'));
        } else {
            axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/categories?orderby=count&order=desc&per_page=50')
                .then(response => {
                    // console.log(response.data);
                    this.categories = response.data;
                    window.sessionStorage.setItem('categories', JSON.stringify(response.data));
                })
                .catch(e => { this.errors.push(e) });
        }
 */
        this.$emit('back', false);

    },
    /* methods: {
        featuredMedia: function(data) {

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

            var returnobj = {};

            if (data) {
                var newobj = {};
                for (var k in data) {
                    newobj[k.replace(":", "")] = data[k];
                }

                returnobj.media = (newobj.wpfeaturedmedia) ? (newobj.wpfeaturedmedia[0].source_url) : 'img/noimage.jpg';
                returnobj.category = category(newobj.wpterm[0]);
                returnobj.tags = category(newobj.wpterm[1]);
                returnobj.author = newobj.author[0].name;
                return returnobj;
            } else {
                returnobj.media = 'img/noimage.jpg';
            }

        },
        catDetail: function() {
            this.$router.push('/story/' + this.category);
        },
        morePosts: function(page) {
            
            if (this.postarray[0].currpage < this.postarray[0].pages) {
                this.postarray[0].loading = true;
                axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/posts?_embed&page=' + Number(page) + '&per_page=' + this.perpage)
                    .then(response => {
                        // this.moreposts.push(response.data);
                        for (var i = 0; i < response.data.length; i++) {
                            this.moreposts.push(response.data[i]);
                        }
                        window.sessionStorage.setItem('moreposts', JSON.stringify(this.moreposts));
                        this.postarray[0].currpage++;
                    })
                    .catch(e => { this.errors.push(e); this.postarray[0].button = false; })
                    .then(() => {
                        this.postarray[0].loading = false;
                    });
            } else {
                this.postarray[0].button = false;
            }
        }
    } */
}
</script>
<style>
.home {
    padding: 0;
}

.category {
    margin-bottom: 0;
}

.category .select {
    width: 90%;
    max-width: 400px;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.category select {
    border: 0 none;
    text-transform: uppercase;
    text-align: center;
    font-weight: 600;
    background: none transparent;
}

.category select:focus {
    outline: none;
}

.home-tab-content {
    padding-left: 10px;
    padding-right: 10px;
}

.home-tabs ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: center;
}

.home-tabs ul li {}

.home-tabs ul li a {
    display: block;
    padding: 10px 12px;
    text-decoration: none;
    text-align: center;
    position: relative;
    color: grey;
}

.home-tabs ul li a.active {
    color: #263a7e;
}

.home-tabs ul li a:before {
    content: '';
    border-left: 1px solid #2460a2;
    position: absolute;
    left: 0;
    top: 25%;
    height: 50%;
}

.home-tabs ul li:first-child a:before {
    border-left: 0 none;
}

.home .card .card-action,
.search .card .card-action {
    padding: 0;
}

.home .card .card-action a,
.search .card .card-action a {
    font-size: 0.85em;
}

.home .card.horizontal .card-stacked,
.search .card.horizontal .card-stacked {
    flex: 2;
}

.home .card.horizontal .card-content,
.search .card.horizontal .card-content {
    padding: 5px 10px;
    font-size: 14px;
}

.card-content .excerpt {
    word-break: break-word;
    text-align: justify;
    max-height: 3.6em;
    overflow: hidden;
}

.home .card.horizontal .card-title,
.search .card.horizontal .card-title {
    font-size: 1em;
    margin-top: 3px;
    margin-bottom: 2px;
    line-height: 1.25;
    font-weight: 500;
    text-transform: uppercase;
}

.home .card.horizontal p,
.search .card.horizontal p {
    line-height: 1.25;
    font-size: 1em;
}

.home .card.horizontal .card-image,
.search .card.horizontal .card-image {
    flex: 1;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.home .card.horizontal .card-image a,
.search .card.horizontal .card-image a {
    display: block;
    height: 100%;
}

.home .card.horizontal .meta,
.search .card.horizontal .meta {
    font-size: 0.75em;
    padding-top: 6px;
}

.home .card.horizontal .meta .material-icons,
.search .card.horizontal .meta .material-icons {
    vertical-align: middle;
}

.home .card.horizontal .meta span,
.search .card.horizontal .meta span {
    line-height: 1.5;
}

.home .card.horizontal .meta span:first-child,
.search .card.horizontal .meta span:first-child {
    margin-right: 10px;
}
</style>