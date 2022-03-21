import axios from 'axios';

const BASE = 'https://jsonplaceholder.typicode.com';

export const Api = {
    getAlbums: async () => {
        let response = await axios.get(`${BASE}/albums`);
        return response.data;
    },
    getOneAlbumById: async (id:number) => {
        let response = await axios.get(`${BASE}/albums/${id}`);
        return response.data;
    },
    getGalaryFromAlbum: async (id: number) => {
        let response = await axios.get(`${BASE}/albums/${id}/photos`);
        return response.data;
    },
    getPhotoById: async (id: number) => {
        let response = await axios.get(`${BASE}/photos/${id}`);
        return response.data;
    }
    
}