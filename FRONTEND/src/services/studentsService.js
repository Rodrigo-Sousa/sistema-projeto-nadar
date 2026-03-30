// Verificando se o arquivo students.json existe, caso contrário cria automaticamente um vazio
export const getStudents = () => {
    const data = localStorage.getItem("students.json");
    return data ? JSON.parse(data) : [];
}

export const saveStudents = (students) => {
    localStorage.setItem("students.json", JSON.stringify(students));
}

export const createStudent = (student) => {
    const students = getStudents();
    const updated = [...students, student];
    saveStudents(updated);
    return updated;
};

// Editando o usuário no LocalStorage
export const updateStudent = (studentUpdated) => {
    const students = getStudents();

    const updateList = students.map((student) => 
    student.id === studentUpdated.id ? studentUpdated : student);

    localStorage.setItem("students.json", JSON.stringify(updateList));
    return updateList;
}