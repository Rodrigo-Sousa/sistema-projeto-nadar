/*Criação do banco de dados*/
CREATE DATABASE projeto_nadar;
USE projeto_nadar;

/*Usuários Administradores*/
CREATE TABLE users_admin(
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

/*Logins de acesso */
CREATE TABLE access_logs(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    login_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    logout_at DATETIME NULL,
    
    FOREIGN KEY (user_id) REFERENCES users_admin(id) ON DELETE CASCADE
);

/*Cadastro de tutores*/

CREATE TABLE tutors(
	id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
/*Cadastro de estudantes*/

CREATE TABLE students(
	id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    birth_date DATE,
    address VARCHAR(255),
    tutor_id INT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE SET NULL
);

/*Cadastro de instrutores*/

CREATE TABLE instructors(
	id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    specialty VARCHAR(150),
    phone VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

/*Aulas*/

CREATE TABLE classes(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT TRUE
);

/*Calendário das aulas - 0=Domingo,.... 6=Sábado*/

CREATE TABLE class_schedules(
	id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT NOT NULL,
    instructor_id INT NOT NULL,
    day_of_week TINYINT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    capacity INT DEFAULT 0,
    
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE CASCADE
);

/*Status de inscriçãos*/

CREATE TABLE enrollment_status(
	id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

/*Inserindo os status*/
INSERT INTO enrollment_status(description) VALUES ('ativo'), ('trancado'), ('cancelado');

/*Inscrições de matrículas*/

CREATE TABLE enrollments(
	id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    status_id INT NOT NULL,
    
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (status_id) REFERENCES enrollment_status(id)
);

/*Cronogramas de mátriculas*/

CREATE TABLE enrollment_schedules (
	id INT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id INT NOT NULL,
    schedule_id INT NOT NULL,
    
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
    FOREIGN KEY (schedule_id) REFERENCES class_schedules(id) ON DELETE CASCADE
);

/*Tipos de pagamentos*/

CREATE TABLE payment_types(
	id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

INSERT INTO payment_types (description) VALUES ('dinheiro'), ('pix'),
 ('cartao_credito'), ('cartao_debito');

/*Status de pagamento*/

CREATE TABLE payment_status(
	id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

INSERT INTO payment_status(description)VALUES('pendente'),('pago'),('cancelado'),('atrasado');

/*Pagamentos */

CREATE TABLE payments (
	id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    enrollment_id INT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_at DATETIME NULL,
    status_id INT NOT NULL,
    type_id INT NOT NULL,
    description VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE SET NULL,
    FOREIGN KEY (status_id) REFERENCES payment_status(id),
    FOREIGN KEY (type_id) REFERENCES payment_types(id)
);


/*Indexs para performances*/

CREATE INDEX idx_students_cpf ON students(cpf);
CREATE INDEX idx_tutors_cpf ON tutors(cpf);

CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_class ON enrollments(class_id);

CREATE INDEX idx_class_schedule_class_day ON class_schedules(class_id, day_of_week);

CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status_id);

CREATE INDEX idx_class_schedule_instructor ON class_schedules(instructor_id);
