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

DROP TABLE IF EXISTS "tipo_prendas";
CREATE TABLE "tipo_prenda" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT UNIQUE,
    "descripcion" TEXT
);

INSERT INTO tipo_prendas(name,description) values('sacos','Sacos');
INSERT INTO tipo_prendas(name,description) values('camisas','Camisas');
INSERT INTO tipo_prendas(name,description) values('pantalones','Pantalones');
INSERT INTO tipo_prendas(name,description) values('chalecos','Chalecos');
INSERT INTO tipo_prendas(name,description) values('togas','Togas');
INSERT INTO tipo_prendas(name,description) values('corbatas','Corbatas');
INSERT INTO tipo_prendas(name,description) values('gaznes','Gaznes');
INSERT INTO tipo_prendas(name,description) values('corbatines','Corbatines');
INSERT INTO tipo_prendas(name,description) values('monios','Moños');
INSERT INTO tipo_prendas(name,description) values('zapatos','Zapatos');


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
CREATE TABLE tickets (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT,
    "calle" TEXT,
    "colonia" TEXT,
    "ciudad" TEXT,
    "telefono" TEXT,
    "anticipo" REAL,
    "fecha_apartado" TEXT,
    "fecha_entrega" TEXT,
    "fecha_devolucion" TEXT
, "status" INTEGER  NOT NULL  DEFAULT (1) REFERENCES "status_tickets"("id") ON DELETE SET NULL  ON UPDATE SET NULL   )


DROP TABLE IF EXISTS "rentas";
-- Describe RENTAS
CREATE TABLE rentas (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "ticket_id" INTEGER REFERENCES "tickets"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "prenda_id" INTEGER,
    "nombre" TEXT,
    "cantidad" INTEGER,
    "descuento" REAL,
    "observaciones" TEXT)

-- Describe STATUS_TICKETS
CREATE TABLE "status_tickets" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT
)
INSERT INTO "status_tickets"(id,name,description) VALUES(0,'cancelado','Cancelado');
INSERT INTO "status_tickets"(id,name,description) VALUES(1,'apartado','Apartado');
INSERT INTO "status_tickets"(id,name,description) VALUES(2,'entregado','Entregado al cliente');
INSERT INTO "status_tickets"(id,name,description) VALUES(3,'devuelto','Devuelto a tienda');