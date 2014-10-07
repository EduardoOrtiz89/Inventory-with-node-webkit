var persist = require("persist"),
	type = persist.type,
	//Ticket=require('./ticket'),
	Prenda=require('./prenda');
	var Renta=null;
var Renta=persist.define("renta", {
		"nombre": {type: type.STRING},
		"observaciones": {type: type.STRING},
		"cantidad": {type: type.INTEGER},
		"descuento": {type: type.REAL},
		"ticket_id": {type: type.INTEGER},
		"prenda_id": {type: type.INTEGER}
});
Renta.modelName="rentas";

Renta.hasOne(Prenda,{
	name :'prenda',
	foreignKey : 'prenda_id',
	createHasMany : true,
	hasManyName:'prendas'
});
module.exports = Renta;