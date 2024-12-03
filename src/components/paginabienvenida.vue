<template>
    <!-- Envuelve el contenido con un div que tenga la clase welcome-body -->
    <div class="welcome-body">
      <div class="welcome-container">
        <h1>Bienvenido al Sistema de Control de Acceso Vehicular</h1>
        <p>
          Este sistema te permite gestionar el acceso de vehículos a las instalaciones de manera eficiente y segura.
        </p>
        <nav>
          <router-link to="/logIn" class="button">Iniciar Sesión</router-link>
          <router-link to="/logIn" class="button">Registrarse</router-link>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "paginaBienvenida",
  };
  </script>
  
  <style scoped>
  .welcome-body {
      font-family: Arial, sans-serif;
      background-image: url('https://www.uleam.edu.ec/wp-content/uploads/2021/11/Entrada-Uleam-1024x576-1.jpg');
      background-color: #ca2828;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center; /* Centra el contenido horizontalmente */
      align-items: center;     /* Centra el contenido verticalmente */
      height: 100vh;           /* Asegura que ocupe toda la altura de la pantalla */
      background-size: cover;
      background-position: center;
  }
  
  .welcome-container {
      background-color: white;
      padding: 50px;          
      border-radius: 10px;
      box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.2);
      text-align: center;
      max-width: 800px;        
      width: 100%; 
      position: relative;    
      z-index: 1;         
      margin: 0;               
  }
  
  .welcome-container::before {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      border: 5px solid rgba(202, 40, 40, 0.5);
      border-radius: 15px;
      z-index: -1;
  }
  
  h1 {
      color: #101010;
      margin-bottom: 20px;
      font-size: 28px;
  }
  
  p {
      margin-bottom: 30px;
      font-size: 22px;
      color: #555;
  }
  
  button {
      padding: 10px 27px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 25px;
  }
  
  button:hover {
      background-color: #218838;
  }
  
  router-link {
      display: inline-block;
      margin: 10px;
      
  }
  nav {
    display: flex;
    justify-content: center; /* Centra los botones */
    gap: 10px; /* Separa los botones con un espacio de 20px */
    background-color: transparent;
    
   }

  </style>
  