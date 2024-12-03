import { createRouter, createWebHistory } from 'vue-router'
import Paginaregistro from './components/paginaregistro.vue'
import PaginaAccesos from './components/paginaAccesos.vue'
import Paginapermisos from './components/paginapermisos.vue'
import Paginainformes from './components/paginainformes.vue'
import PaginaDesboard from './components/paginaDesboard.vue'
import Paginabienvenida from './components/paginabienvenida.vue'
import PaginalogIn from './components/paginalogIn.vue'



const routes = [
  { path: '/', component: Paginabienvenida },
  { path: '/registro', component: Paginaregistro }, 
  { path: '/logIn', component: PaginalogIn }, // Página de inicio
  { path: '/accesos', component: PaginaAccesos },
  { path: '/permisos', component: Paginapermisos },
  { path: '/informes', component: Paginainformes },
  { path: '/desboard', component: PaginaDesboard },

]

const router = createRouter({
  history: createWebHistory(),  // Historial de navegación
  routes  // Definir las rutas
})

export default router