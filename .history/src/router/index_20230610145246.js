import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/main',
    name: 'main',
    meta: {layout: 'main'},
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    meta: {layout: 'extra'},
    component: () => import('../views/EditView.vue')
  },
  {
    path: '/favs',
    name: 'favs',
    meta: {layout: 'extra'},
    component: () => import('../views/FavoriteView.vue')
  },
  {
    path: '/my_projects',
    name: 'my',
    meta: {layout: 'extra'},
    component: () => import('../views/MyProjectsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/create_project',
    name: 'create_project',
    meta: {layout: 'extra'},
    component: () => import('../views/CreateProjectView.vue')
  },
  {
    path: '/project',
    name: 'project',
    meta: {layout: 'extra'},
    component: () => import('../views/ProjectView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'extra'},
    component: () => import('../views/ProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
