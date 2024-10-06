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
        <td>2</td>
       <td><router-link to="/de/deutsch/kurzgeschichten/vogelmarcia">Mit Vögeln Äpfel teilen</router-link></td>
       <td>Flori10</td>
    </tr>

           <tr>
        <td>1</td>
       <td><router-link to="/de/deutsch/kurzgeschichten/katzemagfisch">Eine Katze, die Fisch mag</router-link></td>
       <td>Flori10</td>
    </tr>


      
    </tbody>
  </table>

</div>

 
</template>

<script>

export default {
  name: "VueDeutsch",
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