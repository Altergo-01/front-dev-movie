<script>
import UserService from '@/services/UserService.js'

export default {
    props: {
        currentLast : String,
        currentFirst : String,
        currentdob : String,
        currentNationalit : String,
        currentReward : String,
        currentId : String


    },
    components: {
 
    },
    data() {
        return {
            error : "",
            lastname : this.currentLast,
            showLast : this.currentLast,
            showFirst : this.currentFirst,

            firstname :this.currentFirst,
            dob : this.currentdob,
            nationality : this.currentNationalit,
            reward : this.currentReward,
            id : this.currentId,
        };
    },
    methods: {
        async PatchActors(){
            this.isModalOpen = true;
            
            try {
                await UserService.PatchActors({
                        
                        lastname: this.lastname,
                        firstname: this.firstname,
                        dob: this.dob,
                        nationality: this.nationality,
                        reward: this.reward,
            
                    }, this.id)
                    location.reload()
                    this.isModalOpen = false;
                
            } catch (error) {
                this.error = error.toString()
            }
            
        },
    },
   
}

</script>


<template>
    <form @submit.prevent="PatchActors()">
      
        <p>Vous desirez modifier {{ this.showFirst }} {{ this.showLast }}</p>
        <hr>

        <label for="lastname" ><b>lastname</b></label>
        <input type="text" v-model="lastname" placeholder="lastname" id="lastname" name="lastname" required>

        <label for="firstname"><b>firstname</b></label>
        <input type="text" v-model="firstname" placeholder="first name" id="firstname" name="firstname" required>

        <label for="dob"><b>date of birth</b></label>
        <input type="text" v-model="dob" placeholder="2023-10-24" id="dob" name="dob" required>

        <label for="Reward"><b>Reward</b></label>
        <input type="text" v-model="reward" placeholder="Reward" id="Reward" name="Reward" required>

        <label for="nationality"><b>nationality</b></label>
        <input type="text" v-model="nationality" placeholder="nationality" id="nationality" name="nationality" required>
 
        <button type="submit">Modifier</button>  
        
        <p>{{ error }}</p>
    
    </form>
    
</template>


<style scoped>
</style>