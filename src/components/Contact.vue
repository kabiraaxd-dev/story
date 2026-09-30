<template>
    <div class="contact ">
        <h5 class="center-align blue-text text-darken-3 ">{{name}}</h5>
        <div class="container">
            <!-- <p class="center-align">Please feel free to talk to us if you have any question. We endeavour to answer with in 24 hours.</p> -->
            <div class="card">
                <div class="card-content">
                    <span class="card-title blue-text text-darken-3">Do you have any story/experience to share?</span>
                    <p>For any query please contact us. You can also email us at
                    </p>
                    <hr><a href="mailto:tellmeastorymom28@gmail.com">tellmeastorymom28@gmail.com</a>
                </div>
            </div>
            <div class="contact-form" v-html="page.content.rendered" v-on:focusin="handleClick"></div>
            <div style="min-height:200px;">&nbsp;</div>
            <!-- <form class="contact" v-on:submit.prevent="sendContact()">
                <ul class="collection" v-if="errors.length>0">
                  <li v-for="(err, index) in errors" v-bind:key="index" class="collection-item">{{err}}</li>
                </ul>
                <div class="input-field">
                  <textarea name="message" class="materialize-textarea" v-model="message" required></textarea>
                  <label for="message">{{label}}</label>
                </div>
                <div class="row">
                  <div class="col center-align s6">
                    <button type="submit" class="waves-effect waves-dark btn blue darken-4">Submit</button>
                  </div>
                  <div class="col center-align s6">
                    <button type="reset" class="waves-effect waves-dark btn ">Cancel</button>
                  </div>
                </div>
              </form> -->
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data: function() {
        return {
            name: "Contact",
            message: '',
            page: '',
            label: 'Your message',
            errors: []
        }
    },
    emits: ['back', 'loading'],
    mounted: function() {
        this.$emit('back', true);
        /*this.$emit('loading', true);*/
        this.loadPage();

    },

    methods: {
        loadPage: function() {
            this.$emit('back', true);
            this.$emit('loading', true);
            /*fetch page detail*/
            axios.get('http://www.tellmeastorymom.com/wp-json/wp/v2/pages/1351')
                .then(response => {
                    this.page = response.data;
                })
                .catch(e => {
                    // this.$emit('error',e.message);
                    this.errors.push(e);
                    this.message = e.message;
                })
                .then(() => {
                    this.$emit('loading', false);
                });
        },
        getOffset: function(el) {
            const rect = el.getBoundingClientRect();
            return {
                left: rect.left + window.scrollX,
                top: rect.top + window.scrollY
            };
        },
        handleClick: function(e) {
            if (e.target.matches('input, textarea')) {
                e.target.scrollIntoView({ behavior: "smooth", block: "center" });
                /*if (window.StatusBar) {
                    window.StatusBar.show();
                    setTimeout(function() {
                        window.StatusBar.hide();
                    }, 500);
                }*/
            }
        }
    }

}
</script>
<style>
.contact {
    padding-bottom: 10px;
}

.contact textarea {
    min-height: 100px;
    border-width: 0 0 1px;
}

.contact textarea:focus {
    outline: none;
    box-shadow: none;
}

.contact button {
    font-weight: 500;
    padding: 1em 2em;
    border: 0 none;
    text-transform: uppercase;
}
</style>