<script>
import UserService from '@/services/UserService.js'
import ActorCard from '../components/MovieCard .vue';

export default {
 
    props: {
    },
    components: {
        ActorCard,
    },
    async created() {
    this.movieId = this.$route.params.id;
    

    },
    data() {
        return {
            movieId : '',
            movieComplete : [],
            movieImage : '',
            actorImage : '',
            actorComplete : {},
      
        };
    },

 
    methods: {

        async importMovie() {
    
            this.error = null;

            try {
                this.error = null;
                console.log(this.movieId, "YOOOO CHEEECK")
                const response = await UserService.searchMovieId(this.movieId);
                this.movieComplete = response ; 
                console.log(this.movieComplete, "YOOOO CHEEECK")
                const myActors = this.movieComplete.actor 
                console.log(this.actorComplete, this.movieId)
                
                const str = this.movieComplete.mediaObject;
              
                const cutId3 = str.split('/')[4]
                
                try{
                    const response3 = await UserService.getMedia(cutId3)
                    this.movieImage = 'http://localhost:8088/wr506/media/'+response3.filePath
                    console.log(this.movieImage, "erztzert")
                } catch {
                    
                this.error = this.error.toString();
                console.error(this.error);
                }
                await Promise.all( myActors.map(async (actor) =>{ /* on attend tout les promesse, chaque acteur devient une promesse
                une ligne de code, une fonction qui prend du temps et on attends qu'elle soient toute executée pour passer à la suite */


                    const str = actor;
                    if (str){
                    const cutId = str.split('/')[4]
           
                    try{
                        const response = await UserService.importActor(cutId)
                        this.actorComplete[cutId] = response
                        console.log(this.actorComplete)
                  
                 
                     
                            const str = this.actorComplete[cutId].mediaObject;
                            
                            if (str){
                                const cutId2 = str.split('/')[4]
                                
                                try{
                                    const response2 = await UserService.getMedia(cutId2)
                                    
                                    this.actorComplete[cutId].imagePath = 'http://localhost:8088/wr506/media/'+response2.filePath
                                    /*ici on appelle l'objet actorImagePath, on lui dit qu'il à une nouvelle entrée qui à pour nom l'id de l'acteur en 
                                    cour d'usage (actor), et que sa valeur est égale au filepath,, on le complète même pour faciliter l'usage*/
                                    console.log(this.actorComplete[cutId].imagePath, "yep")
                                    
                                    
                                } catch (error){
                                    this.error = error.toString();
                                    console.error(this.error);
                                }
                            }

                        
                        
                    } catch (error){
                        this.error = error.toString();
                        console.error(this.error);
                    }
                    }

            
                }
                ))

            } catch (error){
                this.error = error.toString();
                console.error(this.error);
            }
        },
 
        async importFilm() {
    
            this.error = null;
            
           },
    },
    
    async mounted() {
        await this.importMovie();
        console.log(this.actorComplete, "check", this.movieId)
    },
   
}

</script>


<template>
    {{ this.movieId }}

    <div class="order_prime">
        <img :src="movieImage" alt="">
        <div class="info_prime">
            <h2>{{ this.movieComplete.title }} </h2>
            <p> Sorti le : {{ this.movieComplete.release_date}}</p>
            <p> Dirigé par : {{ this.movieComplete.director }}</p>
            <p> Durée : {{ this.movieComplete.duration }}</p>
            <p> Note globale : {{ this.movieComplete.note }}</p>
        </div>
    </div>
    <div class="card_organizer">
        <ActorCard v-for="(actor, cutId) in this.actorComplete " :key="cutId" :info1="actor.imagePath" :info2="actor.firstname" :info3="actor.lastname"></ActorCard>
    </div>


 
</template>


<style scoped>

.card_organizer{
    display: flex;
    column-gap: 3rem;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
}

.order_prime{
    display: flex;
    justify-content: space-around;
    align-items: center;
 
    margin-bottom: 3vh;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(42, 42, 42);
    border-radius: 0.75rem;
}

.info_prime{
    width: 70%;
    color: white;
    font-size: 22px;
}

img{
    width: 300px;
}

</style>