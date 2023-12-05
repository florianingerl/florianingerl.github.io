<template>


<div>
        <h2>Login</h2>
        <div class="input-field">
            <input type="text" v-model="user.nickname" name="username" id="username" placeholder="Enter username">
        </div>
        <div class="input-field">
            <input type="password" v-model="user.password" name="password" id="password" placeholder="Enter Password">
        </div>
        <div class="input-field">
            <input type="email" v-model="user.email" name="email" id="email" placeholder="Enter your e-mail">
        </div>
        <input @click="signUpClicked" type="submit" value="Sign up">
</div>


    
</template>

<script>


export default {
  name: "VueSignUp",
  components: {
    
  },

  mounted(){
     console.log("The sign up component is mounted!");
     
  },
  setup(){
   console.log("The sign up component is setup!");
  },

  methods: {
    signUpClicked() {
        console.log("The sign up button was clicked!");
        console.log(this.user);
        
        console.log("Axios will be called!");
        console.log(axios);

        axios.post('http://localhost:3000/usersignup', user)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
    }
  },
  
  data() {
    return {
       user : { email: "", nickname: "", password: "" }
    };
  }
}
</script>

<style scoped>

body {
    display: flex;
    justify-content: center;
}

form {
    display: flex;
    flex-direction: column;
}

.input-field {
    position: relative;
    margin-top: 2rem;
}

.input-field input {
    padding: 0.8rem;
}

form .input-field:first-child {
    margin-bottom: 1.5rem;
}

form input[type="submit"] {
    background: linear-gradient(to left, #4776E6, #8e54e9);
    color: white;
    border-radius: 4px;
    margin-top: 2rem;
    padding: 0.4rem;
}


</style>