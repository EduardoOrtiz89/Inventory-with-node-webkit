var persist = require("persist"),
	type = persist.type;
module.exports = persist.define("blog", {
	"created": {
		type: type.DATETIME,
		defaultValue: function() {
			return new Date();
		}
	},
	"lastUpdated": {
		type: type.DATETIME
	},
	"title": {
		type: type.STRING
	},
	"body": {
		type: type.STRING
	}
});