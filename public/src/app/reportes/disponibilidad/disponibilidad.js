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
	.factory('ReportesCache', ['$cacheFactory',
		function($cacheFactory) {
			return $cacheFactory('reportes');
		}
	])
	.controller('reportesDisponibilidadPrendaCtrl',function($scope){

		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		/* event source that pulls from google.com */
		$scope.eventSource = {
			url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
			className: 'gcal-event', // an option!
			currentTimezone: 'America/Chicago' // an option!
		};
		/* event source that contains custom events on the scope */
		$scope.events = [{
			title: 'All Day Event',
			start: new Date(y, m, 1)
		}, {
			title: 'Long Event',
			start: new Date(y, m, d - 5),
			end: new Date(y, m, d - 2)
		}, {
			id: 999,
			title: 'Repeating Event',
			start: new Date(y, m, d - 3, 16, 0),
			allDay: false
		}, {
			id: 999,
			title: 'Repeating Event',
			start: new Date(y, m, d + 4, 16, 0),
			allDay: false
		}, {
			title: 'Birthday Party',
			start: new Date(y, m, d + 1, 19, 0),
			end: new Date(y, m, d + 1, 22, 30),
			allDay: false
		}, {
			title: 'Click for Google',
			start: new Date(y, m, 28),
			end: new Date(y, m, 29),
			url: 'http://google.com/'
		}];
		/* event source that calls a function on every view switch */
		$scope.eventsF = function(start, end, callback) {
			var s = new Date(start).getTime() / 1000;
			var e = new Date(end).getTime() / 1000;
			var m = new Date(start).getMonth();
			var events = [{
				title: 'Feed Me ' + m,
				start: s + (50000),
				end: s + (100000),
				allDay: false,
				className: ['customFeed']
			}];
			callback(events);
		};

		$scope.calEventsExt = {
			color: '#f00',
			textColor: 'yellow',
			events: [{
				type: 'party',
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			}, {
				type: 'party',
				title: 'Lunch 2',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				allDay: false
			}, {
				type: 'party',
				title: 'Click for Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				url: 'http://google.com/'
			}]
		};
		/* alert on eventClick */
		$scope.alertEventOnClick = function(date, allDay, jsEvent, view) {
			$scope.alertMessage = ('Day Clicked ' + date);
		};
		/* alert on Drop */
		$scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
			$scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
		};
		/* alert on Resize */
		$scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
			$scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
		};
		/* add and removes an event source of choice */
		$scope.addRemoveEventSource = function(sources, source) {
			var canAdd = 0;
			angular.forEach(sources, function(value, key) {
				if (sources[key] === source) {
					sources.splice(key, 1);
					canAdd = 1;
				}
			});
			if (canAdd === 0) {
				sources.push(source);
			}
		};
		/* add custom event*/
		$scope.addEvent = function() {
			$scope.events.push({
				title: 'Open Sesame',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				className: ['openSesame']
			});
		};
		/* remove event */
		$scope.remove = function(index) {
			$scope.events.splice(index, 1);
		};
		/* Change View */
		$scope.changeView = function(view, calendar) {
			calendar.fullCalendar('changeView', view);
		};
		/* Change View */
		$scope.renderCalender = function(calendar) {
			calendar.fullCalendar('render');
		};
		/* config object */
		$scope.uiConfig = {
			calendar: {
				height: 450,
				editable: true,
				header: {
					left: 'title',
					center: '',
					right: 'today prev,next'
				},
				dayClick: $scope.alertEventOnClick,
				eventDrop: $scope.alertOnDrop,
				eventResize: $scope.alertOnResize
			}
		};
		/* event sources array*/
		$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
		$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];




	})
	.controller('reportesDisponibilidadCtrl', function reportesDisponibilidadCtrl($scope,tables,TableSearch,DatePicker, Reportes, Dates, $location, ReportesCache, Prendas) {
		$scope.prenda={};
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
			var getDescription = function(item) {
				var desc = prenda.description;

				if (prendasCodigo.indexOf(prenda.name) !== -1) {
					desc += " " + item.codigo;
				}
				if (prendasEstilo.indexOf(prenda.name) !== -1) {
					desc += " estilo " + item.estilo_desc;
				}
				if (prendasColor.indexOf(prenda.name) !== -1) {
					desc += " c. " + item.color_desc;
				}
				if (prendasCuello.indexOf(prenda.name) !== -1) {
					desc += " cuello " + item.cuello;
				}
				if (prendasTalla.indexOf(prenda.name) !== -1) {
					desc += " t. " + item.talla;
				}
				return desc;
			};
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
			$scope.headers.push({
				"class": "fa fa-sort",
				"text": "Disponibles",
				"sort_by": "disponibles"
			});
			$scope.cantidad = 1;

			$scope.columns.push("disponibles");
			tables[prenda.name].get({
				funcion: {
					OR: [1, 3]
				},
				borrado: 0
			}, function(data) {
				$scope.items = data;
				$scope.search();
				articulos.forEach(function(art) {
					if (prenda.name === art.prenda) {
						data.forEach(function(item) {
							if (item.id === art.id) {
								item.disponibles = item.disponibles - art.cantidadElegida;
							}
						});
					}
				});
			});
		};
		TableSearch.search($scope);

		$scope.prendas = Prendas;

	})

;