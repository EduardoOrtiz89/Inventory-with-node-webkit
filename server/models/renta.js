var persist = require("persist"),
	type = persist.type,
	Ticket=require('./ticket'),
	Prenda=require('./prenda');
module.exports = persist.define("Renta", {
		"nombre": {type: type.STRING},
		"observaciones": {type: type.STRING},
		"cantidad": {type: type.INTEGER},
		"descuento": {type: type.REAL},
		"ticket_id": {type: type.INTEGER},
		"prenda_id": {type: type.INTEGER}
}).
hasOne(Ticket,{
	name :'ticket',
	foreignKey : 'ticket_id',
	createHasMany : true,
	hasManyName:'rentas'
}).
hasOne(Prenda,{
	name :'prenda',
	foreignKey : 'prenda_id',
	createHasMany : true,
	hasManyName:'prendas'
});