<template>

<div :class="{ topnav: true, responsive : responsive }" id="myTopnav">
   <router-link :class="{active : $route.fullPath.includes('/french') }" to="/fr/french">Français</router-link>
   <router-link :class="{active : $route.fullPath.includes('/english') }" to="/en/english">English</router-link>
   <router-link :class="{active : $route.fullPath.includes('/informatik') }" to="/informatik">Computer science</router-link>
  <a href="javascript:void(0);" class="icon" @click="myFunction">
    <i class="fa fa-bars"></i>
  </a>
</div>

<div id="main" style="padding-left:16px">

    <router-view></router-view>

</div>
    
</template>

<script>

export default {
  name: "VueHome",
  components: {
  
  },
  data() {
    return {
       responsive: false
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
     myFunction() {
      this.responsive = !this.responsive;
      /*
      var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }*/
     }
  },
  computed: {
     
  }
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}

</style>