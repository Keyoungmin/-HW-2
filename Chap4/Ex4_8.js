// 예제 4-8 콜백 함수 내부의 this를 다른 값으로 바인딩하는 방법(1) - 전통적인 방식
var obj1 = {
    name: 'obj1',
    func: function () {
      var self = this; // self 변수에 this(obj1)를 할당
      return function () {
        console.log(self.name); // 내부 함수에서 self를 통해 obj1.name에 접근
      };
    }
  };
  var callback = obj1.func();
  setTimeout(callback, 1000);