// 예제 5-18 커링 함수(2)
var curry5 = function (func) { 
    return function (a) {
      return function (b) {
        return function (c) {
          return function (d) {
            return function (e) {
              return func(a, b, c, d, e);
            };
          };
        };
      };
    };
  };
  var getMax = curry5(Math.max);
  console.log(getMax(1)(2)(3)(4)(5));