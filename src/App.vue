<template>
  <div id="app">
    <!-- Este es el nav superior que vamos a ocultar -->
    <nav class="top-nav">
      <router-link to="/">Bienvenida</router-link>
      <router-link to="/logIn">Iniciar Sesion</router-link>
      <router-link to="/accesos">Ver Accesos</router-link>
      <router-link to="/registro">Registro de Vehículos</router-link>
      <router-link to="/permisos">Gestion de permisos</router-link>
      <router-link to="/informes">Gestion de permisos</router-link>
      <router-link to="/desboard">Dashboard</router-link>
    </nav>

    <!-- Este es el nav inferior que siempre debe mostrarse -->
    <nav class="bottom-nav">
      <!-- Aquí puedes poner los enlaces que quieras para el nav inferior -->
      <router-link to="/">Bienvenida</router-link>
      <router-link to="/logIn">Iniciar Sesión</router-link>
      <router-link to="/registro">Registrarse</router-link>
      <router-link to="/permisos">Gestion de permisos</router-link>
      <router-link to="/informes">Gestion de permisos</router-link>
      <router-link to="/desboard">Dashboard</router-link>
    </nav>

    <!-- Aquí se renderizarán las páginas -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

.top-nav {
  display: none;
}


.bottom-nav {
  background-color: transparent; 
  padding: 10px;
  margin: 0;
  visibility: hidden;
}
</style>
