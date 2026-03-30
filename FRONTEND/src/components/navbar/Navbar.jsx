import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleExit = () => {
        handleLogout();
            navigate("/login");
    }
    return (
        <nav className="w-full h-16 bg-slate-900 text-white flex items-center justify-between px-10 shadow-md">
            <h1 className="text-xl font-bold tracking-wide">Projeto Nadar</h1>

            <ul className="flex gap-8 text-sm font-medium">
                <li>
                    <Link to="/home" className="hover:text-sky-400 transition">
                        Home
                    </Link>
                </li>

                <li>
                    <Link to="/student" className="hover:text-sky-400 transition">
                        Alunos
                    </Link>
                </li>

                <li>
                    <Link to="/aulas" className="hover:text-sky-400 transition">
                        Aulas e Treinamentos
                    </Link>
                </li>
                <li>
                    {/* Botão para sair */}
                    <button
                        onClick={handleExit}
                        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded"
                    >
                        Sair
                    </button>
                </li>
            </ul>
        </nav>
    )
}
