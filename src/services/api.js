import axios from "axios"

const createAxiosInstance = (token) => {
  const authorization = token ? { Authorization: `Token token=${token}` } : {}
  const axiosInstance = axios.create({
    withCredentials: !!token,
    responseType: "json",
    headers: {
      "Accept-Language": "ru",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      ...authorization,
    },
    timeout: 30000,
  })
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error)
    }
  )
  return axiosInstance
}

export default createAxiosInstance
