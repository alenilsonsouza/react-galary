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