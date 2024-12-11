import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('../views/RoomsView.vue'),
    },
    {
      path: '/materials',
      name: 'material',
      component: () => import('../views/MaterialView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: () => import('../views/ReservationView.vue'),
    },
    {
      path: '/salles',
      name: 'salles',
      component: () => import('../views/SalleView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../views/StatisticsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    }
  ],
})

export default router
