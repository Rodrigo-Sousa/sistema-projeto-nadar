import { useState, useEffect } from "react";
// Biblioteca para geração de ID únicos
import { v4 as uuidv4 } from "uuid";

export default function StudentModal({ isOpen, onClose, onSave, studentEdition }) {
    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        address: "",
        class: "",
    });

    useEffect(() => {
        if (studentEdition) {
            setFormData(studentEdition);
        } else {
            setFormData({
                name: "",
                birthDate: "",
                address: "",
                class: "",
            });
        }
    }, [studentEdition]);

    // Lidando com a mudança de estado

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Lidando com o envio do formulário

    const handleSubmit = (event) => {
        event.preventDefault();

        if (studentEdition) {
            onSave({ ...formData, id: studentEdition.id });
        } else {
            onSave({ ...formData, id: uuidv4() });
        }

        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">

                    {studentEdition ? "Editar aluno" : "Cadastrar aluno"}

                </h2>

                {/* Formulário para cadastro de novo aluno */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1"> Nome Completo</label>
                        <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500, outline-none"
                        />
                    </div>

                    {/* Data de nascimento */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data de Nascimento
                        </label>
                        <input
                            type="date"
                            name="bitrhDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        
                        />
                    </div>

                    {/* Endereço */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Endereço
                        </label>

                        <input 
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-g p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Aula
                        </label>
                        <select
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                        
                        <option value="">Selecione uma aula</option>
                        <option value="Natação">Natação</option>
                        <option value="Hidroginástica">Hidroginástica</option>
                        <option value="Fisioterapia">Fisioterapia</option>

                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"

                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white houver:bg-glue-700 transition"
                        >
                            {studentEdition ? "Salvar alterações" : "Salvar aluno"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )


}

