var persist = require("persist"),
	type = persist.type;

module.exports = persist.define("Color", {
	"color": {type: type.STRING}
},{
	tableName : "Colores"
})