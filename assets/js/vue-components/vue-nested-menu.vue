<template>

<div class="vertical-menu">
  <p>
    <button v-if="selectedMenus.length > 0" @click="menuUpClicked">Up</button> <span v-for="menu in selectedMenus" @click="goBackToMenuClicked(menu)">{{menu.name}} &gt; </span>
  </p>

  <a v-for="item in currentMenuItems" :class="{ active: selectedMenus.length > 0 && item.name === selectedMenus[selectedMenus.length - 1].name }" @click="menuClicked(item)">{{item.name}}</a>
</div>

<!-- Page content -->
<div class="main">
<!-- <router-link to="/signup" class="btn btn-primary">Sign up</router-link>
<button>Sign in</button> -->
   <router-view></router-view>
</div> 
    
</template>

<script>

export default {
  name: "VueNestedMenu",
  components: {
  
  },
  data() {
    return {
      selectedMenus : [],
      items: []
    };
  },

  mounted(){
    console.log("Mounted function of vue-nested-menu is executed!");
    console.log(this.$router.options.routes);
    this.items = this.$router.options.routes;
    console.log(this.$route);
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  methods: {
     logRoute(){
      console.log(this.$route);
     },
     menuClicked(menu){
        console.log(menu);
        //If aktuelles Menu has no children, it must be removed!
        if( this.selectedMenus.length > 0 ){
            let currentMenu = this.currentMenuItems.findIndex( e => e.name === this.selectedMenus[this.selectedMenus.length - 1].name );
            if(currentMenu != -1 ){
                this.selectedMenus.pop();
            }
        }
        let cmi = this.currentMenuItems.find( e => e.name === menu.name );
        this.selectedMenus.push(menu);
        this.routeToSelectedMenu();
     },
     routeToSelectedMenu(){
        let path="";
        this.selectedMenus.forEach( item => {
          path = path + "/" + item.path;
        });
        
        path = path.replace(":page","1");
        path = path.replace("//","/");

        if(path==""){
          path="/";
        }
        console.log(path);
        this.$router.push(path);
     },
     menuUpClicked(){
        this.selectedMenus.pop();
        this.routeToSelectedMenu();

     },
     goBackToMenuClicked(menu){
        let i = this.selectedMenus.indexOf(menu);
        this.selectedMenus = this.selectedMenus.slice(0,i+1);
        this.routeToSelectedMenu();
     }
  },
  computed: {
     currentMenuItems(){
        let n = this.selectedMenus.length;
        if(n == 0){
          return this.items;
        }
        if( this.selectedMenus[n - 1].children ){
          return this.selectedMenus[n - 1].children;
        }
        else {
          return this.selectedMenus[n - 2].children;
        }
     }
  }
}
</script>

<style scoped>
    .vertical-menu {
   height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}

.vertical-menu a {
  background-color: #eee; /* Grey background color */
  color: black; /* Black text color */
  display: block; /* Make the links appear below each other */
  padding: 12px; /* Add some padding */
  text-decoration: none; /* Remove underline from links */
}

.vertical-menu a:hover {
  background-color: #ccc; /* Dark grey background on mouse-over */
}

.vertical-menu a.active {
  background-color: #04AA6D; /* Add a green color to the "active/current" link */
  color: white;
}

.main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
}

</style>