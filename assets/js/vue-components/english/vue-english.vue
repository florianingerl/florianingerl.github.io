<template>
<div>
    <table class="table table-striped">
    <thead>
      <tr>
        <th>N°</th>
        <th>Titre</th>
        <th>Autheur</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td><router-link to="/english/books/rawfood/1">Raw food</router-link></td>
        <td>Flori10</td>
      </tr>
    
      
    </tbody>
  </table>

</div>

 
</template>

<script>

export default {
  name: "VueEnglish",
  components: {
  
  },
  props: [],

  data() {
    return {
       
    };
  },

  mounted(){
     console.log("The mounted function of Vue english is executed!");


  },
  setup(){
   console.log("The setup function of Vue english is executed!");
  },
  
  
  methods: {
    
  }
}
</script>

<style scoped>



</style>