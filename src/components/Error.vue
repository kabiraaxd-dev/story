<template>
  <div class="card-panel pink" visible="" errmsg="" v-show="visible" >
      <p>{{errmsg}}</p>
  </div>
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