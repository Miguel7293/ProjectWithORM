EMPEZAMOS LA TAREA DE MAYENKA:

DATABASE_URL="file:./dev.db" eso debe estar en su .env

npm install prisma --save-dev

npx prisma generate
npx prisma migrate dev

----- correr la base de datos -------
npx prisma studio
----- correr el servidor RES API ----

--- inicializar la base de datos -------
node src/limpiarBaseDeDatos.js
node src/inicializarBaseDeDatos_1.js

node src/inicializarBaseDeDatos_2.js


--- para añadir el correoElectronico a la base de datos --------
npm install prisma --save-dev
npx prisma migrate dev

