<template>
  <error class="card-panel pink" visible="" errmsg="" v-show="visible" >
      <p>{{errmsg}}</p>
  </error>
</template>
<script>
  export default{
        data() {
            return {
                name: "Error"
            }
        },
        props: ['visible', 'errmsg'],
        mounted: function() {
            
        },
        methods: {
          
        }
    }
</script>