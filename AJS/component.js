const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
angular
.module("mainApp", [])
.component(
  "component1",
  {
    controller: function($scope) {
      $scope.data = "Component1 data";
    },
    template: `<div>
    This is component1 with data: <i>{{data}}</i>
    </div>`
  }
)
.component("rates", {
  controller: ratesController,
  template: ratesTemplate
});
function ratesTemplate() { return `
  <div>
    <h2>Курсы валют</h2>
    <table><tbody>
    <tr ng-repeat="rate in rates" class="rate-{{rate.cc | lowercase}}"> 
      <td class= "number">{{$index + 1}}</td>
      <td>{{rate.cc}}</td>
      <td>{{rate.r030}}</td>
      <td>{{rate.txt}}</td>
      <td>{{rate.rate}}</td>
    </tr>
    </tbody></table>
  </div>`; // <tr ng-class="{usd: rate.txt === 'Долар США'}">
}
function ratesController($http, $scope) {
  $scope.rates = [];
  $http.get(url).then(resp => $scope.rates = resp.data);
}
angular
.module("mainApp")
.component("rate", {
  controller: function($scope, $http, $attrs) {
    $scope.currency = $attrs.currency;
    $http.get(url).then(resp => {
      $scope.rate = resp.data.filter(r => r.cc == $scope.currency)[0].rate;
    });
  },
  template: `<div>
    Currency: {{currency}}
    Rate: {{rate}}
    Img: <img ng-src="{{currency | lowercase}}.png">
  </div>`
})