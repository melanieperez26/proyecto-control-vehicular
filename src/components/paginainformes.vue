<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <!-- Encabezado -->
      <header>
        <div class="logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGSLhZcVGoApXnXyK6C8Y5ZaUQbYRK6hV0zw&s"
            alt="Logo de la Universidad"
          />
        </div>
        <nav>
          <ul>
            <li><router-link to="/desboard">Volver al Dashboard</router-link></li>
            <li><router-link to="/registro">Ir a Pagina Gestión de Vehículos</router-link></li>
            <li><router-link to="/accesos">Ir a Pagina de Accesos</router-link></li>
            <li><router-link to="/permisos">Ir a Pagina Gestión de Permisos</router-link></li>
            <li><router-link to="/informes">Ir a Pagina de Informes</router-link></li>
          </ul>
        </nav>
      </header>
  
      <!-- Contenido principal -->
      <div class="container">
        <h1>Informes y Estadísticas</h1>
  
        <!-- Sección de filtro -->
        <div class="filter-section">
          <label for="start-date">Fecha de Inicio:</label>
          <input type="date" v-model="startDate" id="start-date" name="start-date" />
          <label for="end-date">Fecha de Fin:</label>
          <input type="date" v-model="endDate" id="end-date" name="end-date" />
          <button @click="generarInforme">Generar Informe</button>
          <button @click="clearInforme">Borrar Informe</button>
          <div v-if="informeGenerado" id="informeGenerado">
            <h3>Informe Generado</h3>
            <p>Aquí aparecerá el informe después de generarlo.</p>
          </div>
        </div>
        <div v-if="datosFiltrados.length">
          <h3>Datos Filtrados</h3>
          <ul>
            <li v-for="(dato, index) in datosFiltrados" :key="index">
              {{ dato.date }} - {{ dato.time }}: {{ dato.vehicle }} - {{ dato.name }} - {{ dato.tipo }}
            </li>
          </ul>
        </div>

  
        <!-- Sección de gráfico -->
        <div class="chart" >
          <canvas id="chart"></canvas>
        </div>
  
        <!-- Botones para exportar -->
        <div>
          <button class="button" @click="exportReport('pdf')">Exportar a PDF</button>
        </div>
      </div>
    </div>
</template>
<script>
import jsPDF from 'jspdf';
import { useAccessStore } from '../stores/useAccessStore';
import { Chart } from 'chart.js';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,  // Registra la escala lineal
  Title,
  Tooltip,
  Legend
);

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      informeGenerado: false,
      datosFiltrados: [],
    };
  },
  setup() {
    const accessStore = useAccessStore();
    return { accessStore };
  },
  mounted() {
    ChartJS.register(LinearScale);
    // Recuperar las fechas del localStorage si existen
    const storedInforme = localStorage.getItem('informeGenerado');
    if (storedInforme) {
      const parsedInforme = JSON.parse(storedInforme);
      this.startDate = parsedInforme.startDate;
      this.endDate = parsedInforme.endDate;
      this.datosFiltrados = parsedInforme.datosFiltrados;
      this.informeGenerado = true;
      this.renderChart();
    }
  },
  methods: {
    generarInforme() {
      if (!this.startDate || !this.endDate) {
        alert('Por favor, completa ambas fechas.');
        return;
      }
      if (this.endDate < this.startDate) {
        alert('La fecha de fin no puede ser anterior a la fecha de inicio.');
        return false;
      }

      // Filtrar accesos desde el store
      this.datosFiltrados = this.accessStore.accesses.filter(
        (access) =>
          access.date >= this.startDate && access.date <= this.endDate
      );

      if (this.datosFiltrados.length === 0) {
        alert('No se encontraron datos en el rango seleccionado.');
        return;
      }

      this.datosFiltrados.sort((a, b) => new Date(a.date) - new Date(b.date));

      localStorage.setItem('informeGenerado', JSON.stringify({
        startDate: this.startDate,
        endDate: this.endDate,
        datosFiltrados: this.datosFiltrados,
      }));


      this.informeGenerado = true;
      this.renderChart();
    },
    renderChart() {
      const canvas = document.getElementById('chart');
      const ctx = canvas.getContext('2d');
      
      // Si ya existe un gráfico en el canvas, destrúyelo
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Crear el nuevo gráfico
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.datosFiltrados.map((dato) => dato.date),
          datasets: [
            {
              label: 'Accesos',
              data: this.datosFiltrados.map(() => 1), // Cada acceso cuenta como 1
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },


    exportReport(format) {
      if (format === 'pdf') {
        const doc = new jsPDF();
        doc.text('Informe de Accesos', 10, 10);

        // Iniciar la posición Y para los datos del informe
        let yPosition = 20;

        // Verificar si hay datos filtrados para agregar al PDF
        if (this.datosFiltrados.length > 0) {
          // Recorrer los datos filtrados y agregarlos al PDF
          this.datosFiltrados.forEach((dato) => {
            // Formatear el texto que se va a agregar
            const texto = `${dato.date} - ${dato.time}: ${dato.vehicle} - ${dato.name} - ${dato.tipo}`;
            doc.text(texto, 10, yPosition);
            yPosition += 10; // Aumentar la posición Y para la siguiente línea
          });
        } else {
          doc.text('No se encontraron datos para mostrar.', 10, yPosition);
        }
        const canvas = document.getElementById('chart');
        const chartImage = canvas.toDataURL('image/png'); // Convierte el gráfico a una imagen PNG

        // Agregar la imagen del gráfico al PDF
        doc.addImage(chartImage, 'PNG', 10, yPosition + 20, 180, 100); // 10: posición X, yPosition + 20: posición Y, 180: ancho, 100: alto

        // Guardar el documento como archivo PDF
        doc.save('informe.pdf');
      } else if (format === 'excel') {
        alert('Exportación a Excel próximamente.');
      }
    },

    clearInforme() {
    localStorage.removeItem('informeGenerado');
    this.informeGenerado = false;
    this.datosFiltrados = [];
    this.startDate = '';
    this.endDate = '';
    alert('Informe borrado.');
  }
  },
};

</script>
<style scoped>
        /* Codigo Css */
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
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
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
        .filter-section {
            margin-bottom: 20px;
        }
        label {
            margin-right: 10px;
        }
        .button {
            padding: 10px 15px;
            margin: 10px 0;
            background-color: #08ba38;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .button:hover {
            background-color: #0056b3;
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
            width: 100%;
            height: 400px;
        }
</style>