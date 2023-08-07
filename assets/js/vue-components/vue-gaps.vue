<template>
<h1>Remplis les trous!</h1>
<div>
<span v-for="gap in gaps" >
  {{ gap.text }} <input type="text">
</span>

</div>
    
</template>

<script>

export default {

  components: {
  
  },
  props: ['gapfile'],

  setup(){
     console.log("The setup function is executed!");
     
  },
  
  data() {
    return {
       gaps : [{text: "Florian est le ", gap: "frère"}, {text: " de sa ", gap: "soeur"}, {text: " qui s'appelle ", gap: "Sonja"}]
    };
  },
  methods: {
     
  }
}
</script>

<style scoped>

</style>