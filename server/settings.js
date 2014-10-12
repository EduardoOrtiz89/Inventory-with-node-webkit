module.exports.init = function(app, db, persist) {
	app.post("/settings-get", function(req, res) {
		var keys = req.body.keys;
		var queries = [];
		for (i in keys) {
			queries.push(persist.runSqlAll("select key,value from settings where key=?", [keys[i]]));
		}
		db.chain(queries, function(err, result) {
			if (err) {
				res.send(err);
				return;
			}
			res.send(result)
		});
	});

	app.post("/settings-put", function(req, res) {
		var values = req.body.values,
			results = [],
			queries = [];
		var temp = {};
		var selects = [];
		var inserts=[];
		Object.keys(values).forEach(function(key) {
			selects.push(persist.runSqlAll("select key,value from settings where key=?", [key]));
			inserts.push({"key":key, value: values[key]});
		});

		db.chain(selects, function(err, result) {
			if (err) {
				res.send(err);
				return;
			}
			for (var i = 0; i < result.length; i++) {
				if (result[i][0].key) {
					queries.push(persist.runSql("update settings set value=? where key=?", [inserts[i].value, result[i][0].key]));
				} else {
					queries.push(persist.runSql("insert into settings(key,value) values(?,?) ", [inserts[i].key, inserts[i].value]));
				}
			}
			db.chain(queries, function(err, result) {
				if (err) {
					res.send(err);
					return;
				}
				res.send(result)
			});
		});

	});
};