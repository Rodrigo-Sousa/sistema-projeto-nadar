import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// Components
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

export default function Home() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Utilizando useEffect para realizar o redirecionamento quando clicado em "sair"
    useEffect(() => {
        if (!user) {
            // Redirecionado para a tela de login
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="h-screen bg-blue-900 text-white flex flex-col">
            <Navbar />

            <h1 className="text-3xl mb-4">
                Bem-vindo, {user?.name}
            </h1>

            <main className="flex-1 flex items-center justify-center bg-blue-800">

            </main>

            <Footer />
        </div>
    )
}