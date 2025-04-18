<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h1 class="text-2xl font-bold mb-4">Formulaire de contact</h1>
  
        <input v-model="form.nom" type="text" placeholder="Nom" class="w-full p-2 border rounded" required />
        <input v-model="form.email" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
        <textarea v-model="form.message" placeholder="Message" class="w-full p-2 border rounded" required></textarea>
  
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Envoyer
        </button>
  
        <p v-if="success" class="text-green-600 text-sm text-center mt-2">✅ Message envoyé avec succès !</p>
        <p v-if="error" class="text-red-600 text-sm text-center mt-2">❌ Erreur lors de l’envoi. Veuillez réessayer.</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    nom: '',
    email: '',
    message: ''
  })
  
  const success = ref(false)
  const error = ref(false)
  
  const handleSubmit = async () => {
    success.value = false
    error.value = false
  
    try {
      const response = await $fetch('https://script.google.com/macros/s/AKfycbzr--n-NAZniL3vYWUAR6g6sAk3r1NdRu7RG-eYtXkj6ncE-uQpy2rq8YSU96qXUZv3Xg/exec', {
        method: 'POST',
        body: form.value,
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      if (response.result === 'success') {
        success.value = true
        form.value = { nom: '', email: '', message: '' }
      } else {
        error.value = true
      }
    } catch (e) {
      console.error('Erreur lors de l’envoi :', e)
      error.value = true
    }
  }
  </script>
  