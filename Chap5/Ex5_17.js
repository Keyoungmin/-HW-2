// 예제 5-17 커링 함수(1)
var curry3 = function (func) {
    return function (a) {
      return function (b) {
        return func(a, b);
      };
    };
  };
  
  var getMaxWith10 = curry3(Math.max)(10);
  console.log(getMaxWith10(5));    // 10
  console.log(getMaxWith10(25));   // 25