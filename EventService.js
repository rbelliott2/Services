app.service('EventService', ['$rootScope',function($rootScope){
   this.broadcast = function(name,data) {
      if (angular.isObject(data.scope) && typeof data.scope.$broadcast === 'function') {
         data.scope.$broadcast(name,data);
      }
      else {
         $rootScope.$broadcast(name,data);
      }
   };
   this.emit = function(name,data) {
      if (angular.isObject(data.scope) && typeof data.scope.$emit === 'function') {
         data.scope.$emit(name,data);
      }
      else {
         $rootScope.$emit(name,data);
      }
   };
}]);

