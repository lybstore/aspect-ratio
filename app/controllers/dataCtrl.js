"use strict";

var app = angular.module('nApp');

app.service("dataService", function ($http, $q){
    var deferred = $q.defer();
    $http.get('app/data/data.json').then(function (response){
        deferred.resolve(response.data);
    });

    this.getcolors = function () {
        return deferred.promise;
    };
})

angular
.module('nApp')
.controller('dataCtrl', ['$scope', 'dataService', '$location', '$sce', function($scope, dataService, $location, $sce) {

  var promise = dataService.getcolors();
  promise.then(function (data){
      $scope.colors = data.colors;
  });

  $scope.currentMessage = "";

  $scope.popupBtn = function (message) {

    $scope.currentMessage = $sce.trustAsHtml(message);

    if (!($scope.popupBlock)) {
      $scope.popupBlock = true;
    }
  }

  $scope.closeBtn = function () {
    $scope.popupBlock = false;
  }

}])
