//axios解决返回数据深度问题
import axios from "axios";

axios.interceptors.response.use((response)=>{
    return response.data.data;
},(error)=>{
    return Promise.reject(error)
})

