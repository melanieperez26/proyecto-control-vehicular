<template>
  <div>
    <h2>Registro de Acceso Vehicular</h2>
    <form @submit.prevent="registrarVehiculo">
      <div>
        <label for="placa">Placa:</label>
        <input type="text" v-model="placa" required />
      </div>
      <div>
        <label for="propietario">Propietario:</label>
        <input type="text" v-model="propietario" required />
      </div>
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placa: '',
      propietario: ''
    };
  },
  methods: {
    registrarVehiculo() {
      const nuevoVehiculo = {
        placa: this.placa,
        propietario: this.propietario
      };
      this.$emit('vehiculo-registrado', nuevoVehiculo);
      this.placa = '';
      this.propietario = '';
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
