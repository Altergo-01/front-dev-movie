<script>
import UserService from '@/services/UserService.js'

export default {
    props: {
        currentTitle: String,
        currentDate : String,
        currentDesc : String,
        currentDuration : Number,
        currentNote : Number,
        currentDirector : String,
        currentWeb : String,
        currentId : Number,
    },
    components: {
 
    },
    data() {
        return {
            error : "",
            title : this.currentTitle,
            showTitle : this.currentTitle,
            date : this.currentDate,
            description : this.currentDesc,
            duration : this.currentDuration,
            note : this.currentNote,
            director : this.currentDirector,
            website : this.currentWeb,
            id : this.currentId
        };
    },
    methods: {
        async PatchMovies(){
            this.isModalOpen = true;
            
            try {
                await UserService.PatchMovies({
                        
                    title : this.title,
                    date : this.date,
                    description : this.desc,
                    duration : this.duration,
                    note : this.note,
                    director : this.director,
                    website : this.web,
            
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
    <form @submit.prevent="PatchMovies()">
      
        <p>Vous desirez modifier {{ this.showTitle}}</p>
        <hr>

        <label for="title" ><b>Title</b></label>
        <input type="text" v-model="title" placeholder="title" id="title" name="title" required>

        <label for="date"><b>Date of release</b></label>
        <input type="text" v-model="date" placeholder="date" id="date" name="date" required>

        <label for="description"><b>Description</b></label>
        <input type="text" v-model="description" placeholder="description" id="description" name="description" required>

        <label for="duration"><b>Duration</b></label>
        <input type="text" v-model="duration" placeholder="duration" id="duration" name="duration" required>

        <label for="note"><b>Note</b></label>
        <input type="text" v-model="note" placeholder="note" id="note" name="note" required>

        <label for="director"><b>Director</b></label>
        <input type="text" v-model="director" placeholder="director" id="director" name="director" required>

        <label for="website"><b>website</b></label>
        <input type="text" v-model="website" placeholder="website" id="website" name="website" required>
 
        <button type="submit">Modifier</button>  
        
        <p>{{ error }}</p>
    
    </form>
    
</template>


<style scoped>
</style>