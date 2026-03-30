// Importando módulos
import { createContext, useState, useEffect } from "react";

// Exportando consts
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // Trabalhando com o state do usuário
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("toke");

        if(token) {
            // Simulando recuperação do usuário
            setUser({name: "Administrador"});
        }
    }, []);
    
    // Lidando com os dados do Login 
    const handleLogin = (data) =>{
        localStorage.setItem("token", data.token);
        setUser(data.user);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    // Retornando o AuthContext
    return(
        <AuthContext.Provider value ={{user, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}