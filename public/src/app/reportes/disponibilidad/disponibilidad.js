angular.module('ngBoilerplate.reporte_disponibilidad', [
	'ui.router',
	'ngResource',
	'ui.bootstrap',
	'util.datepicker',
	'ui.calendar'
])
	.config(function config($stateProvider) {
		$stateProvider.state('reporte_disponibilidad', {
			url: '/reportes/disponibilidad',
			views: {
				"main": {
					controller: 'reportesDisponibilidadCtrl',
					templateUrl: 'reportes/disponibilidad/disponibilidad.tpl.html'
				}
			},
			data: {
				pageTitle: 'Reportes de disponibilidad'
			}
		});
		$stateProvider.state('reporte_disponibilidad_prenda', {
			url: '/reportes/disponibilidad/:id',
			views: {
				"main": {
					controller: 'reportesDisponibilidadPrendaCtrl',
					templateUrl: 'reportes/disponibilidad/disponibilidad_prenda.tpl.html'
				}
			},
			data: {
				pageTitle: 'Reportes de disponibilidad'
			}
		});
	})
	.factory('ReportesCacheDisp', ['$cacheFactory',
		function($cacheFactory) {
			return $cacheFactory('reportes-disp');
		}
	])
	.controller('reportesDisponibilidadPrendaCtrl', function($scope, $window,TicketsPrendas, $stateParams,$location) {
		$scope.events=[];
		TicketsPrendas.get({
			id: $stateParams.id
		}, function(rentas) {
			for (var i in rentas) {
				$scope.events.push({
					id: rentas[i].ticket_id,
					title: rentas[i].nombre_ticket,
					start: new Date(rentas[i].fecha_entrega),
					end: new Date(rentas[i].fecha_devolucion),
					allDay: true
				});
			}
		});
		$scope.historyBack=function(){
			$window.history.back();
		};
		$scope.mostrarTicket = function(renta, allDay, jsEvent, view) {
			$location.path('/rentas/' + renta.id);
		};
		$scope.nuevaRenta = function(date, allDay, jsEvent, view) {
			$location.path('/apartados/' + date.getTime());
		};
		$scope.uiConfig = {
			calendar: {
				height: 450,
				editable: true,
				dayNames : ['Domingo','Lunes', 'Martes','Miércoles','Jueves','Viernes','Sábado'],
				dayNamesShort :['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
				buttonText: {'today': 'Hoy'},
				header: {
					left: 'title',
					center: '',
					right: 'today prev,next'
				},
				eventClick: $scope.mostrarTicket,
				dayClick: $scope.nuevaRenta
			}
		};
		$scope.eventSources2 = [$scope.events];
	})
	.controller('reportesDisponibilidadCtrl', function reportesDisponibilidadCtrl($scope, tables, TableSearch, DatePicker, Reportes, Dates, $location, ReportesCache, Prendas,ReportesCacheDisp) {
		$scope.prenda = {};
		var cache=ReportesCacheDisp.get('reportes-disp');
		$scope.changeTable = function() {
			if (!$scope.prenda || !$scope.prenda.tipoPrenda) {
				return;
			}
			var prenda = $scope.prenda.tipoPrenda;
			var sortingOrder = 'codigo';
			$scope.sortingOrder = sortingOrder;
			var prendasCodigo = ["sacos", "pantalones", "chalecos"];
			var prendasEstilo = ["sacos", "pantalones", "chalecos"];
			var prendasColor = ["sacos", "pantalones", "chalecos", "camisas", "togas", "corbatas", "gaznes", "corbatines", "monios"];
			var prendasCuello = [];
			var prendasTalla = ["sacos", "pantalones", "chalecos", "camisas", "togas", "zapatos"];
			var prendasCantidad = ["togas", "corbatas", "corbatines", "gaznes", "monios", "zapatos"];
			$scope.headers = [];
			$scope.columns = [];
			if (prendasCodigo.indexOf(prenda.name) !== -1) {
				$scope.headers.push({
					"class": "fa fa-sort",
					"text": "codigo",
					"sort_by": "codigo"
				});
				$scope.columns.push("codigo");
			}
			if (prendasEstilo.indexOf(prenda.name) !== -1) {
				$scope.headers.push({
					"class": "fa fa-sort",
					"text": "Estilo",
					"sort_by": "estilo"
				});
				$scope.columns.push("estilo_desc");
			}
			if (prendasColor.indexOf(prenda.name) !== -1) {
				$scope.headers.push({
					"class": "fa fa-sort",
					"text": "Color",
					"sort_by": "color"
				});
				$scope.columns.push("color_desc");
			}
			if (prendasCuello.indexOf(prenda.name) !== -1) {
				$scope.headers.push({
					"class": "fa fa-sort",
					"text": "Cuello",
					"sort_by": "cuello"
				});
				$scope.columns.push("cuello");
			}
			if (prendasTalla.indexOf(prenda.name) !== -1) {
				$scope.headers.push({
					"class": "fa fa-sort",
					"text": "Talla",
					"sort_by": "talla"
				});
				$scope.columns.push("talla");
			}

			if (prendasCantidad.indexOf(prenda.name) === -1) {
				$scope.headers.push(

					{
						"class": "fa fa-sort",
						"text": "Nuevos",
						"sort_by": "nuevos"
					});
				$scope.headers.push({
					"class": "fa fa-sort",
					"text": "Usados",
					"sort_by": "usados"
				});
				$scope.columns.push("nuevos");
				$scope.columns.push("usados");
			} else {
				$scope.headers.push({
					"class": "fa fa-sort",
					"text": "Cantidad",
					"sort_by": "usados"
				});
				$scope.columns.push("usados");
			}
			
			$scope.cantidad = 1;

			
			tables[prenda.name].get({
				funcion: {
					OR: [1, 3] //Renta o ambos
				},
				borrado: 0
			}, function(data) {
				$scope.items = data;
				$scope.search();
			});
		};
		TableSearch.search($scope);
		$scope.verPrenda = function(item) {
			ReportesCacheDisp.put('reportes-disp',{prenda: $scope.prenda});
			$location.path('/reportes/disponibilidad/' + item.id);
		};
		if(cache){
			$scope.prenda=cache.prenda;
			$scope.changeTable();
		}
		$scope.prendas = Prendas;

	})

;