<template>
    <div>
      <header>
        <nav>
          <div class="logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGSLhZcVGoApXnXyK6C8Y5ZaUQbYRK6hV0zw&s"
              alt="Logo de la Universidad"
            />
          </div>
        </nav>
      </header>
  
      <form v-if="isLoginVisible" @submit.prevent="handleLogin">
        <h2>Iniciar Sesión</h2>
        <input v-model="loginUsername" type="text" placeholder="Usuario" required />
        <input v-model="loginPassword" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
        <button type="button" @click="toggleForms">Crear una cuenta</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
  
      <form v-else @submit.prevent="handleRegister">
        <h2>Registrarse</h2>
        <input v-model="registerUsername" type="text" placeholder="Usuario" required />
        <input v-model="registerEmail" type="email" placeholder="Correo" required />
        <input v-model="registerPassword" type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
        <button type="button" @click="toggleForms">Ya tengo una cuenta</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Estado para los formularios
        isLoginVisible: true,
        // Campos del formulario de inicio de sesión
        loginUsername: "",
        loginPassword: "",
        // Campos del formulario de registro
        registerUsername: "",
        registerEmail: "",
        registerPassword: "",
        // Mensaje de error
        errorMessage: "",
      };
    },
    methods: {
      toggleForms() {
        this.isLoginVisible = !this.isLoginVisible;
        this.errorMessage = ""; // Limpiar mensajes de error al cambiar de formulario
      },
      handleRegister() {
        const { registerUsername, registerEmail, registerPassword } = this;
  
        if (!registerUsername || !registerEmail || !registerPassword) {
          this.errorMessage = "Por favor, completa todos los campos.";
          return;
        }
  
        if (!this.validarEmail(registerEmail)) {
          this.errorMessage = "Por favor, ingresa un correo electrónico válido.";
          return;
        }
  
        if (!this.validarContraseña(registerPassword)) {
          this.errorMessage = "La contraseña debe tener al menos 6 caracteres y contener un número.";
          return;
        }
  
        if (localStorage.getItem(registerUsername)) {
          this.errorMessage = "El usuario ya existe. Elige otro nombre.";
          return;
        }
  
        localStorage.setItem(
          registerUsername,
          JSON.stringify({ email: registerEmail, password: registerPassword })
        );
        alert("Usuario registrado con éxito.");
        this.toggleForms(); // Cambiar al formulario de inicio de sesión
      },
      handleLogin() {
        const { loginUsername, loginPassword } = this;
  
        if (!loginUsername || !loginPassword) {
          this.errorMessage = "Por favor, completa todos los campos.";
          return;
        }
  
        const storedUser = localStorage.getItem(loginUsername);
  
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.password === loginPassword) {
            alert("Sesión iniciada correctamente.");
            // Redirigir a otra página (ajustar según sea necesario)
            this.$router.push("/desboard");
          } else {
            this.errorMessage = "Contraseña incorrecta.";
          }
        } else {
          this.errorMessage = "El usuario no existe.";
        }
      },
      validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      },
      validarContraseña(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);
      },
    },
  };
  </script>
  <style>
  /* Código CSS */
  body {
      font-family: Arial, sans-serif;
      background-image: url('https://www.uleam.edu.ec/wp-content/uploads/2021/11/Entrada-Uleam-1024x576-1.jpg'); 
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      background-size: cover; 
      
      
  }
  header {
      background: #c00a0a;
      color: #fff;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  header .logo img {
      height: 50px;
  }
  

  form {
      background: #fff;
      padding: 30px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      max-width: 800px; 
      margin: 40px auto; 
  }
  input {
      display: block;
      width: 100%;
      padding: 5px; 
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 14px; 
  }
  button {
      padding: 8px;
      border: none;
      border-radius: 5px;
      background-color: #5cb85c;
      color: white;
      cursor: pointer;
      font-size: 14px; 
  }
  button:hover {
      background-color: #4cae4c;
  }
  .error-message {
      color: red;
      text-align: center;
      margin-top: 10px;
      font-size: 12px; 
  }
  .forgot-password {
      font-size: 12px; 
      text-align: center;
      display: block;
      margin-top: 10px;
  }
</style>