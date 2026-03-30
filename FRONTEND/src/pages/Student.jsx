import { useMemo, useState } from "react";
import { useStudents } from "../hooks/useStudents";
import StudentModal from "../components/StudentModal";
// Components
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

export default function Students() {
    const { students, addStudent, editStudent } = useStudents();

    const [isOpen, setIsOpen] = useState(false);
    const [studyingStudent, setStudyingStudent] = useState(null);

    const orderStudents = useMemo(() => {
        return [...students].sort((a, b) =>
            a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
        )
    }, [students]);

    // Lidando com as opções - Novo, Editar e Salva aluno
    const handleNewStudent = () => {
        setStudyingStudent(null);
        setIsOpen(true);
    }

    const handleEdition = (student) => {
        setStudyingStudent(student);
        setIsOpen(true);
    }

    const handleSave = (student) => {
        if (studyingStudent) {
            editStudent(student);
        } else {
            addStudent(student);
        }
    }

    // Lidando com a mudança do status, ao clicar em cancelar (fechando a modal).

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    // Função para converter a data, na hora de renderizar, para o padrão brasileiro
    function formatDateBR(date){
        return new Date(date).toLocaleDateString("pt-br");
    }
    // Renderização na página

    return (
        <div className="h-screen flex flex-col min-h-screen bg-blue-800">
            <Navbar />
            <div className="flex items-center justify-between mb-6 mt-6">
                <h1 className="text-2xl font-bold text-white m-2">Alunos</h1>
                <button
                    onClick={handleNewStudent}
                    className="bg-green-600 text-white m-2 px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Cadastrar novo aluno
                </button>
            </div>

            <div className="bg-blue-900 shadow-md rounded-xl overflow-hidden m-2 text-white">
                <table className="w-full text-left">
                    <thead className="bg-blue-400">
                        <tr>
                            <th className="p-3">Nome</th>
                            <th className="p-3">Data de Nascimento</th>
                            <th className="p-3">Endereço</th>
                            <th className="p-3">Aula</th>
                            <th className="p-3">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderStudents.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-gray-500">
                                    Nenhum aluno cadastrado ainda.
                                </td>
                            </tr>
                        ) : (
                            orderStudents.map((student) => (
                                <tr key={student.id} className="border-t houver:bg-gray-50">
                                    <td className="p-3">{student.name}</td>
                                    {/* Convertendo data para o padrão brasileiro */}
                                    <td className="p-3">{formatDateBR(student.birthDate)}</td>
                                    <td className="p-3">{student.address}</td>
                                    <td className="p-3">{student.class}</td>

                                    <button onClick={() => handleEdition(student)}
                                        className="bg-yellow-500 text-white mt-1 px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                                    >
                                        Editar
                                    </button>

                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </div>

            <StudentModal
                isOpen={isOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                studentEdition={studyingStudent}
            />
            <Footer />
        </div>
    )

}