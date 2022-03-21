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