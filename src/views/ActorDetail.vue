<script>
import UserService from '@/services/UserService.js'
import MovieCard from '../components/MovieCard .vue';


export default {
 
    props: {
    },
    components: {
     MovieCard
    },
    async created() {
    this.actorId = this.$route.params.id;
    

    },
    data() {
        return {
            actorId : "480",
            actorComplete : [],
            actorImage : '',
            movieComplete : {},
        };
    },

 
    methods: {

        async importActor() {
    
            this.error = null;

            try {

                const response = await UserService.searchId(this.actorId);
                this.actorComplete = response["hydra:member"][0]; 
                this.movies = this.actorComplete.movies     
                console.log(this.actorComplete, this.actorId)
                
                const str = this.actorComplete.mediaObject;
              
                const cutId3 = str.split('/')[4]
                
                try{
                    const response3 = await UserService.getMedia(cutId3)
                    this.actorImage = 'http://localhost:8088/wr506/media/'+response3.filePath
                    console.log(this.actorImage, "erztzert")
                } catch {

                }
                await Promise.all( this.movies.map(async (movie) =>{ /* on attend tout les promesse, chaque acteur devient une promesse
                une ligne de code, une fonction qui prend du temps et on attends qu'elle soient toute executée pour passer à la suite */


                    const str = movie;
                    if (str){
                    const cutId = str.split('/')[4]
           
                    try{
                        const response = await UserService.importMovie(cutId)
                        this.movieComplete[cutId] = response
                        const myMovies = response
                  
                        
                        const movieImagePath = {}

                     
                            const str = this.movieComplete[cutId].mediaObject;
                            if (str){
                                const cutId2 = str.split('/')[4]

                                try{
                                    const response2 = await UserService.getMedia(cutId2)

                                    this.movieComplete[cutId].imagePath = 'http://localhost:8088/wr506/media/'+response2.filePath
                                    /*ici on appelle l'objet actorImagePath, on lui dit qu'il à une nouvelle entrée qui à pour nom l'id de l'acteur en 
                                    cour d'usage (actor), et que sa valeur est égale au filepath,, on le complète même pour faciliter l'usage*/

                                    
                                    
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
        await this.importActor();
     
    },
   
}

</script>


<template>
    {{ this.actorId }}

    <div class="order_prime">

        <img :src="actorImage" alt="">

        <div class="info_prime">
            <h2>{{ this.actorComplete.lastname }} {{ this.actorComplete.firstname }}</h2>
            <p>{{ this.actorComplete.dob }}</p>
            <p>{{ this.actorComplete.nationality }}</p>
            <p>{{ this.actorComplete.reward }}</p>
        </div>
 
 

    </div>
    <div class="card_organizer">
        <MovieCard v-for="(movie, cutId) in movieComplete " :key="cutId" :info1="movie.imagePath" :info2="movie.title"></MovieCard>
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