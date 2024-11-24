/*
  Warnings:

  - Added the required column `estado` to the `Transacciones` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Libros" (
    "id_libro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "imagen_url" TEXT NOT NULL,
    "id_genero" INTEGER NOT NULL,
    CONSTRAINT "Libros_id_genero_fkey" FOREIGN KEY ("id_genero") REFERENCES "Generos" ("id_genero") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Libros" ("autor", "cantidad", "id_genero", "id_libro", "imagen_url", "precio", "titulo") SELECT "autor", "cantidad", "id_genero", "id_libro", "imagen_url", "precio", "titulo" FROM "Libros";
DROP TABLE "Libros";
ALTER TABLE "new_Libros" RENAME TO "Libros";
CREATE TABLE "new_Transacciones" (
    "id_transaccion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_libro" INTEGER NOT NULL,
    "fecha_compra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,
    CONSTRAINT "Transacciones_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transacciones_id_libro_fkey" FOREIGN KEY ("id_libro") REFERENCES "Libros" ("id_libro") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transacciones" ("fecha_compra", "id_libro", "id_transaccion", "id_usuario") SELECT "fecha_compra", "id_libro", "id_transaccion", "id_usuario" FROM "Transacciones";
DROP TABLE "Transacciones";
ALTER TABLE "new_Transacciones" RENAME TO "Transacciones";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
