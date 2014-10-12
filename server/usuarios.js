"use strict";
module.exports.init = function(app, db, models) {
	/**SEARCH*/

	app.get('/usuarios', function(req, res) {
		var query = req.query,q= 'select usuarios.*,tipo_usuario.descripcion as tipo_usuario_desc from usuarios left join tipo_usuario on tipo_usuario.id=usuarios.tipo_usuario ',result=[];

		var params = [];
		if (Object.keys(query).length !== 0) {
			q += ' where ';
			var ands = [];
			Object.keys(query).forEach(function(key) {
				var obj = {};
				try {
					obj = JSON.parse(query[key]);
				} catch (e) {}
					ands.push(' usuarios.' + key + ' = ?');
					params.push(query[key]);
			});
			q += ands.join(' and ');

		}
		db.runSqlEach(q, params, function(err, rows) {
			result.push(rows);
		}, function complete() {
			res.send(result);
		});

	});


	/****INSERT AND UPDATE***/

	app.post('/usuarios', function(req, res) {
		var item = req.body;
		var id = item.id;
		delete item.id;
		delete item.tipo_usuario_desc;
		item.borrado=0;
		if (id && id !== 0) { //UPDATE
			models.Usuario.update(db, id, item, function(err){
				if (err) {
					res.send(err);
					return;
				}
				res.send(item);
			});
		} else {
			var obj = new models.Usuario(item);
				obj.save(db, function(err, result) {
					if (err) {
						res.send(err);
						return;
					}
					res.send(result);
				});
			}
	});

	/**DELETE**/

	app.delete('/usuarios', function(req, res) {
		var sql = 'update  usuarios set borrado=1 where id=?';
		var _id = req.query.id;
		db.runSql(sql, [
			_id
		], function(err) {
			if(err) {res.send(err); return;}
			res.send(_id);
		});
	});



};