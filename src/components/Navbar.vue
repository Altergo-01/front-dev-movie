<script>
import { useSession } from "../stores/session";
import { mapState, mapActions } from 'pinia';
export default {
 
 components: {

 },
 data() {
     
     return {
       
     };
 },
 computed: {
    ...mapState(useSession, ["loggedIn"]),
 },
 methods: {
    logout(){
         
        const session = useSession();
        session.logout()
        this.$router.push('/login');
    }
 },

}

</script>


<template>
    <nav>
        <h1>FRONT-DEV</h1>
        <div class="links">
            <router-link to="/">Home</router-link>
            <router-link to="/actors">Actors</router-link>
            <router-link to="/movies">Movies</router-link>
            <router-link to="/">User</router-link>
            <br>
            <br>
            <button v-if="loggedIn" @click="logout()"> Log Out </button>
        </div>
    </nav>
</template>


<style scoped>

    nav{
        background-color: rgb(29, 29, 29);
        height: 10vh;
        width: 100%;
        position: sticky;
        top : 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-size: 20px;
        padding: 0 2rem;
    }

    .links{
        display: flex;
        column-gap: 1rem;
        justify-content: center;
        align-items: center;

    }

    a{
        text-decoration: none;
        color: white;
        transition: 0.2s;
    }

    a:hover{
        font-weight: bold;
    }

</style>