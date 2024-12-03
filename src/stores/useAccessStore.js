// stores/useAccessStore.js
import { defineStore } from 'pinia';

export const useAccessStore = defineStore('accessStore', {
  state: () => ({
    accesses: [], // Lista de accesos compartidos
  }),
  actions: {
    addAccess(access) {
      this.accesses.push(access);
      this.saveAccessesToLocalStorage(); // Opcional: Persistencia en localStorage
    },
    setAccesses(accesses) {
      this.accesses = accesses;
    },
    saveAccessesToLocalStorage() {
      localStorage.setItem('accesses', JSON.stringify(this.accesses));
    },
    loadAccessesFromLocalStorage() {
      const storedAccesses = localStorage.getItem('accesses');
      if (storedAccesses) {
        this.accesses = JSON.parse(storedAccesses);
      }
    },
  },
  getters: {
    lastAccesses: (state) => state.accesses.slice(-3), // Obtener los últimos 5 accesos
  },
});
