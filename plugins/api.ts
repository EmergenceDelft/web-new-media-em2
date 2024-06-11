export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: "http://localhost:5050/api"
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
