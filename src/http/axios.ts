import axios from 'axios'
import history from './history';

const id = "wWWW4jaasU6WxJG76TELKtJb"
const secret = "CEHWCVMuiguR6n2HigJ6HQgs"

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  timeout: 5000,
  headers: {
    't-app-id': id,
    't-app-secret': secret
  }
});

instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token')
  if(xToken){
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error) {
  console.error(error)
  return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
  // 注意：token一天内过期
  if(response.headers['x-token']){
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response;
}, function (error) {
  if(error.response.status === 401){
    // window.location.href='/login'
    // console.log('重新定向')
    history.push('/login')
  }
  return Promise.reject(error);
});

export default instance