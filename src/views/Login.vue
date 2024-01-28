<script>
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';

export default {
    name: 'Login',
    components: {
        LoginForm,
        RegisterForm,
    },
    data() {
        return {
            boolForm: true,
        };
    },
    methods: {
        toggleForm() {
            this.boolForm = !this.boolForm;
        }
    },
   
}

</script>

<template>
 
  <div v-if="this.boolForm == true">
    <LoginForm></LoginForm>
    <button @click="toggleForm">Je n'ai pas encore de compte</button>

  </div>
  <div v-else>
    <RegisterForm></RegisterForm>
    <button @click="toggleForm">J'ai déjà compte</button>

  </div>
 
  


</template>

<style scoped>
body{
  background-color: #0093E9;
background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

}

 div{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
 }

 button{
  padding: 1rem 2rem;
  background-color: rgb(30, 211, 63);
  border-radius: 0.5rem;
  width:fit-content;
  color: white;
  font-size: 18px;
  font-weight: bold;
 }

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
