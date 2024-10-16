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
        <td><router-link to="/esp/espagnol/grammaire/negationenespagnol">La négation en espagnol</router-link></td>
        <td>Flori10</td>
      </tr>
      
    </tbody>
  </table>

</div>

 
</template>

<script>

export default {
  name: "VueEspagnol",
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
a {
  text-transform: none
}


</style>