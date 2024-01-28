import { defineStore } from "pinia";

export const useSession = defineStore('session', {
  persist: true,
  state: () => {
    return {
      user: null,
      loggedIn: false,
      currentTokken : "",
    }
  },
  actions: {
    login({ token }) {
      console.log( token, 'check login')

      if ( token) {
      this.loggedIn = true
      console.log(this.loggedIn, 'console log')
      this.currentTokken = token
      return true
      } 
      return false
    },
    logout() {
      this.loggedIn = false
      this.user = null
     
    }
    
  }
})
