angular
.module("mainApp", [])
.directive(
  "directive1",
  function() {
    return {
      template: "<b>Я директива 1</b>",
      restrict: "A" //Атрибут
    }
  }
)
.directive(
  "directive2",
  function() {
    return {
      scope: {},
      controller: function($scope) {
        $scope.data = "Данные директивы 2"
      },
      template: "<i>Я директива 2 с данными: {{data}}</i>",
      restrict: "C" //Стилевой класс
    }
  }
)
.directive(
  "directive3",
  function() {
    return {

      restrict: "E", //Тег
      replace: true,
      scope: {},
      template: `<div class="border">
        <p>{{data}}</p>
        <button ng-click = "addExclamation()">ADD</button>
        </div>`,
        controller: function($scope) {
          $scope.data = "Hellow, world";
          $scope.addExclamation = () => $scope.data += "!";
        }
    }
  }
)
.directive(
  "directive4",
  function() {
    return {
      template: "<b>Я директива 4</b>",
      restrict: "A" //Атрибут
    }
  }
)
.directive(
  "calc",
  function() {
    return {

      restrict: "E", //Тег
      replace: true,
      scope: {},
      template: `<div>
        <button ng-click = "dec()">--</button>
        <b>{{num}}</b>
        <button ng-click = "inc()">++</button>
        </div>`,
        controller: function($scope) {
          $scope.dec = () => $scope.num = Number($scope.num) - Number($scope.step);
          $scope.inc = () => $scope.num = Number($scope.num) + Number($scope.step);
        },
        link: function(scope, element, attr){
          scope.num = attr.initial;
          scope.step = attr.step;
        }
    }
  }
)
