// 예제 4-3 콜백 함수 예시(2-1) - Array.prototype.map
var newArr = [10, 20, 30].map(function (currentValue, index) {
    console.log(currentValue, index);
    return currentValue + 5;
  });
  console.log(newArr);