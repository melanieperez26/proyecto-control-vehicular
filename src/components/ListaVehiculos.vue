<template>
    <div>
      <h2>Vehículos Registrados</h2>
      <ul>
        <li v-for="(vehiculo, index) in vehiculos" :key="index">
          {{ vehiculo.placa }} - {{ vehiculo.propietario }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['vehiculos']
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  </style>
  