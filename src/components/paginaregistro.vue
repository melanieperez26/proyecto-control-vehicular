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
  
      <div class="container">
        <h2>Gestión de Vehículos</h2>
  
        <div class="form-container">
          <h3>Añadir Nuevo Vehículo</h3>
          <form @submit.prevent="registrarVehiculo">
            <div>
              <label for="matricula">Matrícula:</label>
              <input type="text" v-model="matricula" placeholder="Matrícula" required>
            </div>
            <div>
              <label for="propietario">Propietario:</label>
              <input type="text" v-model="propietario" placeholder="Propietario" required>
            </div>
            <div>
              <label for="modelo">Modelo:</label>
              <input type="text" v-model="modelo" placeholder="Modelo" required>
            </div>
            <div>
              <label for="color">Color:</label>
              <input type="text" v-model="color" placeholder="Color" required>
            </div>
            <button type="submit">Registrar Vehículo</button>
          </form>
  
          <div v-if="vehiculoRegistrado" class="mensaje-vehiculo">
            <h3>Vehículo Registrado</h3>
          </div>
        </div>
        <!-- Formulario de edición -->
        <div v-if="vehiculoAEditar" class="form-container">
          <h3>Editar Vehículo</h3>
          <form @submit.prevent="actualizarVehiculo">
            <div>
              <label for="matricula">Matrícula:</label>
              <input type="text" v-model="matricula" placeholder="Matrícula" required disabled>
            </div>
            <div>
              <label for="propietario">Propietario:</label>
              <input type="text" v-model="propietario" placeholder="Propietario" required>
            </div>
            <div>
              <label for="modelo">Modelo:</label>
              <input type="text" v-model="modelo" placeholder="Modelo" required>
            </div>
            <div>
              <label for="color">Color:</label>
              <input type="text" v-model="color" placeholder="Color" required>
            </div>
            <button type="submit">Actualizar Vehículo</button>
          </form>
        </div>

  
        <h3>Listado de Vehículos Registrados</h3>
        <table>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Propietario</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vehiculo, index) in vehiculos" :key="index">
              <td>{{ vehiculo.matricula }}</td>
              <td>{{ vehiculo.propietario }}</td>
              <td>{{ vehiculo.modelo }}</td>
              <td>{{ vehiculo.color }}</td>
              <td>
                <button @click="editarVehiculo(vehiculo.matricula)">Editar</button>
                <button @click="eliminarVehiculo(vehiculo.matricula)">Eliminar</button>
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
        matricula: '',
        propietario: '',
        modelo: '',
        color: '',
        vehiculoRegistrado: false,
        vehiculos: [
          { matricula: 'ABC-123', propietario: 'Juan Pérez', modelo: 'Toyota Corolla', color: 'Rojo' },
        ],
        vehiculoAEditar: null,
      };
    },
    created() {
    // Cargar vehículos desde localStorage si existen
    const vehiculosGuardados = localStorage.getItem('vehiculos');
    if (vehiculosGuardados) {
        this.vehiculos = JSON.parse(vehiculosGuardados);
    }
    },
    

    methods: {
      validarMatricula(licensePlate) {
        const licensePlatePattern = /^[A-Z]{3}[0-9]{4}$/;
        return licensePlatePattern.test(licensePlate);
      },
      validarColor(color) {
        const validColors = [
          'Rojo', 'Verde', 'Azul', 'Amarillo', 'Naranja', 'Negro', 'Blanco', 'Gris', 'Marrón', 'Violetas', 'Cyan', 'Magenta','Celeste'
        ];
        return validColors.includes(color.charAt(0).toUpperCase() + color.slice(1).toLowerCase());
      },
      registrarVehiculo() {
        // Validar los datos antes de agregar
        if (!this.validarMatricula(this.matricula)) {
          alert('La matrícula no es válida.');
          return;
        }
        if (!this.validarColor(this.color)) {
          alert('El color no es válido.');
          return;
        }
  
        // Registrar vehículo
        this.vehiculos.push({
          matricula: this.matricula,
          propietario: this.propietario,
          modelo: this.modelo,
          color: this.color,
        });
        this.guardarVehiculosEnLocalStorage();
  
        // Mostrar mensaje de vehículo registrado
        this.vehiculoRegistrado = true;
  
        // Resetear el formulario
        this.matricula = '';
        this.propietario = '';
        this.modelo = '';
        this.color = '';
  
        setTimeout(() => {
          this.vehiculoRegistrado = false;
        }, 3000);
      },
      editarVehiculo(matricula) {
        alert('Función de editar vehículo: ' + matricula);
        const vehiculo = this.vehiculos.find(v => v.matricula === matricula);
        if (vehiculo) {
          this.vehiculoAEditar = vehiculo;
          this.matricula = vehiculo.matricula;
          this.propietario = vehiculo.propietario;
          this.modelo = vehiculo.modelo;
          this.color = vehiculo.color;
        }
      },
      actualizarVehiculo() {
        // Validar antes de actualizar
        if (!this.validarMatricula(this.matricula)) {
          alert('La matrícula no es válida.');
          return;
        }
        if (!this.validarColor(this.color)) {
          alert('El color no es válido.');
          return;
        }

        // Actualizar vehículo
        const index = this.vehiculos.findIndex(vehiculo => vehiculo.matricula === this.matricula);
        if (index !== -1) {
          this.vehiculos[index] = {
            matricula: this.matricula,
            propietario: this.propietario,
            modelo: this.modelo,
            color: this.color,
          };
          this.guardarVehiculosEnLocalStorage();
          alert('Vehículo actualizado con éxito');
          this.resetFormulario();
        }
      },
      eliminarVehiculo(matricula) {
        if (confirm('¿Está seguro que desea eliminar el vehículo con matrícula ' + matricula + '?')) {
          const index = this.vehiculos.findIndex(vehiculo => vehiculo.matricula === matricula);
          if (index !== -1) {
            this.vehiculos.splice(index, 1);
            alert('Vehículo eliminado');
            // Guardar vehículos actualizados en localStorage
            this.guardarVehiculosEnLocalStorage();
          }
        }
      },
      guardarVehiculosEnLocalStorage() {
         localStorage.setItem('vehiculos', JSON.stringify(this.vehiculos));
      },
      resetFormulario() {
      this.matricula = '';
      this.propietario = '';
      this.modelo = '';
      this.color = '';
      this.vehiculoAEditar = null;
    }
    },
  };

</script>
  <style scoped>
  
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
  
    input[type="text"],
    input[type="number"] {
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
    form div {
        margin-bottom: 10px; /* Espacio entre cada campo */
    }
  
    #vehiculoregistrado {
        display: none;
        margin-top: 10px;
        color: green;
    }
    .router-view {
        visibility: hidden;
    }
</style>
  