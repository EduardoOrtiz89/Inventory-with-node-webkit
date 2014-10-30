/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.login', [
  'ui.router',
  'ngResource',
  'ngCookies'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'loginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'login' }
  });
})
.factory('LoginDB', function($resource) {
    return $resource('/login/',
         {username:"@username", password:'@password'},
         {
            doLogin: {method: 'POST'}
         }
    );
  })
.controller( 'loginCtrl',["$scope","LoginDB","$cookies","$location", function loginController( $scope,LoginDB,$cookies,$location ) {
	if($cookies.access){
		$location.path("/rentas");
	}
	$scope.login=function(){
		LoginDB.doLogin({username: $scope.user.username,password: $scope.user.password},function(data){
			if(data.nombre){
				$cookies.access=data.tipo_usuario;
				$location.path("/rentas");
			}else{
				$scope.message="Usuario/Contraseña no coinciden";
			}
		});
	};
}])

;

