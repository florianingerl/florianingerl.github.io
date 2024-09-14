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
<td>14</td>
       <td><router-link to="/fr/french/grammaire/inversionsujetverbe">Inversion sujet et verbe</router-link></td>
       <td>Flori10</td>
    </tr>
    <tr>
<td>13</td>
       <td><router-link to="/fr/french/livres/livresurfred/1">Un livre sur Fred</router-link></td>
       <td>Flori10</td>
    </tr>
      <tr>
<td>12</td>
       <td><router-link to="/fr/french/prononciation/sone">Le son é</router-link></td>
       <td>Flori10</td>
    </tr>
    <tr>
<td>11</td>
       <td><router-link to="/fr/french/grammaire/neexpletif">Ne explétif</router-link></td>
       <td>Flori10</td>
    </tr>
    <tr>
<td>10</td>
       <td><router-link to="/fr/french/grammaire/celuioucelle">Celui,celle,ceux ou celles</router-link></td>
       <td>Flori10</td>
    </tr>
    <tr>
    <td>9</td>
       <td><router-link to="/fr/french/vocabulaire/encore">Le mot encore</router-link></td>
       <td>Flori10</td>
    </tr>
    <tr>
       <td>8</td>
       <td><router-link to="/fr/french/grammaire/dontouduquelcresson">Dont ou duquel - exerice avec des tamis de cresson</router-link></td>
       <td>Flori10</td>
    </tr>
    <tr>
        <td>7</td>
        <td><router-link to="/fr/french/grammaire/rajouterouajouter">Rajouter ou ajouter</router-link></td>
        <td>Flori10</td>
      </tr>
    <tr>
        <td>6</td>
        <td><router-link to="/fr/french/grammaire/lionpassesimpleouimparfait">L'histoire d'un lion - Passé simple ou l'imparfait</router-link></td>
        <td>Flori10</td>
      </tr>
     <tr>
        <td>5</td>
        <td><router-link to="/fr/french/grammaire/imparfaitouplusqueparfait">Imparfait ou Plus-que-parfait</router-link></td>
        <td>Flori10</td>
      </tr>
    <tr>
        <td>4</td>
        <td><router-link to="/fr/french/grammaire/passesimple">imparfait ou passe simple</router-link></td>
        <td>Flori10</td>
      </tr>
      <tr>
        <td>3</td>
        <td><router-link to="/fr/french/grammaire/conditionelle3">Phrase de type conditionelle 3</router-link></td>
        <td>Flori10</td>
      </tr>
      <tr>
        <td>2</td>
        <td><router-link to="/fr/french/grammaire/dontouduquel">Dont ou duquel</router-link></td>
        <td>Flori10</td>
      </tr>
      <tr>
        <td>1</td>
        <td><router-link to="/fr/french/grammaire/en">Pronom en</router-link></td>
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