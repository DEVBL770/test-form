<template>
    <div class="container">
      <h1>Formulaire Google Sheet</h1>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.nom" type="text" placeholder="Nom" required />
        <input v-model="form.email" type="email" placeholder="Email" required />
        <textarea v-model="form.message" placeholder="Message" required></textarea>
  
        <button :disabled="loading" :class="{ loading: loading }">
          <span v-if="!loading">Envoyer</span>
          <span v-else>Envoi...</span>
        </button>
      </form>
  
      <p v-if="success" class="success">✅ Message envoyé avec succès !</p>
      <p v-if="error" class="error">❌ Erreur lors de l’envoi.</p>
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
    } catch (e) {
      console.error(e)
      error.value = true
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 60px auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  input, textarea {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  button {
    padding: 12px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
  }
  button:hover {
    background-color: #005cd6;
  }
  button:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
  .success {
    color: green;
    font-weight: bold;
  }
  .error {
    color: red;
    font-weight: bold;
  }
  </style>
  