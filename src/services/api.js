import axios from 'axios'

const api = axios.create({
    baseURL: 'https://delivery-glaucio.herokuapp.com'
})

export default api;