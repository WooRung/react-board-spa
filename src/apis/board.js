import axios from 'axios';

const BASE_URL = 'http://localhost:3000/board'
// const BASE_URL = '/board'
const service = axios.create({
    baseURL: BASE_URL
});

export async function fetchBoardList(){
    const resp = await service.get('/');
    return resp.data;
}

export async function deleteBoard(boardId){
    const resp = await service.delete(`/${boardId}`);
    return resp.data;
}

export async function createBoard({title, content, author}){
    const resp = await service.post('/', {
        title: title,
        content: content,
        author: author
    });
    return resp.data;
}   
export async function fetchBoardItem(boardId){
    const resp = await service.get(`/${boardId}`);
    return resp.data;
}