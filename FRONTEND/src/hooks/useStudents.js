import { useState, useEffect } from "react";
import { getStudents, createStudent, updateStudent } from "../services/studentsService";

export const useStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(getStudents());
    }, []);

    const addStudent = (student) => {
        const updated = createStudent(student);
        setStudents(updated);
    };

    const editStudent = (student) => {
        const updated = updateStudent(student);
        setStudents(updated);
    }

    return {
        students,
        addStudent,
        editStudent
    }
}