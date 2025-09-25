-- Tabela Aluno
create table Aluno (
        id_aluno number(3) not null primary key,
        nome_aluno varchar(100) not null,
        cpf char(11),
        genero varchar(10) not null,
        email varchar(100) not null,
        data_nascimento date not null,
        contato_responsavel char(15) not null,
        nome_responsavel varchar(100) not null,
        endereco varchar(100) not null,
        nivel_escolaridade varchar(50) not null,
        data_matricula date not null
);

-- Tabela Cursos
create table Cursos (
        id_curso number(3) not null primary key,
        nome varchar(100),
        descricao text,
        nivel varchar(50),
        carga_horaria int
);

-- Tabela Mentores
CREATE table Mentores (
        id_mentor number(3) not null primary key,
        nome varchar(100),
        especialidade varchar(100),
        contato char(15)
);

-- Tabela Progresso
create table Progresso (    
        id_progresso number(3) not null primary key,
        etapa varchar(100),
        nota decimal(5,2),
        data_avaliacao date
);

-- Tabela Feedback
create TABLE Feedback (
        id_eventos number(3) not null primary key,
        id_aluno number(6),
        id_curso number(6),
        mentor_id int,
        data_feedback date,
        --nota INT CHECK (nota BETWEEN 1 AND 5),
        comentario text,
        sugestao text,
        FOREIGN KEY (id_aluno) REFERENCES Aluno(aluno_id),
        FOREIGN KEY (id_curso) REFERENCES Curso(curso_id),
        FOREIGN KEY (id_mentor) REFERENCES Mentores(mentor_id)
);