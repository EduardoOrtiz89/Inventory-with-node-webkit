var persist = require("persist"),
	type = persist.type,
	Renta=require('./renta');
module.exports = Ticket= persist.define("Ticket", {
	"nombre": {type: type.STRING},
	"calle": {type: type.STRING},
	"colonia": {type: type.STRING},
	"ciudad": {type: type.STRING},
	"telefono": {type: type.STRING},
	"anticipo": {type: type.REAL},
	"fecha_apartado": {type: type.DATETIME},
	"fecha_entrega": {type: type.DATETIME},
	"fecha_devolucion": {type: type.DATETIME},
	"borrado": {type:type.BOOLEAN},
	"status": {type: type.INTEGER}
});
Ticket.hasMany(Renta,{name: "rentas"});