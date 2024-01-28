<script>
import { mapState, mapActions } from 'pinia';
import { useSession } from "../stores/session";
import UserService from '@/services/UserService.js'
import Modal from '@/components/Modal.vue'
import ModMovieForm from '@/components/ModMovieForm.vue';

export default {
 
 components: {
    Modal,
    ModMovieForm,
},
 data() {
     return {
        error :'',
        result : [],
        movieComplete : [],
        currentPage : 1,
        totalPages : 1,
        

        id : '',
        title : '',
        date :'2021-07-30 20:10:24',
        desc :'',
        duration :0,
        note :0,
        director :'',
        web :'',
 
        counter: 1,
        imageMovie: "",
        searchInput: "",
        searchResults : [],
        isModalOpen: false,
        


        clickCurrent: '',
        SupprName : '',
     };
 },
 computed: {
   
 },
 methods: {


    async fetchMovies () {
      this.error = null;
      
      try {
        const response = await UserService.getMovies(this.currentPage)
        console.log(response, "premier log")
        const myMovies = response[`hydra:member`]
        this.result = myMovies
        console.log(myMovies, "hydra:member")  
        
        const movieImagePath = {}

        await Promise.all(myMovies.map(async (movie) =>{ /* on attend tout les promesse, chaque acteur devient une promesse
            une ligne de code, une fonction qui prend du temps et on attends qu'elle soient toute executée pour passer à la suite */


            const str = movie.mediaObject;
            if (str){
              const cutId = str.split('/')[4]

              try{
                  const response2 = await UserService.getMedia(cutId)

                  movieImagePath[movie.id] = 'http://localhost:8088/wr506/media/'+response2.filePath
                  /*ici on appelle l'objet actorImagePath, on lui dit qu'il à une nouvelle entrée qui à pour nom l'id de l'acteur en 
                  cour d'usage (actor), et que sa valeur est égale au filepath,, on le complète même pour faciliter l'usage*/

                  console.log(movieImagePath[movie.id])
                  
              } catch (error){
                  this.error = error.toString();
                  console.error(this.error);
              }
            }


        }));

        /* mon tableau d'acteur avec toute les info correctement arrangée */

        this.movieComplete = myMovies.map(movie => ({/* .map() est une fonction qui crée un nouveau tableau avec le résultat de 
        la fonction qui suit ( avec les modification qui sont apporté au tableau utilisé à la base quoi) */

            ...movie, /* veux très littéralement dire "tout ce qui se trouve déjà dans cet acteur" */
            imagePath : movieImagePath[movie.id],/* Plus ce nouveau champ nommé imagePath, qui à pour valeur */
            counter: this.counter++
        }));

        const url1 = response['hydra:view']['hydra:last'];
        const url2 = response['hydra:view']['hydra:next'];
        this.totalPages  = parseInt(url1.match(/\d+$/)[0], 10);
        if (url2) {
          this.currentPage = parseInt(url2.match(/\d+$/)[0], 10)-1;
        }
        console.log(this.currentPage, 'CURRENT PAGE')
        console.log('Fetched movies:', this.movieComplete);
      } catch (error) { 
        this.error = error.toString()
        console.log("error lol")
  
      }
    },
    
    async getImage(){
        try{
            const response2 = await UserService.getMedia(this)
            console.log(response2.filePath, "mon images.")
            return response2.filePath
        } catch (error){
            this.error += this.error.toString()
            
        }

    },

    async fetchNextPage() {
      if (this.currentPage <= this.totalPages && this.currentPage != this.totalPages) {
        console.log(this.currentPage, 'currentAAAA', this.totalPages , 'ZMERIGJERGOPZN')
        this.currentPage += 1
        
        await this.fetchMovies();
        console.log(this.currentPage, 'AAAAAAAAAAAAAAAAAAAAAAAAAH')
      }
    },

    async fetchLastPage() {
      if (this.currentPage <= this.totalPages && this.currentPage != 1) {
        console.log(this.currentPage, "brudda ?")
         this.currentPage -= 1
         console.log(this.currentPage, "brudda ?")
        
        await this.fetchMovies();
       }
    },

    async sendMovies () {
      this.error = null;
       

      try {
        const response = await UserService.postMovie({
             title : this.title,
             release_date : this.release_date,
             description : this.description,
             duration : this.duration,
             note : this.note,
             director : this.director,
             website : this.website,
           
        })
                
      } catch (error) {
        this.error = error.toString()
      }
    },

    handleImageUpload(event) {
      console.log('Event:', event);
      const fileInput = event.target;
      const file = fileInput.files[0]; 

      if (file) {
        const fileName = file.name;
        console.log('Selected file name:', fileName);

        this.imageMovie = file;
      } else {
        console.error('No file selected');
      }
    },

    async Search() {
      console.log(this.searchInput);
      this.error = null;

      try {

        if (!isNaN(this.searchInput)) {

          console.log('ITS A NUMBER WOOO')
          const response3 = await UserService.searchMovieId(this.searchInput);
          this.movieComplete = response3["hydra:member"];
          console.log(this.movieComplete, "YOOO")

        }else{
          const response1 = await UserService.searchTitle(this.searchInput);
       
          console.log('ITS A NAME WOOO')
          const [movieResponse] = await Promise.all([
            response1['hydra:member'],
          ]);

          this.movieComplete = [...movieResponse];
          console.log(this.movieComplete, "YOOO")

        

        }
        
        console.log(this.movieComplete)
        const movieImagePath = {}

        await Promise.all(this.movieComplete.map(async (movie) =>{ /* on attend tout les promesse, chaque acteur devient une promesse
            une ligne de code, une fonction qui prend du temps et on attends qu'elle soient toute executée pour passer à la suite */


            const str = movie.mediaObject;
            if (str){
              const cutId = str.split('/')[4]

              try{
                  const response2 = await UserService.getMedia(cutId)

                  movieImagePath[movie.id] = 'http://localhost:8088/wr506/media/'+response2.filePath
                  /*ici on appelle l'objet actorImagePath, on lui dit qu'il à une nouvelle entrée qui à pour nom l'id de l'acteur en 
                  cour d'usage (actor), et que sa valeur est égale au filepath,, on le complète même pour faciliter l'usage*/

                  console.log(movieImagePath[movie.id])
                  
              } catch (error){
                  this.error = error.toString();
                  console.error(this.error);
              }
            }


        }));

        /* mon tableau d'acteur avec toute les info correctement arrangée */

        this.movieComplete = this.movieComplete.map(movie => ({/* .map() est une fonction qui crée un nouveau tableau avec le résultat de 
        la fonction qui suit ( avec les modification qui sont apporté au tableau utilisé à la base quoi) */

            ...movie, /* veux très littéralement dire "tout ce qui se trouve déjà dans cet acteur" */
            imagePath : movieImagePath[movie.id],/* Plus ce nouveau champ nommé imagePath, qui à pour valeur */
            counter: this.counter++
        }));
      } catch (error) {
        this.error = error.toString();
      }
    },

    async Suppression(id, first, last){
      this.clickCurrent = "Suppr"
      this.isModalOpen = true;
      this.SupprName = first+" "+last
      try {
        await UserService.deleteMovies(id);
        console.log("Suppression succeeded. Proceeding with fetching actors.");
        
        
      } catch (error) {
        this.error = error.toString()
      }
      await this.fetchMovies();
    },

    Modification(movie){
      this.clickCurrent = "Modif"
      console.log(movie.title, "vérif current actor")
            this.isModalOpen = true;
            this.title = movie.title
            this.date = movie.release_date
            this.desc = movie.description
            this.duration = movie.duration
            this.note = movie.note
            this.director = movie.director
            this.web = movie.website
            this.id = movie.id
            console.log(this.id, "l'id passé")
        },
 
    modalClosed() {
        console.log('Modal closed');
        this.isModalOpen = false; 
      },
    
    MovieDetail(movieId) {
        console.log(movieId, "yeah")
        this.$router.push({ name: 'movieDetail', params: { id: movieId  } });
    },

 },

 async mounted() {
        console.log('Mounted - currentPage:', this.currentPage);
        await this.fetchMovies();
        console.log('Mounted - currentPage:', this.currentPage);
 }

}


