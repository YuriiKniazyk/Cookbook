import axios from './axios'

const Api = {
  async query(resource, params) {
    return await axios.get(resource, { params: params })
  },

  async get(resource, slug = '') {
    return await axios.get(`${resource}/${slug}`)
  },

  async post(resource, params) {
    return await axios.post(`${resource}`, params)
  },

  async update(resource, slug, params) {
    return await axios.put(`${resource}/${slug}`, params)
  },

  async put(resource, params) {
    return await axios.put(`${resource}`, params)
  },

  async delete(resource) {
    return await axios.delete(resource)
  }
}

export default Api

export const RecipeApi = {
    async query(params) {
        return await Api.query('recipes/all', params)
    },
  
    async get(params) {
        return await Api.get(`recipes/version`, params)
    },
  
    async post(params) {
        return await Api.post('recipes', params)
    },
  
    async put(params) {
        return await Api.update('recipes', params.id, params)
    },

    async delete(id) {
        return await Api.delete(`recipes/${id}`)
    }
}