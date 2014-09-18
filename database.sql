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

DROP TABLE IF EXISTS "sacos";
CREATE TABLE "sacos" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT,
    "estilo" INTEGER REFERENCES "estilos"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "talla" TEXT,
    "nuevos" INTEGER,
    "usados" INTEGER,
    "rentados" INTEGER default 0,
    "costo_nuevo" REAL,
    "costo_usado" REAL,
    "costo_renta" REAL
);

DROP TABLE IF EXISTS "pantalones";
CREATE TABLE "pantalones" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT,
    "estilo" INTEGER REFERENCES "estilos"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "talla" TEXT,
    "nuevos" INTEGER,
    "usados" INTEGER,
    "rentados" INTEGER default 0,
    "costo_nuevo" REAL,
    "costo_usado" REAL,
    "costo_renta" REAL
);
DROP TABLE IF EXISTS "chalecos";
CREATE TABLE "chalecos" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT,
    "estilo" INTEGER REFERENCES "estilos"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "talla" TEXT,
    "nuevos" INTEGER,
    "usados" INTEGER,
    "rentados" INTEGER default 0,
    "costo_nuevo" REAL,
    "costo_usado" REAL,
    "costo_renta" REAL
);


DROP TABLE IF EXISTS "camisas";
CREATE TABLE "camisas" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "cuello" TEXT,
    "nuevos" INTEGER,
    "usados" INTEGER,
    "rentados" INTEGER default 0,
    "costo_nuevo" REAL,
    "costo_usado" REAL,
    "costo_renta" REAL
);

DROP TABLE IF EXISTS "togas";
CREATE TABLE "togas" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "talla" TEXT,
    "rentados" INTEGER default 0,
    "cantidad" INTEGER,
    "costo_renta" REAL
);

DROP TABLE IF EXISTS "corbatas";
CREATE TABLE "corbatas" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "cantidad" INTEGER,
    "rentados" INTEGER default 0,
    "costo_renta" REAL
);


DROP TABLE IF EXISTS "corbatines";
CREATE TABLE "corbatines" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "cantidad" INTEGER,
    "rentados" INTEGER default 0,
    "costo_renta" REAL
);




DROP TABLE IF EXISTS "gaznes";
CREATE TABLE "gaznes" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "cantidad" INTEGER,
    "rentados" INTEGER default 0,
    "costo_renta" REAL
);


DROP TABLE IF EXISTS "monios";
CREATE TABLE "monios" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "color" INTEGER REFERENCES "colores"("id") ON DELETE SET NULL  ON UPDATE SET NULL,
    "cantidad" INTEGER,
    "rentados" INTEGER default 0,
    "costo_renta" REAL
);

DROP TABLE IF EXISTS "zapatos";
CREATE TABLE "zapatos" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "talla" TEXT,
    "cantidad" INTEGER,
    "rentados" INTEGER default 0,
    "costo_renta" REAL
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
    "observaciones" TEXT,
    "costo_unitario" REAL,
    "subtotal" REAL,
    "subtotal_desc" REAL,
    "tipo_prenda" TEXT
);
