var persist = require("persist"),
	type = persist.type
var Usuario=persist.define("Usuario", {
		"nombre": {type: type.STRING},
		"password": {type: type.STRING},
		"tipo_usuario": {type: type.INTEGER},
		"borrado":{type: type.INTEGER}
});
Usuario.modelName="Usuarios";

module.exports = Usuario;