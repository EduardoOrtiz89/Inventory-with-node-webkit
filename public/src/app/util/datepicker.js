angular.module( 'util.datepicker', [
])
.factory("DatePicker",function(){
  return { init: function($scope)
{
    $scope.open = function($event, opened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope[opened] = true;
  };
  $scope.initDate = new Date();
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
  $scope.format = $scope.formats[2];
  $scope.minDate = new Date();
  $scope.clear = function() {
    $scope.dt = null;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  }
  };
}).run();


