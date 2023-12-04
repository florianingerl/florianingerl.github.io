<template>


<form>
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
</form>


    
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
        if( this.user.nickname.trim().length() == 0 ){
            alert("Please give your nickname!");
            return;
        }
        if( this.user.password.trim().length() == 0 ){
            alert("Please give a password!");
            return;
        }
        if( this.user.email.trim().length() == 0 ){
            alert("Please give an email!");
            return;
        }

        axios.post('/usersignup', user)
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