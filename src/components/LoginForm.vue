<script>
import { onMounted } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useSession } from "../stores/session";
import UserService from '@/services/UserService.js'

export default {
  name: 'LoginForm',
  data() {
     return {
       title: 'Authentification',
       error: '',
       username: '',
       password: '',
     }
  },
    computed: {
      ...mapState(useSession, ["loggedIn"])
    },
    methods: {
      ...mapActions(useSession, ["login"]),

    async _login () {
      this.error = null;
      //try {
        const response = await UserService.login({ username: this.username, password: this.password })
        console.log(response, "heu ?")
        const session = useSession();
        session.login({  token: response.token });
        //this.$router.push('/search');
        this.$router.push('/actors');
        console.log("connecté ! Normalement ...")
      /*} catch (error) {
        this.error = error.toString()
        console.log("error lol")

      }*/
    }
}
}
</script>

<template>
  <div id="login-form">
    
    <form @submit.prevent="_login()">
      <h1>{{ title }}</h1>
      <p>Remplissez ce formulaire pour vous connecter.</p>
      <hr>

      <label for="username" ><b>username</b></label>
      <input type="text" v-model="username" placeholder="Entrez votre courriel" id="username" name="username" required>
      <br>
      <label for="psw"><b>Mot de passe</b></label>
      <input type="password" v-model="password" placeholder="Entrez votre mot de passe" id="password" name="password" required>

      <p><button type="submit">Se connecter</button>     </p>
    

      <p>{{ error }}</p>
      <!-- <p><button type="submit" v-on:submit.prevent="submitLoggin">Se connecter</button></p> -->
    </form>
   
  </div>
</template>

<style scoped>

  #login-form{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    color: white;
    margin-top: 10vh;

  }

  form{
    display: flex ;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(25, 25, 25);
    width: 50%;
    padding: 2rem;
    border-radius: 0.5rem;
  }
</style>
