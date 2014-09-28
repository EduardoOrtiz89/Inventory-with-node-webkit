var persist = require("persist"),
	type = persist.type;

module.exports = persist.define("Tipo_prenda", {
	"name": {type: type.STRING},
	"description": {type: type.STRING}
})