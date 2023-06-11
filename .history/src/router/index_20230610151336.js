import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import EditView from '../views/EditView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import MyProjectsView from '../views/MyProjectsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CreateProjectView from '../views/CreateProjectView.vue'
import ProjectView from '../views/ProjectView.vue'
import ProfileView from '../views/ProfileView.vue'



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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
