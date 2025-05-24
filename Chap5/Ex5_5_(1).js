// 예제 5-5 클로저의 메모리 관리
// // (1) return된 함수의 클로저의 메모리 해제
var outer = function () {
    var a = 1;
    var inner = function () {
      return ++a;
    };
    return inner;
  };
  
  var outer2 = outer();
  console.log(outer2()); // 2
  console.log(outer2()); // 3
  outer2 = null; // outer2 식별자의 inner 함수 참조를 끊음