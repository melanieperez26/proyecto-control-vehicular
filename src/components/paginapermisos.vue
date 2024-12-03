<!-- eslint-disable vue/multi-word-component-names -->
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

    <div class="form-container">
      <h1>Gestión de Permisos</h1>
      <h2>{{ editIndex !== null ? 'Editar Permiso' : 'Crear Nuevo Permiso' }}</h2>
      <form @submit.prevent="validarFormulario">
        <label for="tipo">Tipo de Permiso:</label>
        <select v-model="permiso.tipo" required>
          <option value="">Seleccione</option>
          <option value="temporal">Temporal</option>
          <option value="restringido">Restringido</option>
        </select>

        <label for="nombre">Nombre completo:</label>
        <input type="text" v-model="permiso.nombre" placeholder="Escribe tu nombre completo" required>

        <label for="telefono">Número de teléfono:</label>
        <input type="text" v-model="permiso.telefono" placeholder="0999999999" required>

        <label for="placa">Número de placa:</label>
        <input type="text" v-model="permiso.placa" placeholder="ABC1234" required>

        <label for="motivo">Motivo de la visita:</label>
        <input type="text" v-model="permiso.motivo" placeholder="Motivo de la visita" required>

        <label for="fecha_inicio">Fecha de Inicio:</label>
        <input type="date" v-model="permiso.fechaInicio" required>

        <label for="fecha_fin">Fecha de Fin:</label>
        <input type="date" v-model="permiso.fechaFin" required>

        <button type="submit">{{ editIndex !== null ? 'Guardar Cambios' : 'Crear Permiso' }}</button>
      </form>
      <div v-if="permisoCreado">
        <h3>Permiso Creado</h3>
      </div>
    </div>

    <div class="form-container">
      <h2>Listado de Permisos</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo de Permiso</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Número de Placa</th>
            <th>Motivo de Visita</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(permiso, index) in permisos" :key="index">
            <td>{{ permiso.tipo }}</td>
            <td>{{ permiso.nombre }}</td>
            <td>{{ permiso.telefono }}</td>
            <td>{{ permiso.placa }}</td>
            <td>{{ permiso.motivo }}</td>
            <td>{{ permiso.fechaInicio }}</td>
            <td>{{ permiso.fechaFin }}</td>
            <td>
              <button @click="editarPermiso(index)">Editar</button>
              <button @click="eliminarPermiso(index)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      permiso: {
        tipo: '',
        nombre: '',
        telefono: '',
        placa: '',
        motivo: '',
        fechaInicio: '',
        fechaFin: '',
      },
      permisos: JSON.parse(localStorage.getItem('permisos')) || [],
      permisoCreado: false,
      editIndex: null, // Agregado para identificar si estamos editando un permiso
    };
  },
  methods: {
    validarMatricula(placa) {
      const licensePlatePattern = /^[A-Z]{3}[0-9]{4}$/;
      return licensePlatePattern.test(placa);
    },
    validarFormulario() {
      const { tipo, nombre, telefono, placa, motivo, fechaInicio, fechaFin } = this.permiso;

      if (!tipo || !nombre || !telefono || !placa || !motivo || !fechaInicio || !fechaFin) {
        alert('Por favor, completa todos los campos antes de enviar.');
        return;
      }

      const nombreValido = /^[A-Za-z\s]+$/.test(nombre);
      if (!nombreValido) {
        alert('Por favor, ingresa un nombre válido.');
        return;
      }

      const telefonoValido = /^\d{10}$/.test(telefono);
      if (!telefonoValido) {
        alert('Por favor, ingresa un número de teléfono válido (10 dígitos).');
        return;
      }

      if (!this.validarMatricula(placa)) {
        alert('La matrícula del vehículo no es válida. Ingrese el formato de 3 letras mayúsculas y 4 números.');
        return;
      }

      if (fechaFin < fechaInicio) {
        alert('La fecha de fin no puede ser anterior a la fecha de inicio.');
        return;
      }

      if (this.editIndex !== null) {
        // Editar permiso existente
        this.permisos[this.editIndex] = { ...this.permiso };
        this.editIndex = null; // Resetear editIndex
      } else {
        // Crear nuevo permiso
        const nuevoPermiso = { ...this.permiso };
        this.permisos.push(nuevoPermiso);
      }

      this.permisoCreado = true;
      this.permiso = {
        tipo: '',
        nombre: '',
        telefono: '',
        placa: '',
        motivo: '',
        fechaInicio: '',
        fechaFin: '',
      };
      setTimeout(() => {
        this.permisoCreado = false;
      }, 3000);

      this.guardarPermisosEnLocalStorage();
    },
    eliminarPermiso(index) {
      this.permisos.splice(index, 1);
      this.guardarPermisosEnLocalStorage();
    },
    editarPermiso(index) {
      const permisoParaEditar = this.permisos[index];
      this.permiso = { ...permisoParaEditar }; // Copiar los datos del permiso seleccionado para editar
      this.editIndex = index; // Guardar el índice para identificar si es una edición
    },
    
    guardarPermisosEnLocalStorage() {
      localStorage.setItem('permisos', JSON.stringify(this.permisos)); // Guardar permisos en localStorage
    },
  },
};
</script>
  
<style scoped>
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

  h1 {
      text-align: center;
      color: #333;
  }

  /* Limitar el ancho del contenedor principal */
  .form-container {
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

  /* Ajustar la tabla para que no se vea demasiado ancha */
  table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
  }

  th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
  }

  th {
      background-color: #007bff;
      color: white;
  }

  /* Estilo de los formularios dentro de .form-container */
  .form-container label {
      display: block;
      margin: 10px 0 5px;
  }

  .form-container input, 
  .form-container select {
      width: 80%; /* Ajustar el ancho al 100% del contenedor */
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
  }

  .form-container button {
      padding: 10px 15px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }

  .form-container button:hover {
      background-color: #218838;
  }

  #permisocreado {
      display: none; /* Oculta el mensaje inicialmente */
  }
</style>