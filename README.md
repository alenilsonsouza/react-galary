# Galeria ReactJs com API em JSONPlaceholder

Atividade feita no curso B7Web. Praticado por [Alenilson Souza](https://alenilsonsouza.com.br).

Demo: <https://reactgalary.alenilsonsouza.com.br>

## Instação 
* `npm install`

## Para rodar
* `npm start`

## 01 - Páginas
Home.tsx
```javascript
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Albums } from '../types/Albums';

import { Api } from "../Api";

export const Home = () => {

    const [loading, setLoading] = useState(false);
    const [albums, setAlbums] = useState<Albums[]>([]);

    useEffect(()=>{
        getAlbums();
    },[])

    const getAlbums = async () => {
        setLoading(true);
        let response = await Api.getAlbums();
        setAlbums(response);
        setLoading(false);
    }

    return (
        <div className="galaryList">
            {loading &&
                <div>Carregando</div>
            }
            {!loading && albums.length > 0 &&
                <>
                    {albums.map((item, key)=>(
                        <Link to={`/album/${item.id}`} key={key}>{item.title}</Link>
                    ))}
                </>
            }
        </div>
    )
}
```

Album.tsx
```javascript
import { BackButton } from "../components/BackButton";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Photos } from "../types/Photos";
import { Albums } from "../types/Albums";
import { Api } from "../Api";

export const Album = () => {

    const [photos, setPhotos] = useState<Photos[]>([]);
    const [album, setAlbum] = useState<Albums>();
    const [loading, setLoading] = useState(false);

    let { id } = useParams();

    let idAlbum: number;
    if (id) {
        idAlbum = parseInt(id);
    }

    const getPhotos = async (id: number) => {
        setLoading(true);
        let response = await Api.getGalaryFromAlbum(id);
        setPhotos(response);
        setLoading(false);
    }

    const getAlbumsOne = async (id: number) => {
        setLoading(true);
        let response = await Api.getOneAlbumById(id);
        setAlbum(response);
        setLoading(false);
    }

    useEffect(() => {
        getAlbumsOne(idAlbum);
        getPhotos(idAlbum);
    }, []);

    return (
        <div>
            <BackButton />
            {(album?.id) &&
                <div className="title">
                    {album.title}
                </div>
            }
            <div className="albumArea">
                {loading &&
                    <div>Carregando...</div>
                }
                {!loading && photos.length > 0 &&
                    <>
                        {photos.map((item, key) => (
                            <Link to={`/photo/${item.id}`} key={key}>
                                <img src={item.thumbnailUrl} alt={item.title} />
                            </Link>
                        ))}
                    </>
                }
            </div>
        </div>
    )
}
```

Photo.tsx
```javascript
import { BackButton } from "../components/BackButton";
import { useParams } from 'react-router-dom';

import { Photos } from "../types/Photos";
import { useEffect, useState } from "react";
import { Api } from "../Api";

export const Photo = () => {

    const [photo, setPhoto] = useState<Photos>();
    const [loading, setLoading] = useState(false);

    let { id } = useParams();

    let idPhoto: number;
    if (id) {
        idPhoto = parseInt(id);
    }

    const getPhotoById = async (id: number) => {
        setLoading(true);
        let response = await Api.getPhotoById(id);
        setPhoto(response);
        setLoading(false)
    }

    useEffect(() => {
        getPhotoById(idPhoto);
    }, [])

    return (
        <div>
            <BackButton />
            {loading &&
                <div>Carregando</div>
            }
            {!loading &&
                <>
                    <div className="title">{photo?.title}</div>
                    <img src={photo?.url} alt="" />
                </>
            }

        </div>
    )
}
```

## 02 - Types

Albums.ts
```javascript
export type Albums = {
    userId: number,
    id: number,
    title: string
}
```

Photos.ts
```javascript
export type Photos = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl:string
}
```

## 03 - Componentes

BackButton.tsx
```javascript
import { useNavigate } from "react-router-dom"

export const BackButton = () => {
    const navigate = useNavigate();

    const handleBackButton = () =>{
        navigate(-1);
    }

    return (
        <div className="buttonArea">
            <button onClick={handleBackButton}>Voltar</button>
        </div>
    )
}
```
## 04 - Rotas em Objeto

MainRouters.tsx
```javascript
import { useRoutes } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Album } from '../pages/Album';
import { Photo } from '../pages/Photo';

export const MainRouters = () => {
    return useRoutes([
        { path: "/", element: <Home /> },
        { path: "/album/:id", element: <Album /> },
        { path: "/photo/:id", element: <Photo /> }
    ]);
}
```
## Recursos
* States
* UseEffect
* Routers
* Axios
* API JSONPlaceholder