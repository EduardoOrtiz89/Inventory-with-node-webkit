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
.controller('administrarTicketsCtrl', function administrarTicketsCtrl($scope) {


})

;