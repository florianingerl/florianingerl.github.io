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
        <td><router-link to="/informatik/regexexercises/pointdexclamationfr">Exclamation mark in the French language</router-link></td>
        <td>Flori10</td>
      </tr>
    <tr>
        <td>1</td>
        <td><router-link to="/informatik/regex">Regular expressions</router-link></td>
        <td>Flori10</td>
      </tr>
    
      
    </tbody>
  </table>

</div>

 
</template>

<script>

export default {
  name: "VueComputerScience",
  components: {
  
  },
  props: [],

  data() {
    return {
       
    };
  },

  mounted(){
     


  },
  setup(){
   console.log("The setup function is executed!");
  },
  
  
  methods: {
    
  }
}
</script>

<style scoped>



</style>