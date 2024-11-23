EMPEZAMOS LA TAREA DE MAYENKA:

DATABASE_URL="file:./dev.db" eso debe estar en su .env

npm install prisma --save-dev

npx prisma generate
npx prisma migrate dev

---inicializar la base de datos -------
node src/limpiarBaseDeDatos.js
node src/inicializarBaseDeDatos_1.js
node src/inicializarBaseDeDatos_2.js
