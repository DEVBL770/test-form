<template>
    <div class="container">
      <h1>Formulaire de test</h1>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.nom" type="text" placeholder="Nom" required />
        <input v-model="form.email" type="email" placeholder="Email" required />
        <textarea v-model="form.message" placeholder="Message" required></textarea>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Envoi en cours...' : 'Envoyer' }}
        </button>
      </form>
      <p v-if="success" class="success">✅ Message envoyé avec succès !</p>
      <p v-if="error" class="error">❌ Une erreur est survenue. Réessaye.</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    nom: '',
    email: '',
    message: ''
  })
  
  const loading = ref(false)
  const success = ref(false)
  const error = ref(false)
  
  const handleSubmit = async () => {
    loading.value = true
    success.value = false
    error.value = false
  
    try {
      await $fetch('https://script.google.com/macros/s/AKfycbzr--n-NAZniL3vYWUAR6g6sAk3r1NdRu7RG-eYtXkj6ncE-uQpy2rq8YSU96qXUZv3Xg/exec', {
        method: 'POST',
        body: form.value
      })
      success.value = true
      form.value = { nom: '', email: '', message: '' }
    } catch (err) {
      console.error('Erreur:', err)
      error.value = true
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style>
  .container {
    max-width: 400px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  input, textarea {
    padding: 10px;
    border: 1px solid #ddd;
  }
  button {
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  </style>
  