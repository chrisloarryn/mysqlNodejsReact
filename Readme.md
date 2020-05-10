`Welcome`
____________________________________________________________________________



CONEXION A BD EN `.env, ya no es local.`


por ende no es necesario ejecutar script ni configurar db.
____________________________________________________________________________
para ejecución:

############### paso 1 ####################################################
cambiar usuario y password de la BD por los suyos::
esto es en:
`` cd /api/config/.env ``

luego, ejecutar comandos para la bd `./console.sql`
## los tipos de usuario deben ingresarse los mismos
`insert into tipo_usuario values (1200001, 'user')
insert into tipo_usuario values (1200002, 'admin')`

##############################################################################
Para iniciar la api y el cliente, 
se deben instalar los módulos de node, ingresando a cada una de las carpetas e
iniciar la instalacion: `npm i` or `sudo npm i` (de preferencia sin sudo)

se debe ejecutar el script `npm start` en ambas carpetas.
##########

#############
otra manera es en la raiz, ejecutar `npm install`y luego el comando `npm start`

PD: ``Lo que mas hice fue en el back-end 
 
`dejo la documentacion`
`https://documenter.getpostman.com/view/8636249/Szme4xih?version=latest`



`NOTA`: `intente usar sequelize en un principio, pero no sabia que era tan similar a mongoose`. Aqui dejo un repo en el que me encuentro practicando sequelize: `https://github.com/chrisloarryn/sequelizeMysqlNode`
