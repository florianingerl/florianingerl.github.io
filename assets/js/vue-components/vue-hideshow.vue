<template>

<div>
<button v-if="show" @click="show=false;">Hide solution</button>
<button v-if="!show" @click="show=true;">Show solution</button>
<slot v-if="show"> </slot>
</div>


    
</template>

<script>

export default {
  name: "VueHideShow",
  components: {
    
  },

  mounted(){
     console.log("The setup function is executed!");
     
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
       show: false
    };
  }
}
</script>

<style scoped>




</style>