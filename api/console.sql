

-- Create database
create database reactapp;

-- access to db
use reactapp;


create table tipo_usuario
(
    id     int auto_increment
        primary key,
    nombre varchar(50) not null
);

create table usuarios
(
    id          int auto_increment
        primary key,
    id_tipouser int          not null,
    name        varchar(50)  not null,
    email       varchar(50)  not null,
    password    varchar(255) not null,
    constraint usuarios_email_uindex
        unique (email),
    constraint fk_tipo
        foreign key (id_tipouser) references tipo_usuario (id)
);

create table ticket
(
    id            int auto_increment
        primary key,
    id_user       int          null,
    ticket_pedido varchar(255) not null,
    constraint fk_user
        foreign key (id_user) references usuarios (id)
);


-- -------------------------

insert into tipo_usuario values (1200001, 'user');
insert into tipo_usuario values (1200002, 'admin');

-- insert into usuarios (id_tipouser, nombre, email, pass)values ( 1200002, 'Cristobal', 'chrisloarryn@gmail.com', '4m1g0s2020');

-- select * from usuarios where email like '%chrisloarryn@gmail.com%';
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';