import axios from 'axios'

const api = axios.create({
    baseURL: 'https://mighty-ravine-45401.herokuapp.com'
})

export default api;