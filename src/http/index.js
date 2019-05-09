import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
axios.interceptors.request.use(config=>{
    config.headers.Authorization = sessionStorage.getItem('token')
    return config 
})
axios.interceptors.response.use(res=>{
    if(res.data.meta.status === 401 ) {
        location.href = '#/login'
    } else {
        return res
    }
})

export default axios