</script>


<template>


    <Modal :isOpen="isModalOpen" @modal-closed="modalClosed"  >
   
      <ModMovieForm 
        v-if="this.clickCurrent === 'Modif'" 
        :current-title="this.title"
        :currentDate="this.date"
        :currentDesc="this.desc"
        :currentDirector="this.director"
        :currentDuration="this.duration"
        :currentNote="this.note"
        :currentWeb="this.web"
        :current-id="this.id"
        />

      <p v-if="this.clickCurrent === 'Suppr'">Vous avez supprimé {{ this.SupprName }}</p>

    </Modal>

    <h1>Movies</h1>
    <br>


    <form @submit.prevent="sendMovies()">
      
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

      <button type="submit">créer un nouveau film</button>  
      
      <p>{{ error }}</p>
  
  </form>
    <br>
    <hr>
    <br>
    <div class="pagination">
      <button @click="fetchLastPage()" >Last Page</button>
        <p>- {{ this.currentPage }} sur {{ this.totalPages }}-</p>
      <button @click="fetchNextPage()" >Next Page</button>
    </div>

    <br>
    <hr>
    <br>
    <form @submit.prevent="Search()">
        <label for="Search"><b>Search</b></label>
        <input type="search" placeholder="Search ..." v-model="searchInput" @change="Search()"> 
        <input type="submit" >
        
    </form>
    <br>

    <hr>
    <div class="container">
        <div class="blocmain">
            <div class="blocpara para1" v-for="(movie, indexes) in movieComplete" :key="result.id">
                <p> {{movie.id }} //// {{ movie.title}} ///// {{ movie.release_date }} ///// {{movie.counter}} ///// </p>  
                
                <img :src="movie.imagePath" alt="">

                <div class="crud">
                  <button @click="Suppression(movie.id, movie.title, movie.release_date) " class="suppr">Supprimer</button>
                  <button @click="Modification(movie)" class="modif" >Modifier</button>
                  <button @click="MovieDetail(movie.id)" class="detail">Voir les détails</button>
                 
                </div>
            </div>
            
        </div>
        <div class="blocmain">

        </div>
    </div>



    
</template>


<style scoped>
.detail{
  color: black;
  border-radius: 15px ;
}
.crud{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.crud button{
  width: 10rem;
 
  border: none;
  padding: 0.5rem;
  transition: 0.300s;

}

.suppr{
  background-color: rgb(255, 34, 34);
  border-radius: 15px ;
  color: white;
}

.suppr:hover{
  background-color: rgb(180, 26, 26);
}


.modif{
  background-color: rgb(34, 174, 255);
  border-radius: 15px ;
  color: white;
}

.modif:hover{
  background-color: rgb(20, 99, 146);
}

.pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
}
.container{
    display: flex;
    flex-direction: column;
    align-items: center;


    
}
.blocmain{
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 2rem;
    align-items: center;
    width: 100%;

}


.blocpara{ /* affecte para1 et 2 */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    column-gap: 5%;
    row-gap: 1rem;
    padding: 1rem;
    background-color: rgb(73, 255, 128);
    height: 20vh; /* 100% du parent (blocmain) donc 20vh (les deux font la même hauteur ça évite de l'écrire deux fois) */
    width: 80%;
    border-radius: 10px;
}

.blocpara img{
    height: 100%;
}



.para2{
    width: 65%;
}

</style>