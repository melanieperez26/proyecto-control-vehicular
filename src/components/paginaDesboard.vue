<template>
    <div>
      <header>
        <div class="logo">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGSLhZcVGoApXnXyK6C8Y5ZaUQbYRK6hV0zw&s" alt="Logo de la Universidad" />
        </div>
        <div class="user-info">
          <span v-if="isLoggedIn" id="welcomeMessage">Bienvenido, Administrador</span>
          <button v-if="isLoggedIn" id="logoutButton" @click="logout">Salir</button>
        </div>
      </header>
  
      <nav>
        <ul>
            <li><router-link to="/desboard">Volver al Dashboard</router-link></li>
            <li><router-link to="/registro">Ir a Pagina Gestión de Vehículos</router-link></li>
            <li><router-link to="/accesos">Ir a Pagina de Accesos</router-link></li>
            <li><router-link to="/permisos">Ir a Pagina Gestión de Permisos</router-link></li>
            <li><router-link to="/informes">Ir a Pagina de Informes</router-link></li>
        </ul>
      </nav>
  
      <main>
        <section class="dashboard">
          <h1>Dashboard</h1>
  
          <div class="statistics">
            <div class="stat">
              <h2>Total de Vehículos Autorizados</h2>
              
            </div>
            <div class="stat">
              <h2>Accesos Recientes</h2>
              
            </div>
            <div class="stat">
              <h2>Alertas de Seguridad</h2>
              
            </div>
          </div>
  
          <div class="recent-accesses">
            <h2>Accesos Recientes</h2>
            <table>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Matrícula</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(access, index) in lastAccesses" :key="index">
                  <td>{{ access.time }}</td>
                  <td>{{ access.vehicle }}</td>
                  <td>{{ access.name }}</td>
                  <td>{{ access.estado }}</td>
                </tr>
              </tbody>
            </table>
          </div>

  
          <div class="quick-actions">
            <h2>Acciones Rápidas</h2>
            <button @click="goToPage('/registro')">Registrar Nuevo Vehículo</button>
            <button @click="goToPage('accesos')">Agregar Usuario</button>
            <button @click="goToPage('informes')">Generar Informe</button>
          </div>
        </section>
      </main>
  
      <footer>
        <a href="https://github.com/melanieperez26" >
        <p>Hecho por Melanie Pérez Posligua</p>
        <p>&copy; 2024 </p>
        </a>
      </footer>
    </div>
</template>
<script>
import { useAccessStore } from '../stores/useAccessStore';
export default {
  data() {
    return {
      isLoggedIn: true, // Cambiar según el estado de la sesión
    };
  },
  methods: {
    logout() {
      this.isLoggedIn = false;
      this.$router.push('/'); // Redirigir a la página de bienvenida
    },
    goToPage(route) {
      this.$router.push(route); // Redirige a la página especificada
    },
  },
  computed: {
    lastAccesses() {
      const accessStore = useAccessStore();
      return accessStore.lastAccesses; // Obtener los últimos accesos
    },
  },
  mounted() {
    const accessStore = useAccessStore();
    accessStore.loadAccessesFromLocalStorage();
  },


};
</script>
<style>
        /* Código CSS */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        header {
            background: #c60c0c;
            color: #fff;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0px;
        }
        header .logo img {
            height: 50px;
        }
        
        nav {
            background: #333;
        }
        nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
        }
        nav ul li {
            flex: 1;
            margin: 0;
            padding: 0;
        }
        nav ul li a {
            display: block;
            padding: 15px;
            color: white;
            text-align: center;
            text-decoration: none;
        }
        nav ul li a:hover {
            background: #444;
        }
        main {
            padding: 20px;
        }
        .dashboard, .form-container, .container {
            background: white;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(237, 98, 98, 0.1);
            
            
        }
        h1, h2 {
            text-align: center;
            color: #333;
        }
        .statistics {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .stat {
            background: #e9ecef;
            border-radius: 5px;
            padding: 10px;
            text-align: center;
            flex: 1;
            margin-right: 10px;
        }
        .stat:last-child {
            margin-right: 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        input[type="text"], input[type="date"], input[type="time"], select {
            padding: 10px;
            margin: 10px 0;
            width: calc(100% - 22px);
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            padding: 10px 15px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background: #218838;
        }
        .chart {
            margin-top: 20px;
            height: 400px;
            background-color: #eaeaea;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            color: #666;
        }

        .notifications {
            margin-top: 20px;
        }

        .notifications ul {
            list-style: none;
            padding: 0;
        }

        .quick-actions {
            margin-top: 20px;
        }

        .quick-actions button {
            padding: 10px 15px;
            margin-right: 10px;
            background: #0056b3;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .quick-actions button:hover {
            background: #004494;
        }

        footer {
            text-align: center;
            padding: 10px;
            background: #333;
            color: white;
            position: relative;
            bottom: 0;
            width: 100%;
        }

        .login-form {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 20px auto;
            max-width: 400px;
        }

        .login-form input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .error {
            color: red;
            margin-bottom: 10px;
        }
</style>