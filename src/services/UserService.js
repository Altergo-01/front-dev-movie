import { api } from '@/services/api.js'
import { mapState, mapActions } from 'pinia';
import { useSession } from "../stores/session";

export default {

  ...mapState(useSession, ["currentTokken"]),


  register (credentials) {
    return api('/users', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  login (credentials) {
    return api('/login_check', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  user () {
    return api('/users')
  },


  // ACTORS ====================


  importActor (id) {
    return api('/actors/'+id)
  },

  getActors (pageNumber) {
    return api('/actors?page='+pageNumber)
  },
  searchFirstname (searchInput) {
    return api('/actors?firstname='+searchInput)
  },
  searchLastname (searchInput) {
    return api('/actors?lastname='+searchInput)
  },
  searchId (searchInput) {
    return api('/actors?id='+searchInput)
  },
  postActors (credentials) {
    return api('/actors', {
      method: 'POST',
      body: JSON.stringify(credentials),
      
    })
  },

  async deleteActors(credentials) {
    try {
      console.log(credentials, "l'id en deletion");
      const response = await api('/actors/' + credentials, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        // Suppression réussie, pas de corps de réponse JSON attendu
        return Promise.resolve();
      } else {
        // Gérer d'autres codes de statut si nécessaire
        return Promise.reject(new Error(`Unexpected status: ${response.status}`));
      }
    } catch (error) {
      console.error('Error during actor deletion:', error);
      return Promise.reject(error);
    }
  },

 PatchActors (credentials, id) {
    console.log ('actor modified', id)
    return api('/actors/'+ id, {
      method: 'PATCH',
      body: JSON.stringify(credentials),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json'
      }
     
    })
  },
  // MOVIE ====================

  getMovies (pageNumber) {
    return api('/movies?page='+pageNumber)
  },

  importMovie (id) {
    return api('/movies/'+id)
  },

  searchMovieId (searchInput) {
    console.log(searchInput, "ptit check des familles ?")
    return api('/movies/'+searchInput)
  },
  postMovie (credentials) {
    return api('/movies', {
      method: 'POST',
      body: JSON.stringify(credentials),
      
    })
  },

  searchTitle (searchInput) {
    return api('/movie?title='+searchInput)
  },

  async deleteMovies(credentials) {
    try {
      console.log(credentials, "l'id en deletion");
      const response = await api('/movies/' + credentials, {
        method: 'DELETE',
      });
  
      if (response.status === 204) {
        // Suppression réussie, pas de corps de réponse JSON attendu
        return Promise.resolve();
      } else {
        // Gérer d'autres codes de statut si nécessaire
        return Promise.reject(new Error(`Unexpected status: ${response.status}`));
      }
    } catch (error) {
      console.error('Error during actor deletion:', error);
      return Promise.reject(error);
    }
  },

  PatchMovies (credentials, id) {
    console.log ('movie modified', id, credentials)
    return api('/movies/'+ id, {
      method: 'PATCH',
      body: JSON.stringify(credentials),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/merge-patch+json'
      }
     
    })
  },

  // MEDIA ====================

  getMedia (id) {
    return api('/media_objects/' + id)
  },
  postMedia (newImage){
    var formdata = new FormData();
    console.log(newImage)
    formdata.append("file", newImage);
    
    return api('/media_objects', {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
      
    })
  }
}
