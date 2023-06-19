import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/favourites',
      name: 'Favourites',
      component: () => import('../views/FavouriteView.vue'),
    },
    {
      path: '/profile/projects',
      name: 'ProfileProjects',
      component: () => import('../views/Profile/ProjectsView.vue'),
    },
    {
      path: '/create-project',
      name: 'CreateProject',
      component: () => import('../views/CreateProjectView.vue'),
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: () => import('../views/Profile/EditAccountView.vue'),
    },
    {
      path: '/projects/:id',
      name: 'Projects',
      component: () => import('../views/ProjectItemView.vue'),
    },
    {
      path: '/profiles/:id',
      name: 'Profiles',
      component: () => import('../views/Profile/ProfileView.vue'),
    },
  ],
});

// guards of vue router
import store from '@/store'

router.beforeEach(async (to, from) => {
  const authenticated = store.getters.isAuth

  // redirect the user to login page if he is not authenticated
  const securedPages = ['Profile', 'ProfileProjects', 'ProfileFavourite', 'CreateProject'];

  if (!authenticated && securedPages.includes(to.name)) {
    return { name: 'Login' }
  }

  if (authenticated && to.name === 'Login') {
    return { name: from.name }
  }
})

// router.beforeResolve(() => {
//   setLoading(false);
// });

export default router;
