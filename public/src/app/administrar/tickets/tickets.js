angular.module('ngBoilerplate.administrar_tickets', [
	'ui.router',
	'ngResource',
	'util.datepicker',
	'ui.select'
])


.config(function config($stateProvider) {
	$stateProvider.state('administrar_tickets', {
		url: '/administrar/tickets',
		views: {
			"main": {
				controller: 'administrarTicketsCtrl',
				templateUrl: 'administrar/tickets/tickets.tpl.html'
			}
		},
		data: {
			pageTitle: 'Tickets'
		}
	});
})
	.controller('administrarTicketsCtrl', function administrarTicketsCtrl($scope, $dialogs, SettingsGet,SettingsPut) {
		$scope.saveSettings = function() {
			SettingsPut.put({
				values: {
					telefono: $scope.settings.telefono,
					direccion: $scope.settings.direccion,
					footer: $scope.settings.footer,
					recargos: $scope.settings.recargos
				}
			},function(result){
         $dialogs.notify('Cambios guardados','Cambios guardados con éxito ');
      });
		};
		SettingsGet.get({keys:["telefono", "direccion","footer", "recargos"]},function(result){
      $scope.settings={};
			if(result){
				for(var i=0; i<result.length; i++){
					$scope.settings[result[i][0].key]=result[i][0].value;
				}
				}
		});

	})

;