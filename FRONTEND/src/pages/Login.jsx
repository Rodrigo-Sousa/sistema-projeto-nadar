import { useState, useContext } from "react";
import { login } from "../services/authServices";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Exportando função de Login

export default function Login() {
    // Lidando com o login
    const { handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Lidando com o envio (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await login(email, password);
            handleLogin(response);
            navigate("/home");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    // Retornando

    return (
        <div className="flex items-center justify-center h-screen bg-blue-900">
            {/* Formulário */}
            <form onSubmit={handleSubmit} className="bg-blue-800 p-8 rounded-2xl shadow-lg w-96">
                {/* Título do formulário */}
                <h2 className="text-white text-2xl mb-6 text-center">
                    Login - Projeto Nadar
                </h2>

                {/* Recebendo o error */}
                {error && (
                    <p className="text-red-400 mb-4 text-sm text-center">{error}</p>
                )}

                {/* Inputs para receber e-mail e senha */}
                <input
                    type="email"
                    placeholder="email@projetonadar.com.br"
                    className="w-full p-3 mb-4 rounded bg-blue-700 text-white focus:outline-white"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-3 mb-4 rounded bg-blue-700 text-white focus:outline-white"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                {/* Botão para submeter o formulário */}
                <button type="submit" className="w-full bg-green-600 hover:bg-green-500 p-3 rounded text-white font-bold">
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>

        </div>
    )
};

