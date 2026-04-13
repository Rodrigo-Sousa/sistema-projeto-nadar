/*Criando o banco de dados*/
CREATE DATABASE projeto_nadar;
/*Selecionando o banco pelo comando SLQ*/
USE projeto_nadar;

/*Tabela de usuários (para efetuar login)*/
CREATE TABLE users_admin(
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

/*Histórios de acesso como userAdmin*/
CREATE TABLE access_logs(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    login_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    logoff_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES users_admin(id)
);

/*Tutores (para alunos que são menor de idade)*/
CREATE TABLE tutors (
	id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR (150) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    address VARCHAR(255),
    birth_date DATE NOT NULL
);

/*Tabela de alunos*/
CREATE TABLE students(
	id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    address VARCHAR(255),
    birth_date DATE NOT NULL,
    tutor_id INT,
    FOREIGN KEY (tutor_id) REFERENCES tutors(id)
);

/*Tabela de instrutores*/
CREATE TABLE instructors(
	id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR (150) NOT NULL,
    address VARCHAR (255), 
    specialty VARCHAR(150)
    
);

/*Tabela de aulas*/
CREATE TABLE classes(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    description TEXT
);

/*Tabela de contrela de horário das aulas*/
CREATE TABLE class_schedules(
	id INT AUTO_INCREMENT PRIMARY KEY,
    classes_id INT NOT NULL,
    instructor_id INT NOT NULL,
    day_week ENUM ('SEG','TER','QUA','QUI','SEX','SAB','DOM') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    
    FOREIGN KEY (classes_id) REFERENCES classes(id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id),
    
    -- Evitando confluto de hoário
    UNIQUE (day_week, start_time, end_time)
);

/*Tabela de controle dos aulos x aulas*/
CREATE TABLE students_classes(
	id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    classes_schedules_id INT NOT NULL,
    
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (classes_schedules_id)REFERENCES class_schedules(id),
    
    UNIQUE (student_id, classes_schedules_id)
    
);

/*Tipos de pagamentos*/
CREATE TABLE types_payments(
	id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);
