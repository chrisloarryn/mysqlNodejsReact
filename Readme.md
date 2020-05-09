`Welcome`

CONEXION A BD EN .env, ya no es local.

para ejecución:

## paso 1
cambiar usuario y password de la BD por los suyos::
esto es en:
`` cd /api/config/.env ``

luego, ejecutar comandos para la bd `./console.sql`
## los tipos de usuario deben ingresarse los mismos
`insert into tipo_usuario values (1200001, 'user')
insert into tipo_usuario values (1200002, 'admin')`

#############
Para iniciar la api y el cliente, 
se deben instalar los módulos de node, ingresando a cada una de las carpetas e
iniciar la instalacion: `npm i` or `sudo npm i` (de preferencia sin sudo)

se debe ejecutar el script `npm start` en ambas carpetas.
##########

#############
otra manera es en la raiz, ejecutar `npm install`y luego el comando `npm start`

Lo que mas hice fue en el back-end
`https://www.getpostman.com/collections/4ea82eba4e00699419dc`
