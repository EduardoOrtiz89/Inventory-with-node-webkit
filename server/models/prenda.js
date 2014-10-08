var persist = require("persist"),
	type = persist.type;
	Color =require('./color'),
	Estilo=require('./estilo');

module.exports = persist.define("Prenda", {
	"codigo": {type: type.STRING},
	"estilo": {type: type.STRING},
	"color": {type: type.INTEGER},
	"talla": {type: type.STRING},
	"nuevos": {type: type.INTEGER},
	"usados": {type: type.INTEGER},
	"costo_nuevo": {type: type.REAL},
	"costo_usado": {type: type.REAL},
	"costo_renta": {type: type.REAL},
	"funcion": {type: type.INTEGER},
	"borrado": {type:type.BOOLEAN},
	"tipo_prenda": {type: type.INTEGER}
})
.hasOne(Color,{
	name :'color',
	foreignKey : 'color'
})
.hasOne(Estilo,{
	name :'estilo',
	foreignKey : 'estilo'
});