/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const TicketModel = sequelize.define('ticket', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		idUser: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'id_user'
		},
		ticketPedido: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'ticket_pedido'
		}
	}, {
		tableName: 'ticket'
	});

	return TicketModel
};
