// 예제 4-17 비동기 작업의 동기적 표현(4) - Promise + Async/await
var addCoffee = function (name) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(name);
      }, 500);
    });
  };
  var coffeeMaker = async function () {
    var coffeeList = '';
    var _addCoffee = async function (name) {
      coffeeList += (coffeeList ? ',' : '') + await addCoffee(name);
      console.log(coffeeList); // _addCoffee 내부에서 출력
    };
    await _addCoffee('에스프레소');
    console.log(coffeeList); // coffeeMaker 내부에서 출력
    await _addCoffee('아메리카노');
    console.log(coffeeList); // coffeeMaker 내부에서 출력
    await _addCoffee('카페모카');
    console.log(coffeeList); // coffeeMaker 내부에서 출력
    await _addCoffee('카페라떼');
    console.log(coffeeList); // coffeeMaker 내부에서 출력
  };
  coffeeMaker();