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