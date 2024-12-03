<template>
    <div>
        <header>
        <div class="logo">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGSLhZcVGoApXnXyK6C8Y5ZaUQbYRK6hV0zw&s" alt="Logo de la Universidad">
        </div>
        <nav>
          <ul>
            <li><router-link to="/desboard">Volver al Dashboard</router-link></li>
            <li><router-link to="/registro">Ir a Pagina Gestión de Vehículos</router-link></li>
            <li><router-link to="/accesos">Ir a Pagina de Accesos</router-link></li>
            <li><router-link to="/permisos">Ir a Pagina de Gestión de Permisos</router-link></li>
            <li><router-link to="/informes">Ir a Pagina de Informes</router-link></li>
          </ul>
        </nav>
      </header>
     <div class="container">
        <h2>Registro de Accesos</h2>
    
        <!-- Filtro -->
        <div class="filter-container">
            <h3>Filtrar Acessos</h3>
            <form @submit.prevent="validateFilterForm">
            <input type="date" v-model="filterDate" placeholder="Filtrar por Fecha">
            <input type="time" v-model="filterTime" placeholder="Filtrar por Hora">
            <select v-model="filterAccessType" placeholder="Filtrar por Tipo de Acceso">
                <option value="">Seleccionar Tipo de Acceso</option>
                <option value="ingreso">Ingreso</option>
                <option value="salida">Salida</option>
            </select>
            </form>
        </div>
    
        <!-- Tabla de accesos -->
        <table>
            <thead>
            <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tipo</th>
                <th>Vehículo</th>
                <th>Nombre</th>
                <th>Tipo de Acceso</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(access, index) in filteredAccesses" :key="index">
                <td>{{ access.date }}</td>
                <td>{{ access.time }}</td>
                <td>{{ access.tipo }}</td>
                <td>{{ access.vehicle }}</td>
                <td>{{ access.name }}</td>
                <td>{{ access.accessType }}</td>
                <td>
                  <button @click="deleteAccess(index)">Eliminar</button>
                </td>
              </tr>
            </tbody>
        </table>
    
        <!-- Formulario de Registro -->
        <div class="form-container">
            <h3>Registrar Acceso</h3>
            <form @submit.prevent="registerAccess">
            <input type="date" v-model="form.date" placeholder="Fecha" required>
            <input type="time" v-model="form.time" placeholder="Hora" required>
            <input type="text" v-model="form.tipo" placeholder="Tipo" required>
            <input type="text" v-model="form.vehicle" placeholder="Vehículo" required>
            <input type="text" v-model="form.name" placeholder="Nombre" required>
            <select v-model="form.accessType" required>
                <option value="">Seleccionar Tipo de Acceso</option>
                <option value="ingreso">Ingreso</option>
                <option value="salida">Salida</option>
            </select>
            <select v-model="estado">
              <option value="Autorizado">Autorizado</option>
              <option value="No Autorizado">No Autorizado</option>
            </select>

            <button @click.prevent="validateForm">Registrar Acceso</button>
            <div v-if="showAccessRegistration" id="accesoregistro">
                <h3>Acceso Registrado</h3>
            </div>
            </form>
        </div>
        </div>
    </div>
</template>

<script>
import { useAccessStore } from '../stores/useAccessStore';

export default {
  data() {
    return {
      form: {
        date: '',
        time: '',
        tipo: '',
        vehicle: '',
        name: '',
        accessType: '',
        estado: 'Autorizado',
      },
      filterDate: '', // Filtro por fecha
      filterTime: '', // Filtro por hora
      filterAccessType: '', // Filtro por tipo de acceso
      showAccessRegistration: false, // Nueva propiedad
    };
  },
  setup() {
    const accessStore = useAccessStore(); // Llama al store aquí
    return { accessStore }; // Retorna el store para usarlo en la plantilla
  },
  methods: {
    validateForm() {
      const { date, time, vehicle, name, accessType, tipo } = this.form;
      if (!date || !time || !vehicle || !name || !accessType || !tipo) {
        alert('Por favor, completa todos los campos del registro.');
        return;
      }

      const newAccess = { date, time, vehicle, name, accessType, tipo, estado: 'Autorizado' };
      const accessStore = useAccessStore();

      accessStore.addAccess(newAccess); // Agregar al store
      this.resetForm();
      this.showAccessRegistration = true;

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        this.showAccessRegistration = false;
      }, 3000);
    },
    deleteAccess(index) {
      // Confirmar eliminación
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este acceso?');
      if (confirmDelete) {
        // Eliminar del array en el store
        this.accessStore.accesses.splice(index, 1);
        
        // Actualizar localStorage
        this.accessStore.saveAccessesToLocalStorage();

        alert('Acceso eliminado correctamente.');
      }
    },
    resetForm() {
      this.form = {
        date: '',
        time: '',
        tipo: '',
        vehicle: '',
        name: '',
        accessType: '',
        estado: 'Autorizado',
      };
    },
  },
  mounted() {
    const accessStore = useAccessStore();
    accessStore.loadAccessesFromLocalStorage();
  },
  computed: {
    filteredAccesses() {
      return this.accessStore.accesses.filter((access) => {
        const matchDate = this.filterDate ? access.date === this.filterDate : true;
        const matchTime = this.filterTime ? access.time === this.filterTime : true;
        const matchAccessType = this.filterAccessType
          ? access.accessType === this.filterAccessType
          : true;

        return matchDate && matchTime && matchAccessType;
      });
    },
  },

};
</script>



<style scoped>
    /* Código CSS */
    body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        header {
            background: #c60c0c;
            color: #fff;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
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
        

        .container {
          background: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          width: 80%; /* Ajustar el ancho según lo necesites */
          max-width: 800px; /* Ancho máximo */
          margin-left: auto;
          margin-right: auto; /* Centrado */
        }

        h2 {
            text-align: center;
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
            background-color: #0056b3;
            color: white;
        }

        input[type="date"],
        input[type="time"],
        input[type="text"],
        select {
            padding: 10px;
            margin: 10px 0;
            width: calc(100% - 22px);
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        button {
            padding: 10px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background: #218838;
        }

        .form-container {
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 20px;
        }

        #accesoregistro {
            margin-top: 10px;
            color: green;
            
        }
        .router-view {
            visibility: hidden;
        }
</style>