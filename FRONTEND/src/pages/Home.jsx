import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Utilizando useEffect para realizar o redirecionamento quando clicado em "sair"
    useEffect(() => {
        if (!user) {
            // Redirecionado para a tela de login
            navigate("/login");
        }
    }, [user, navigate]);

    // Lidando com a opção quando clicado em sair
    const handleExit = () => {
        // limpando o token e usuário;
        handleLogout();

    };

    return (
        <div className="h-screen bg-blue-900 text-white flex flex-col items-center justify-center">
            <h1 className="text-3xl mb-4">
                Bem-vindo, {user?.name}
            </h1>

            {/* Botão para sair */}
            <button
                onClick={handleExit}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
            >
                Sair
            </button>
        </div>
    )
}