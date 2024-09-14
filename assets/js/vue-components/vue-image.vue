<template>
<div class="d-flex flex-row">
<img v-if="imageUrl != undefined" :src="imageUrl" @click="imageClicked"/>
<slot></slot>
</div>

 
</template>

<script>

export default {
  name: "VueImage",
  components: {
  
  },
  props: ['imageUrl'],

  data() {
    return {
       
    };
  },

  mounted(){
     
   console.log("The mounted function of VueImage is executed!" );

  },
  setup(){
   console.log("The setup function of VueImage is executed!");
     },
  
  
  methods: {
    imageClicked(){
      console.log("The image was clicked!");
      let fullPage = document.getElementById('fullpage');

		  fullPage.style.backgroundImage = 'url(' + this.imageUrl + ')';
		  fullPage.style.display = 'block';
    }
    
  }
}
</script>

<style scoped>


img {
  height: 200px;
}

</style>