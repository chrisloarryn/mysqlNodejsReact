"use strict";module.exports=function(e,i){return e.define("ticket",{id:{type:i.INTEGER,allowNull:!1,primaryKey:!0,field:"id"},idUser:{type:i.STRING(50),allowNull:!1,field:"id_user"},ticketPedido:{type:i.INTEGER,allowNull:!1,field:"ticket_pedido"}},{tableName:"ticket"})};