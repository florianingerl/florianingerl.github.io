<template>

<div class="vertical-menu">
  <p>
    <button v-if="selectedMenus.length > 0" @click="menuUpClicked">Up</button> <span v-for="menu in selectedMenus" @click="goBackToMenuClicked(menu)">{{menu}} &gt; </span>
  </p>
  <!-- <a href="#" class="active">Home</a>
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
  <a href="#">Link 4</a> -->
  <a v-for="item in currentMenuItems" :class="{ active: item.name === selectedMenus[selectedMenus.length - 1] }" @click="menuClicked(item.name)">{{item.name}}</a>

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
  props: ['gapfile'],

  mounted(){
    console.log("Mounted function is executed!");

  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
      selectedMenus : [],
      items: [
          { name: 'Französisch', path: '/french', children: [
            { name: 'Konditionalsätze 1', path: '/phraseconditionnel1' },
            { name: 'Konditionalsätze 2', path: '/phraseconditionnel2' },
            { name: 'Alimentation', children: [
              { name: 'Alimentation1', path: '/alimentation1' },
              { name: 'Alimentation2', path: '/alimentation2' }
            ] }
          ]},
          { name: 'Englisch', path: '/english', children: [
            { name: 'Emphasis', path: '/emphasis', children: [
              { name: 'Emphasis 1', path: '/emphasis1' },
              { name: 'Emphasis 2', path: '/emphasis2' }
            ]},
           { name: 'RawFood', path: '/rawfood', children: [
              { name: 'Raw Food 1', path: '/rawfood/1/' },
              { name: 'Raw Food 2', path: '/rawfood/2/' }
            ]},
          ]},
          { name: 'Github', path: 'https://github.com' },
        ]
    };
  },
  methods: {
     menuClicked(name){
        //If aktuelles Menu has no children, it must be removed!
        if( this.selectedMenus.length > 0 ){
            let currentMenu = this.currentMenuItems.findIndex( e => e.name === this.selectedMenus[this.selectedMenus.length - 1]);
            if(currentMenu != -1 ){
                this.selectedMenus.pop();
            }
        }
        let cmi = this.currentMenuItems.find( e => e.name === name );
        this.selectedMenus.push(name);
        this.$router.push(cmi.path);
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
            let c = cMI.find( e => e.name === this.selectedMenus[i] );
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