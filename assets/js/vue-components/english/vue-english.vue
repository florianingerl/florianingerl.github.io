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
        <td>7</td>
        <td><router-link to="/en/english/shortstories/laraandherbird">Lara and her bird</router-link></td>
        <td>Flori10</td>
      </tr>
    
      <tr>
        <td>7</td>
        <td><router-link to="/en/english/shortstories/annaturtoises">Advertisement with turtoises</router-link></td>
        <td>Flori10</td>
      </tr>
    
      <tr>
        <td>6</td>
        <td><router-link to="/en/english/shortstories/thecatdetective">The cat detective</router-link></td>
        <td>Flori10</td>
      </tr>

     <tr>
        <td>5</td>
        <td><router-link to="/en/english/vocabulary/conjunctions">Conjunctions</router-link></td>
        <td>Flori10</td>
      </tr>
    <tr>
        <td>4</td>
        <td><router-link to="/en/english/books/fred/1">A book about Fred</router-link></td>
        <td>Flori10</td>
      </tr>
    <tr>
        <td>1</td>
        <td><router-link to="/en/english/books/rawfood/1">Raw food</router-link></td>
        <td>Flori10</td>
        </tr>
        <tr>
        <td>2</td>
        <td><router-link to="/en/english/grammar/enoughtoo">Enough and Too</router-link></td>
        <td>Flori10</td>
      </tr>
      <tr>
        <td>3</td>
        <td><router-link to="/en/english/grammar/even">Even</router-link></td>
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

a {
  text-transform: none
}

</style>