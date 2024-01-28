<script>
import { mapState, mapActions } from 'pinia';
import { useSession } from "../stores/session";
import UserService from '@/services/UserService.js'
import Modal from '@/components/Modal.vue'
import ModActorForm from '@/components/ModActorForm.vue';

export default {
 
 components: {
    Modal,
    ModActorForm,
},
 data() {
     return {
        error :'',
        result : [],
        actorComplete : [],
        currentPage : 1,
        totalPages : 1,

        id : '',
        lastname : 'dfd',
        firstname : 'dfdf',
        dob : '2000-12-01',
        createAt : '',
        nationality : 'dfdf',
        reward : "bro",

        counter: 1,
        imageActor: "",
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


    async fetchActors () {
      this.error = null;
      
      try {
        const response = await UserService.getActors(this.currentPage)
        console.log(response, "premier log")
        const myActors = response[`hydra:member`]
        this.result = myActors
        console.log(myActors, "hydra:member")  
        
        const actorImagePath = {}

        await Promise.all(myActors.map(async (actor) =>{ /* on attend tout les promesse, chaque acteur devient une promesse
            une ligne de code, une fonction qui prend du temps et on attends qu'elle soient toute executée pour passer à la suite */


            const str = actor.mediaObject;
            if (str){
              const cutId = str.split('/')[4]

              try{
                  const response2 = await UserService.getMedia(cutId)

                  actorImagePath[actor.id] = 'http://localhost:8088/wr506/media/'+response2.filePath
                  /*ici on appelle l'objet actorImagePath, on lui dit qu'il à une nouvelle entrée qui à pour nom l'id de l'acteur en 
                  cour d'usage (actor), et que sa valeur est égale au filepath,, on le complète même pour faciliter l'usage*/

                  console.log(actorImagePath[actor.id])
                  
              } catch (error){
                  this.error = error.toString();
                  console.error(this.error);
              }
            }


        }));

        /* mon tableau d'acteur avec toute les info correctement arrangée */

        this.actorComplete = myActors.map(actor => ({/* .map() est une fonction qui crée un nouveau tableau avec le résultat de 
        la fonction qui suit ( avec les modification qui sont apporté au tableau utilisé à la base quoi) */

            ...actor, /* veux très littéralement dire "tout ce qui se trouve déjà dans cet acteur" */
            imagePath : actorImagePath[actor.id],/* Plus ce nouveau champ nommé imagePath, qui à pour valeur */
            counter: this.counter++
        }));

        const url1 = response['hydra:view']['hydra:last'];
        const url2 = response['hydra:view']['hydra:next'];
        this.totalPages  = parseInt(url1.match(/\d+$/)[0], 10);
        if (url2) {
          this.currentPage = parseInt(url2.match(/\d+$/)[0], 10)-1;
        }
        console.log(this.currentPage, 'CURRENT PAGE')
        console.log('Fetched actors:', this.actorComplete);
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
        
        await this.fetchActors();
        console.log(this.currentPage, 'AAAAAAAAAAAAAAAAAAAAAAAAAH')
      }
    },

    async fetchLastPage() {
      if (this.currentPage <= this.totalPages && this.currentPage != 1) {
        console.log(this.currentPage, "brudda ?")
         this.currentPage -= 1
         console.log(this.currentPage, "brudda ?")
        
        await this.fetchActors();
       }
    },

    async sendActors () {
      this.error = null;
      console.log(this.imageActor)
      try{

        const response2 = await UserService.postMedia(this.imageActor
            
        )
        console.log(response2)
      } catch (error){
        this.error = error.toString()
      }

      try {
        const response = await UserService.postActors({
                        
            lastname: this.lastname,
            firstname: this.firstname,
            dob: this.dob,
            // createAt: this.createAt,
            nationality: this.nationality,
            searchInput : ""

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

        this.imageActor = file;
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
          const response3 = await UserService.searchId(this.searchInput);
          this.actorComplete = response3["hydra:member"];
          console.log(this.actorComplete, "YOOO")

        }else{
          const response1 = await UserService.searchFirstname(this.searchInput);
          const response2 = await UserService.searchLastname(this.searchInput);
          console.log('ITS A NAME WOOO')
          const [firstnameResponse, lastnameResponse] = await Promise.all([
            response1['hydra:member'],
            response2['hydra:member'],
          ]);

          this.actorComplete = [...firstnameResponse, ...lastnameResponse];
          console.log(this.actorComplete, "YOOO")

        

        }
        
        console.log(this.actorComplete)
        const actorImagePath = {}

        await Promise.all(this.actorComplete.map(async (actor) =>{ /* on attend tout les promesse, chaque acteur devient une promesse
            une ligne de code, une fonction qui prend du temps et on attends qu'elle soient toute executée pour passer à la suite */


            const str = actor.mediaObject;
            if (str){
              const cutId = str.split('/')[4]

              try{
                  const response2 = await UserService.getMedia(cutId)

                  actorImagePath[actor.id] = 'http://localhost:8088/wr506/media/'+response2.filePath
                  /*ici on appelle l'objet actorImagePath, on lui dit qu'il à une nouvelle entrée qui à pour nom l'id de l'acteur en 
                  cour d'usage (actor), et que sa valeur est égale au filepath,, on le complète même pour faciliter l'usage*/

                  console.log(actorImagePath[actor.id])
                  
              } catch (error){
                  this.error = error.toString();
                  console.error(this.error);
              }
            }


        }));

        /* mon tableau d'acteur avec toute les info correctement arrangée */

        this.actorComplete = this.actorComplete.map(actor => ({/* .map() est une fonction qui crée un nouveau tableau avec le résultat de 
        la fonction qui suit ( avec les modification qui sont apporté au tableau utilisé à la base quoi) */

            ...actor, /* veux très littéralement dire "tout ce qui se trouve déjà dans cet acteur" */
            imagePath : actorImagePath[actor.id],/* Plus ce nouveau champ nommé imagePath, qui à pour valeur */
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
        await UserService.deleteActors(id);
        console.log("Suppression succeeded. Proceeding with fetching actors.");
        
        
      } catch (error) {
        this.error = error.toString()
      }
      await this.fetchActors();
    },

    Modification(actor){
      this.clickCurrent = "Modif"
      console.log(actor.id, "vérif current actor")
      this.isModalOpen = true;
      this.lastname = actor.lastname
      this.firstname = actor.firstname
      this.dob = actor.dob
      this.nationality = actor.nationality
      this.reward = actor.reward
      this.id = actor.id
    },
 
    modalClosed() {
        console.log('Modal closed');
        this.isModalOpen = false; 
      },
    
    ActorDetail(actorId) {
      this.$router.push({ name: 'actorDetail', params: { id: parseInt(actorId) } });
    },

 },

 async mounted() {
  console.log('Mounted - currentPage:', this.currentPage);
        await this.fetchActors();
        console.log('Mounted - currentPage:', this.currentPage);
 }
 
}


</script>


<template>


    <Modal :isOpen="isModalOpen" @modal-closed="modalClosed"  >
      <ModActorForm 
        v-if="this.clickCurrent === 'Modif'" 
        :current-first="this.firstname" 
        :current-last="this.lastname" 
        :current-nationalit="this.nationality" 
        :currentdob="this.dob"  
        :current-reward="this.reward" 
        :current-id="this.id" 
        :fetchActors="fetchActors" 
        :closeModal="closeModal"  />

      <p v-if="this.clickCurrent === 'Suppr'">Vous avez supprimé {{ this.SupprName }}</p>

    </Modal>

    <h1>ACTORS</h1>
    <br>


    <form @submit.prevent="sendActors()">
      
      <p>Remplissez ce formulaire pour modifier un acteur (admin only)</p>
      <hr>

      <label for="lastname" ><b>lastname</b></label>
      <input type="text" v-model="lastname" placeholder="lastname" id="lastname" name="lastname" required>

      <label for="firstname"><b>firstname</b></label>
      <input type="firstname" v-model="firstname" placeholder="first name" id="firstname" name="firstname" required>

      <label for="dob"><b>date of birth</b></label>
      <input type="dob" v-model="dob" placeholder="2023-10-24" id="dob" name="dob" required>
<!-- 
      <label for="createAt"><b>Created At</b></label>
      <input type="createAt" v-model="createAt" placeholder="2023-10-24" id="createAt" name="createAt" required> -->

      <label for="nationality"><b>nationality</b></label>
      <input type="nationality" v-model="nationality" placeholder="nationality" id="nationality" name="nationality" required>
      
      <label for="imageActor"><b>the Actor's image</b></label>
      <input type="file" @change="handleImageUpload" placeholder="imageActor" id="imageActor" name="imageActor" required>
      

      <p><button type="submit">Enregistrer le nouvel acteur</button>     </p>
    
      <p>{{ error }}</p>
      <!-- <p><button type="submit" v-on:submit.prevent="submitLoggin">Se connecter</button></p> -->
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
            <div class="blocpara para1" v-for="(actor, indexes) in actorComplete" :key="result.id">
                <p> {{actor.id }} //// {{ actor.firstname }} ///// {{ actor.lastname }} ///// {{actor.counter}} ///// </p>  
                
                <img :src="actor.imagePath" alt="">

                <div class="crud">
                  <button @click="Suppression(actor.id, actor.firstname, actor.lastname) " class="suppr">Supprimer</button>
                  <button @click="Modification(actor)" class="modif" >Modifier</button>
                  <button @click="ActorDetail(actor.id)" class="detail">Voir les détails</button>
                 
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