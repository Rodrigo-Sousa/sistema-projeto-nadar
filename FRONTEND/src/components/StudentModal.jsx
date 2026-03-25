import { useState, useEffect } from "react";
// Biblioteca para geração de ID únicos
import { v4 as uuidv4 } from "uuid";

export default function StudentModal({ isOpen, onCLose, onSave, studentEdition }) {
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
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    // Lidando com o envio do formulário

    const handleSubmit = (event) => {
        event.preventDefault();

        if(studentEdition){
            onSave({...formData, id: studentEdition,id});
        }else {
            onSave({...formData, id: uuidv4()});
        }

        onCLose();
    }

    if(!isOpen) return null;




}

