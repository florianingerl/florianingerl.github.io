<template>
<h1>Vue-tree-navigation</h1>
  <vue-tree-navigation :items="items" />
</template>

<script>

  export default {
    name: 'NavBar',
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
        ],
      };
    },
  };
</script>