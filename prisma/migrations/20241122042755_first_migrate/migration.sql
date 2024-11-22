-- CreateTable
CREATE TABLE "Usuarios" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "codigo_tarjeta" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "saldo" REAL NOT NULL DEFAULT 0.00
);

-- CreateTable
CREATE TABLE "Generos" (
    "id_genero" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_genero" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Libros" (
    "id_libro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "id_genero" INTEGER NOT NULL,
    CONSTRAINT "Libros_id_genero_fkey" FOREIGN KEY ("id_genero") REFERENCES "Generos" ("id_genero") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transacciones" (
    "id_transaccion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_libro" INTEGER NOT NULL,
    "fecha_compra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transacciones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacciones_id_libro_fkey" FOREIGN KEY ("id_libro") REFERENCES "Libros" ("id_libro") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_codigo_tarjeta_key" ON "Usuarios"("codigo_tarjeta");

-- CreateIndex
CREATE UNIQUE INDEX "Generos_nombre_genero_key" ON "Generos"("nombre_genero");
