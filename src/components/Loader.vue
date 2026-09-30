<template>
  <loader class="loader" visible="" msg="" v-show="visible" >
    <div>
      <img src="../assets/puff.svg" width="80" alt="loading">
      <p>{{msg}}</p>
    </div>
  </loader>
</template>
<script>
  export default{
        data() {
            return {
                name: "Loading..."
            }
        },
        props: ['visible', 'msg'],
        mounted: function() {
            
        },
        methods: {
          
        }
    }
</script>
<style type="text/css" scoped="">
.loader {
  position: fixed;
  background-color: rgba(20,38,56,0.92);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}
.loader div {
  color: #fff;
  width: 100%;
  height: 50%;
  left: 0;
  top: 25%;
  right: 0;
  margin-top: 25%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loader img {}

</style>
