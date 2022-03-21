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