PRAGMA foreign_keys=ON;
CREATE TABLE "tipo_usuario" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT,
    "descripcion" TEXT
);

DROP TABLE IF EXISTS "usuarios";
CREATE TABLE "usuarios" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT,
    "password" TEXT,
    "id_tipo_usuario" INTEGER REFERENCES "tipo_usuario"("id") ON DELETE SET NULL  ON UPDATE SET NULL
);

DROP TABLE IF EXISTS "colores";
CREATE TABLE "colores" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "color" TEXT
);
DROP TABLE IF EXISTS "estilos";
CREATE TABLE "estilos" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "estilo" TEXT
);

DROP TABLE IF EXISTS "tipo_prenda";
CREATE TABLE "tipo_prenda" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT UNIQUE,
    "descripcion" TEXT
);

INSERT INTO tipo_prenda(name,descripcion) values('sacos','Sacos');
INSERT INTO tipo_prenda(name,descripcion) values('camisas','Camisas');
INSERT INTO tipo_prenda(name,descripcion) values('pantalones','Pantalones');
INSERT INTO tipo_prenda(name,descripcion) values('chalecos','Chalecos');
INSERT INTO tipo_prenda(name,descripcion) values('togas','Togas');
INSERT INTO tipo_prenda(name,descripcion) values('corbatas','Corbatas');
INSERT INTO tipo_prenda(name,descripcion) values('gaznes','Gaznes');
INSERT INTO tipo_prenda(name,descripcion) values('corbatines','Corbatines');
INSERT INTO tipo_prenda(name,descripcion) values('monios','Moños');
INSERT INTO tipo_prenda(name,descripcion) values('zapatos','Zapatos');

DROP TABLE IF EXISTS "prendas";
CREATE TABLE "prendas" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT UNIQUE,
    "estilo" INTEGER REFERENCES "estilos"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "talla" TEXT,
    "nuevos" INTEGER,
    "usados" INTEGER,
    "costo_nuevo" REAL,
    "costo_usado" REAL,
    "costo_renta" REAL,
    "renta" INTEGER,
    "venta" INTEGER,
    "tipo_prenda" INTEGER REFERENCES "tipo_prenda"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
);


DROP TABLE IF EXISTS "tickets";
CREATE TABLE "tickets" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT,
    "calle" TEXT,
    "colonia" TEXT,
    "ciudad" TEXT,
    "telefono" TEXT,
    "anticipo" REAL,
    "fecha_apartado" INTEGER,
    "fecha_entrega" INTEGER,
    "fecha_devolución" INTEGER

);

DROP TABLE IF EXISTS "rentas";
CREATE TABLE "rentas" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "ticket_id" INTEGER,
    "prenda_id" INTEGER,
    "nombre" TEXT,
    "cantidad" INTEGER,
    "descuento" REAL,
    "observaciones" TEXT
);
