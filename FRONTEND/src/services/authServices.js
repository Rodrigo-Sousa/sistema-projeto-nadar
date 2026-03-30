// Dado mockado

const mockUser = {
    email: "admin@projetonadar.com.br",
    password: "S3nh@",
    name: "Administrador"
};

// Exportando a const
export const login = (email, password) => {
    // Utilizando a promises
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            // Validando se o e-mail e senha estão corretos
            if (email === mockUser.email && password === mockUser.password){
                // gerando um token fake
                const fakeToken = "fake-jwt-token-123456";

                // Retornando o resolve
                resolve({
                    token: fakeToken,
                    user: {
                        name: mockUser.name,
                        email: mockUser.email
                    }
                });
            } else {
                reject ("Usuário ou senha inválidos");
            }
        }, 1000);

    });
};

// Exportando a const de logout

export const logout = () => {
    localStorage.removeItem("token");
}
