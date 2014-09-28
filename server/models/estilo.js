var persist = require("persist"),
	type = persist.type;

module.exports = persist.define("Estilo", {
	"estilo": {type: type.STRING}
})