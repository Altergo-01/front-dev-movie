import { createRouter, createWebHistory } from 'vue-router'
import { useSession } from '../stores/session';
import Login from "@/views/Login.vue";
import Homepage from "@/views/Homepage.vue";
import Actors from "@/views/Actors.vue";
import Movies from "@/views/Movie.vue";
import User from "@/views/User.vue"
import ActorDetail from '@/views/ActorDetail.vue'
import MovieDetail from '@/views/MovieDetail.vue'

// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/actors',
      name: 'Actors',
      component: Actors
    },
    {
      path: '/actors/:id',
      name: 'actorDetail',
      component: ActorDetail,
 
    },

    {
      path: '/movies',
      name: 'Movies',
      component: Movies
    },

    {
      path: '/movies/:id',
      name: 'movieDetail',
      component: MovieDetail
    },

    {
      path: '/user',
      name: 'User',
      component: User
    },
 


  ]
})

 router.beforeEach(async (to, from) => {
 	const session = useSession()
 	if (
 	  // make sure the user is authenticated
 	  !session.loggedIn &&
 	  // ❗️ Avoid an infinite redirect
 	  to.name !== 'login'
 	) {
 	  // redirect the user to the login page
 	  return { name: 'login' }
 	}else if(to.name === "login" && session.loggedIn){
		return { name : 'home'}
 	}
  })

export default router
