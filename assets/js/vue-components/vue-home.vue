<template>

<div class="w3-sidebar w3-bar-block w3-card w3-animate-left" style="display:none" id="mySidebar">
  <button class="w3-bar-item w3-button w3-large"
  @click="w3_close()">Close &times;</button>
 
   <router-link class="w3-bar-item w3-button" to="/french">Français</router-link>
   <router-link class="w3-bar-item w3-button" to="/english">English</router-link>
   <router-link class="w3-bar-item w3-button" to="/informatik">Computer science</router-link>
</div>

<div id="main">

<div class="w3-teal">
  <button id="openNav" class="w3-button w3-teal w3-xlarge" @click="w3_open()">&#9776;</button>
  <div class="w3-container">
    <h1 v-if="$route.fullPath == '/french'">Apprendre le français</h1>
    <h1 v-if="$route.fullPath == '/english'">Learn English</h1>
    <h1 v-if="$route.fullPath == '/informatik'">Learn Computer Science</h1>

  </div>
</div>

<div class="w3-container">
    <router-view></router-view>
</div>

</div>
    
</template>

<script>

export default {
  name: "VueHome",
  components: {
  
  },
  data() {
    return {
      
    };
  },

  mounted(){
    console.log("Mounted function of vue-home is executed!");
    console.log(this.$route);
  },
  setup(){
   console.log("The setup function is executed!");

   
  },
  
  methods: {
    w3_open() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
},
 w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}
  },
  computed: {
     
  }
}
</script>

<style scoped>


</style>