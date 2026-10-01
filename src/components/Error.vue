<template>
  <div class="card-panel pink lighten-5" visible="" errmsg="" v-show="visible" >
      <i class="flaticon-light-bulb red-text"></i>{{errmsg}}
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
<style scoped>
i {
  font-size: 2rem;
  margin-right: 1rem;
}
</style>