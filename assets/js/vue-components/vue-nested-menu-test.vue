<template>
<h1>This is vue tree test</h1>

<VueNestedMenu />
    
</template>

<script>
  import VueNestedMenu from "./vue-nested-menu.vue";
export default {
  

  components: {
      VueNestedMenu
  },

  mounted(){
     console.log("The mounted function is executed!");
  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  data() {
    return {
        items: [
          { name: 'Products', children: [
            { name: 'Shoes', path: 'shoes' }
          ]},
          { name: 'About', path: 'about', children: [
            { name: 'Contact', path: 'contact', children: [
              { name: 'E-mail', element: 'email' },
              { name: 'Phone', element: 'phone' }
            ]},
          ]},
          { name: 'Github', external: 'https://github.com' },
        ]
    };
  },
  methods: {
     
  }
}
</script>

<style scoped>



</style>