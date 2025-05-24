// 예제 4-8 
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

  
  // 예제 4-10 func 함수 재활용
  var obj2 = {
    name: "obj2",
    func: obj1.func
  };
  var callback2 = obj2.func();
  setTimeout(callback2, 1500);
  
  var obj3 = { name: "obj3" };
  var callback3 = obj1.func.call(obj3);
  setTimeout(callback3, 2000);