import axios from 'axios';

const BASE_URL = "/users";
const service = axios.create({
    baseURL: BASE_URL
})

/**
 * 서버에 로그인 요청
 */
export async function serverLogin({email, password}){
    const resp = await service.post('/login',{
        email:email,
        password:password
    });
    return resp.data;
}