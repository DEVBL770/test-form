export default defineEventHandler(async (event) => {
    const body = await readBody(event)
  
    try {
      const res = await $fetch('https://script.google.com/macros/s/AKfycbzr--n-NAZniL3vYWUAR6g6sAk3r1NdRu7RG-eYtXkj6ncE-uQpy2rq8YSU96qXUZv3Xg/exec', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      return res
    } catch (e) {
      console.error('Erreur proxy :', e)
      return { result: 'error', message: e.message }
    }
  })
  