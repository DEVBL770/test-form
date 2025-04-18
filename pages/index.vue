<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <label for="nom">Nom :</label>
        <input v-model="form.nom" type="text" id="nom" required />
        
        <label for="email">Email :</label>
        <input v-model="form.email" type="email" id="email" required />
        
        <label for="message">Message :</label>
        <textarea v-model="form.message" id="message" required></textarea>
        
        <button type="submit" :disabled="loading">Envoyer</button>
      </form>
  
      <div v-if="loading">Envoi en cours...</div>
      <div v-if="success">Merci pour votre message, nous vous répondrons sous peu !</div>
      <div v-if="error">Erreur lors de l’envoi. Veuillez réessayer.</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const form = ref({
    nom: '',
    email: '',
    message: ''
  });
  
  const loading = ref(false);
  const success = ref(false);
  const error = ref(false);
  
  const handleSubmit = async () => {
    loading.value = true;
    success.value = false;
    error.value = false;
  
    try {
      const response = await $fetch('https://script.google.com/macros/s/AKfycbzr--n-NAZniL3vYWUAR6g6sAk3r1NdRu7RG-eYtXkj6ncE-uQpy2rq8YSU96qXUZv3Xg/exec', {
        method: 'POST',
        body: JSON.stringify(form.value),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Réponse du serveur:', response);  // Vérifie la réponse
  
      if (response.result === 'success') {
        success.value = true;
        form.value = { nom: '', email: '', message: '' };  // Réinitialiser le formulaire
      } else {
        error.value = true;
      }
    } catch (e) {
      console.error('Erreur lors de l’envoi:', e);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Tu peux ajouter un peu de style ici pour ton formulaire */
  </style>
  