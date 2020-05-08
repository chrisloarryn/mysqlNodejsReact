-- Create database
create database reactapp;

-- access to db
use reactapp;

-- Create table
CREATE TABLE usuarios (
  id int(50) NOT NULL,
  id_tipouser int(12) NOT NULL,
  nombre varchar(50) NOT NULL,
  mail varchar(50) NOT NULL,
  pass varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ticket` (
  `id` int(50) NOT NULL,
  `id_user` int(50) NOT NULL,
  `ticket_pedido` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `tipo_usuario` (
  `id` int(50) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add primary key
ALTER TABLE usuarios
  ADD PRIMARY KEY (id);
ALTER TABLE tipo_usuario
  ADD PRIMARY KEY (id);
ALTER TABLE ticket
  ADD PRIMARY KEY (id);

-- Add autoincrement
ALTER TABLE usuarios
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 3452;
ALTER TABLE tipo_usuario
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2346;
ALTER TABLE ticket
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1324;


-- Add foreign key
ALTER TABLE usuarios
ADD CONSTRAINT fk_tipo
FOREIGN KEY (id_tipouser) REFERENCES tipo_usuario(id);

ALTER TABLE ticket
ADD CONSTRAINT fk_user
FOREIGN KEY (id_user) REFERENCES usuarios(id);
-- -------------------------

insert into tipo_usuario values (1200001, 'user');
insert into tipo_usuario values (1200002, 'admin');

insert into usuarios values (null, 1200002, 'Cristobal', 'chrisloarryn@gmail.com', '4m1g0s2020');

insert into usuarios values ()

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';








------------

create schema if not exists reactapp collate utf8mb4_0900_ai_ci;

create table if not exists tipo_usuario
(
	id int auto_increment
		primary key,
	nombre varchar(50) not null
);

create table if not exists usuarios
(
	id int auto_increment
		primary key,
	id_tipouser int not null,
	nombre varchar(50) not null,
	email varchar(50) not null,
	pass varchar(255) not null,
	constraint usuarios_email_uindex
		unique (email),
	constraint fk_tipo
		foreign key (id_tipouser) references tipo_usuario (id)
);

create table if not exists ticket
(
	id int auto_increment
		primary key,
	id_user int not null,
	ticket_pedido int not null,
	constraint fk_user
		foreign key (id_user) references usuarios (id)
);

-- -------------------------

insert into tipo_usuario values (1200001, 'user');
insert into tipo_usuario values (1200002, 'admin');

insert into usuarios (id_tipouser, nombre, email, pass)values ( 1200002, 'Cristobal', 'chrisloarryn@gmail.com', '4m1g0s2020');

select * from usuarios where email like '%chrisloarryn@gmail.com%';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';