<script>
import { onMounted } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useSession } from "../stores/session";
import UserService from '@/services/UserService.js'

export default {
  name: 'RegisterForm',
  data() {
     return {
       title: 'Inscription',
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

      async register () {
      this.error = null;
      try {
        const response = await UserService.register({
          email: this.username,
          plainPassword: this.password,
          
        })
      
    
        
      } catch (error) {
        this.error = error.toString()
      }
    },

}
}
</script>

<template>
  <div id="login-form">
    
    <form @submit.prevent="register()">
      <h1>{{ title }}</h1>
      <p>Remplissez ce formulaire pour vous inscrire.</p>
      <hr>

      <label for="username" ><b>username</b></label>
      <input type="text" v-model="username" placeholder="Entrez votre courriel" id="username" name="username" required>

      <label for="psw"><b>Mot de passe</b></label>
      <input type="password" v-model="password" placeholder="Entrez votre mot de passe" id="password" name="password" required>

      <p><button type="submit">S'enregistrer</button>     </p>
    

      <p>{{ error }}</p>

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
