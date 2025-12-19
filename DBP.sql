-- MySQL 8.x
-- Base de datos para sistema de reservas multi-dueño de canchas

DROP DATABASE IF EXISTS reservas_canchas;
CREATE DATABASE reservas_canchas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE reservas_canchas;

-- Tipos normalizados a CHECK (MySQL 8 permite CHECK)

CREATE TABLE IF NOT EXISTS auth (
  id BIGINT PRIMARY KEY,
  usuario VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE usuarios (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario VARCHAR(20) NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  correo_electronico VARCHAR(255) NOT NULL UNIQUE,
  foto_perfil TEXT,
  tipo_usuario ENUM('cliente','dueño','admin') NOT NULL DEFAULT 'cliente',
  telefono VARCHAR(30),
  fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  ultimo_login DATETIME,
  activo INT(1)
);

CREATE TABLE canchas (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  dueño_id BIGINT NOT NULL,
  nombre VARCHAR(200) NOT NULL,
  descripcion TEXT,
  direccion VARCHAR(255) NOT NULL,
  lat DECIMAL(10,7),
  lng DECIMAL(10,7),
  reglas TEXT,
  servicios_adicionales TEXT,
  estado ENUM('activo','inactivo') NOT NULL DEFAULT 'activo',
  precio_por_hora DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_canchas_dueño FOREIGN KEY (dueño_id) REFERENCES usuarios(id)
);

ALTER TABLE canchas
ADD COLUMN superficie ENUM(
  'Césped sintético',
  'Césped natural',
  'Parquet',
  'Cemento'
) NOT NULL AFTER descripcion;
ALTER TABLE canchas
ADD COLUMN barrio VARCHAR(100),
ADD COLUMN ciudad VARCHAR(100);

CREATE TABLE servicios (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cancha_servicios (
  cancha_id BIGINT NOT NULL,
  servicio_id BIGINT NOT NULL,
  PRIMARY KEY (cancha_id, servicio_id),
  FOREIGN KEY (cancha_id) REFERENCES canchas(id),
  FOREIGN KEY (servicio_id) REFERENCES servicios(id)
);


CREATE TABLE cancha_imagenes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  cancha_id BIGINT NOT NULL,
  url TEXT NOT NULL,
  orden INT DEFAULT 0,
  fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cancha_imagenes FOREIGN KEY (cancha_id) REFERENCES canchas(id)
);

-- Plantillas recurrentes para generación de horarios
CREATE TABLE plantilla_horarios (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  cancha_id BIGINT NOT NULL,
  dia_semana TINYINT NOT NULL CHECK (dia_semana BETWEEN 0 AND 6),
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  CONSTRAINT fk_plantilla_cancha FOREIGN KEY (cancha_id) REFERENCES canchas(id)
);

-- Slots concretos generados
CREATE TABLE horarios (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  cancha_id BIGINT NOT NULL,
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  estado ENUM('disponible','reservado','bloqueado') NOT NULL DEFAULT 'disponible',
  CONSTRAINT fk_horarios_cancha FOREIGN KEY (cancha_id) REFERENCES canchas(id),
  CONSTRAINT uq_horario_unico UNIQUE(cancha_id, fecha, hora_inicio, hora_fin)
);

CREATE TABLE reservas (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  horario_id BIGINT NOT NULL,
  fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('pendiente','confirmada','cancelada','finalizada') NOT NULL DEFAULT 'pendiente',
  valoracion INT CHECK (valoracion BETWEEN 1 AND 5),
  comentario_valoracion TEXT,
  CONSTRAINT fk_reserva_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT fk_reserva_horario FOREIGN KEY (horario_id) REFERENCES horarios(id),
  CONSTRAINT uq_reserva_horario UNIQUE(horario_id)
);

CREATE TABLE pagos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  reserva_id BIGINT NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  metodo VARCHAR(50),
  fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
  estado_pago ENUM('pendiente','pagado','fallido') NOT NULL DEFAULT 'pendiente',
  CONSTRAINT fk_pagos_reserva FOREIGN KEY (reserva_id) REFERENCES reservas(id)
);

CREATE TABLE favoritos (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  cancha_id BIGINT NOT NULL,
  fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_favoritos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT fk_favoritos_cancha FOREIGN KEY (cancha_id) REFERENCES canchas(id),
  CONSTRAINT uq_favorito UNIQUE(usuario_id, cancha_id)
);

CREATE TABLE reseñas (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  cancha_id BIGINT NOT NULL,
  reserva_id BIGINT,
  comentario TEXT,
  calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reseña_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT fk_reseña_cancha FOREIGN KEY (cancha_id) REFERENCES canchas(id),
  CONSTRAINT fk_reseña_reserva FOREIGN KEY (reserva_id) REFERENCES reservas(id)
);

CREATE TABLE asistencia (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  reserva_id BIGINT NOT NULL,
  asistio BOOLEAN,
  fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_asistencia_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT fk_asistencia_reserva FOREIGN KEY (reserva_id) REFERENCES reservas(id),
  CONSTRAINT uq_asistencia UNIQUE(usuario_id, reserva_id)
);

CREATE TABLE administracion_usuarios (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  rol ENUM('administrador','moderador','soporte') NOT NULL DEFAULT 'administrador',
  fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_admin_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT uq_admin_usuario UNIQUE(usuario_id)
);

-- Auditoría mínima
CREATE TABLE auditoria (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT,
  accion VARCHAR(200) NOT NULL,
  entidad VARCHAR(100),
  entidad_id BIGINT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip VARCHAR(45),
  detalles TEXT,
  CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE notificaciones (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  titulo VARCHAR(200),
  mensaje TEXT,
  visto BOOLEAN DEFAULT FALSE,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
-- 1. Crea la tabla que falta
CREATE TABLE cancha_servicios (
  cancha_id BIGINT NOT NULL,
  servicio_id BIGINT NOT NULL,
  PRIMARY KEY (cancha_id, servicio_id),
  FOREIGN KEY (cancha_id) REFERENCES canchas(id) ON DELETE CASCADE,
  FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE CASCADE
);
-- DROP TABLE antigua si existe
DROP TABLE IF EXISTS reseñas;

-- Crear tabla reseñas simplificada
CREATE TABLE resenas(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  usuario_id BIGINT NOT NULL,
  cancha_id BIGINT NOT NULL,
  comentario TEXT,
  calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reseña_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  CONSTRAINT fk_reseña_cancha FOREIGN KEY (cancha_id) REFERENCES canchas(id)
);

-- 2. Inserta los servicios que usan los mocks
INSERT INTO servicios (nombre) VALUES
('Estacionamiento'),
('Vestuario'),
('Duchas'),
('Bar');

-- 3. Relaciones según mock
INSERT INTO cancha_servicios (cancha_id, servicio_id) VALUES
(1, 1), (1, 2),
(2, 2), (2, 3),
(3, 1), (3, 2), (3, 3), (3, 4);

-- Índices útiles
CREATE INDEX idx_canchas_dueño ON canchas(dueño_id);
CREATE INDEX idx_horarios_estado ON horarios(estado);
CREATE INDEX idx_reservas_usuario ON reservas(usuario_id);
CREATE INDEX idx_reservas_estado ON reservas(estado);
CREATE INDEX idx_pagos_estado ON pagos(estado_pago);

INSERT INTO cancha_imagenes (cancha_id, url, orden) VALUES
(1, 'https://i.pravatar.cc/400?u=losasfc', 0),
(2, 'https://i.pravatar.cc/400?u=5taestrella', 0),
(3, 'https://i.pravatar.cc/400?u=goalstation', 0);

select * from usuarios;