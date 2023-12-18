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
        <td>4</td>
        <td><router-link to="/french/grammaire/passesimple">imparfait ou passe simple</router-link></td>
        <td>Flori10</td>
      </tr>
      <tr>
        <td>3</td>
        <td><router-link to="/french/grammaire/conditionelle3">Phrase de type conditionelle 3</router-link></td>
        <td>Flori10</td>
      </tr>
      <tr>
        <td>2</td>
        <td><router-link to="/french/grammaire/dontouduquel">Dont ou duquel</router-link></td>
        <td>Flori10</td>
      </tr>
      <tr>
        <td>1</td>
        <td><router-link to="/french/grammaire/en">Pronom en</router-link></td>
        <td>Flori10</td>
      </tr>
      
    </tbody>
  </table>

</div>

 
</template>

<script>

export default {
  name: "VueFrancais",
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