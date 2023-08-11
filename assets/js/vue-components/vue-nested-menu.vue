<template>

<div class="vertical-menu">
  <p>
    <button v-if="selectedMenus.length > 0" @click="menuUpClicked">Up</button> <span v-for="menu in selectedMenus" @click="goBackToMenuClicked(menu)">{{menu.name}} &gt; </span>
  </p>

  <a v-for="item in currentMenuItems" :class="{ active: selectedMenus.length > 0 && item.name === selectedMenus[selectedMenus.length - 1].name }" @click="menuClicked(item)">{{item.name}}</a>

</div>

<!-- Page content -->
<div class="main">
   <router-view></router-view>
</div>
    
</template>

<script>

export default {
  name: "VueNestedMenu",
  components: {
  
  },


  mounted(){
    console.log("Mounted function of vue-nested-menu is executed!");
    console.log(this.$router.options.routes);
    this.items = this.$router.options.routes;

  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
      selectedMenus : [],
      items: []
    };
  },
  methods: {
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
        let path="";
        this.selectedMenus.forEach( item => {
          path = path + "/" + item.path;
        });
        path = path.replace("//","/");
        path = path.replace(":page","1");
        this.$router.push(path);
     },
     menuUpClicked(){
        this.selectedMenus.pop();
     },
     goBackToMenuClicked(menu){
        let i = this.selectedMenus.indexOf(menu);
        this.selectedMenus = this.selectedMenus.slice(0,i+1);
     }
  },
  computed: {
     currentMenuItems(){
        let cMI = this.items;
        for(let i=0; i < this.selectedMenus.length; ++i){
            let c = cMI.find( e => e.name === this.selectedMenus[i].name );
            if( c.children ){
                cMI = c.children;
            }
            else{
                return cMI;
            }
        }
        return cMI;
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