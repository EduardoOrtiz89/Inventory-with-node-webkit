module.exports.init =  function(app,db){
  app.get('/tickets',function(req,res){
  		console.log(req);
  		res.send("hola");
  });
  app.get('/num-ticket',function(req,res){
  	db.get('select seq+1 as nextvalue from sqlite_sequence where name=\'tickets\'',
  	function success(result){
  		res.send({ticket: result.nextvalue});
  	},function empty(){
  		res.send({numTicket: 1});
  	})
  });
  app.post('/tickets',function(req,res){
  		console.log(req.body);
  		res.send("hola");
  });
};