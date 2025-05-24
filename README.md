# -HW-2
코어 자바스크립트 예제 풀이입니다

## Chapter 4
---
#### Ex 4-1
- setInterval을 이용한 함수의 주기적 실행과 clearInterval을 이용한 중단 방법을 시연함

- count 변수를 0으로 초기화함

- setInterval을 사용하여 300ms 간격으로 익명 함수를 반복 실행하고, 이 인터벌의 ID를 timer 변수에 저장함

- 익명 함수는 실행될 때마다 count 값을 콘솔에 출력하고, count를 1 증가시킴

- count 값이 4를 초과하는 조건이 만족되면 clearInterval 함수로 timer로 식별되는 인터벌을 중지함

```
// 예제 4-1 콜백 함수 내부에서의 this setInterval
var count = 0;
var timer = setInterval(function () {
  console.log(count);
  if (++count > 4) clearInterval(timer);
}, 300);

```


#### Ex 4-2
- 콜백 함수를 setInterval과 같은 다른 함수에 전달하여 실행 제어권을 넘기는 과정을 설명함

- setInterval은 인자로 전달받은 cbFunc 함수를 300ms마다 주기적으로 실행함

- cbFunc 함수 내부에서는 count 값을 출력 및 증가시키고, count가 4를 초과하면 clearInterval을 호출하여 timer로 지정된 인터벌을 중단시킴

- 이를 통해 명명된 함수(cbFunc)를 콜백으로 사용하는 예를 보여줌

```
// 예제 4-2 콜백 함수 내부에서의 this setInterval
var count = 0;
var cbFunc = function () {
  console.log(count);
  if (++count > 4) clearInterval(timer);
};
var timer = setInterval(cbFunc, 300);
```

```
// 실행 결과
0
1
2
3
4
```

#### Ex 4-3

- map 메서드는 배열 [10, 20, 30]의 각 요소에 대해 콜백 함수를 한 번씩 호출함

- 호출 시, 콜백 함수는 첫 번째 인자로 현재 처리 중인 요소(currentValue), 두 번째 인자로 해당 요소의 인덱스(index)를 전달받음

- 콜백 함수는 currentValue에 5를 더한 값을 반환하며, map 메서드는 이러한 반환 값들로 구성된 새로운 배열 [15, 25, 35]를 newArr에 할당함

- 최종적으로 원본 배열과, 콜백 함수 실행 중의 currentValue, index 및 변환된 newArr이 출력됨

```
// 예제 4-3 콜백 함수 예시(2-1) - Array.prototype.map
var newArr = [10, 20, 30].map(function (currentValue, index) {
    console.log(currentValue, index);
    return currentValue + 5;
  });
  console.log(newArr);
```

```
// 실행 결과
10 0
20 1
30 2
[ 15, 25, 35 ]
```

#### Ex 4-4
- Array.prototype.map이 콜백 함수를 호출할 때, 콜백 함수에 정의된 매개변수 이름(idx, currVal)과 관계없이 항상 정해진 순서(첫 번째 인자: 현재 요소 값, 두 번째 인자: 인덱스)로 값을 전달하는 방식을 설명함

- 이 예제에서 map 메서드의 콜백 함수는 idx와 currVal이라는 두 개의 매개변수를 가짐

- map 메서드의 규칙에 따라, idx 매개변수에는 배열의 현재 요소 값이 할당되고, currVal 매개변수에는 해당 요소의 인덱스가 할당됨

- console.log(idx, currVal) 라인은 각 반복에서 idx(현재 값)와 currVal(인덱스)에 실제로 어떤 값이 전달되었는지 보여줌

- 콜백 함수는 currVal + 5 (즉, 인덱스 + 5)를 반환하며, 이 반환된 값들이 모여 새로운 배열 newArr2를 형성함

```
// 예제 4-4 콜백 함수 예제 (2-2) - Array.prototype.map - 인자의 순서를 임의로 바꾸어 사용한 경우
var newArr2 = [10, 20, 30].map(function (idx, currVal) {
    console.log(idx, currVal);
    return currVal + 5;
  });
  console.log(newArr2);
```

```
// 실행 결과
10 0
20 1
30 2
[ 5, 6, 7 ]
```

#### Ex 4-5
- 첫 번째 인자로 전달받은 callback과 두 번째 인자로 전달받은 thisArg를 사용함 

- 콜백 함수를 호출할 때는 세 가지 인자, 즉 배열의 현재 요소(this[i]), 현재 인덱스(i), 그리고 배열 자기 자신(this)을 전달함

- 각 콜백 호출의 반환 값을 모아 새로운 배열(mappedArr)을 만들어 반환함

```
// 예제 4-5 콜백 함수 예제 (2-3) - Array.prototype.map - 구현
Array.prototype.map = function (callback, thisArg) {
    var mappedArr = [];
    for (var i = 0; i < this.length; i++) {
      var mappedValue = callback.call(thisArg || window, this[i], i, this);
      mappedArr.push(mappedValue);
    }
    return mappedArr;
  };
```

#### Ex 4-6
- 다양한 비동기 및 콜백 상황(setTimeout, 배열의 forEach, addEventListener)에서 콜백 함수 내부의 this가 각각 무엇을 참조하는지 보여줌

- setTimeout에 전달된 콜백 함수: 내부에서 this를 별도로 지정하지 않으므로, 콜백 함수 내의 this는 전역 객체(Window)를 참조함

- 배열의 forEach 메서드에 전달된 콜백 함수: forEach 호출 시 this로 사용될 객체를 전달하지 않으면, 콜백 함수 내의 this는 전역 객체(Window)를 참조함


```
// 예제 4-6 콜백 함수 내부에서의 this
setTimeout(function () { console.log(this); }, 300);

[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this);
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a')
  .addEventListener('click', function (e) {
    console.log(this, e);
  });
```

- 코드 실행 결과
![image](https://github.com/user-attachments/assets/c22c94d1-316a-45d9-af40-f740325eafc7)



#### Ex 4-7

- 객체의 메서드도 콜백 함수로 전달될 수 있으며, 이 경우 함수 내부의 this는 함수가 어떻게 호출되느냐에 따라 결정됨을 설명함

- obj.logValues(1, 2): logValues 함수를 obj의 메서드로서 호출했기 때문에, 함수 내의 this는 obj 객체를 참조함

- [4, 5, 6].forEach(obj.logValues): obj.logValues 함수 자체를 forEach의 콜백으로 전달함. forEach는 이 콜백을 호출할 때 별도의 thisArg를 지정하지 않았으므로, logValues 함수 내의 this는 (비엄격 모드에서) 전역 객체 (Window)를 참조하게 됨 (엄격 모드에서는 undefined)

```
// 예제 4-7 메서드를 콜백 함수로 전달한 경우
var obj = {
    vals: [1, 2, 3],
    logValues: function(v, i) {
      console.log(this, v, i);
    }
  };
  obj.logValues(1, 2);
  [4, 5, 6].forEach(obj.logValues);d
```

```
// 실행 결과
{ vals: [ 1, 2, 3 ], logValues: [Function: logValues] } 1 2
...
}4 0

<ref *1> Object [global] {
...
} 5 1

<ref *1> Object [global] {
...
} 6 2
```

#### Ex 4-8
- 클로저를 이용하여 콜백으로 사용될 함수 내부에서 외부 함수의 this 값을 참조하는 전통적인 방법

- obj1.func가 호출될 때, 그 안의 this를 self라는 변수에 할당함

- obj1.func는 내부 함수를 반환하는데, 이 내부 함수는 자신이 선언될 때의 환경을 기억하므로 self 변수에 접근할 수 있음

- 반환된 내부 함수가 setTimeout의 콜백으로 실행될 때, self를 통해 원래의 obj1 객체의 name 속성에 접근하여 'obj1'을 출력함

```
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
```

```
//실행 결과
obj1
```


#### Ex 4-9

- 콜백 함수 내부에서 this를 사용하는 대신, 참조하고자 하는 객체의 이름을 직접 사용하여 해당 객체의 속성에 접근하는 방법을 보여줌

- obj1.func 함수 내에서 this.name 대신 obj1.name과 같이 객체 변수 obj1을 직접 참조하여 name 속성을 사용함

- 이 obj1.func 함수가 setTimeout의 콜백으로 실행될 때, obj1이라는 식별자를 통해 외부 스코프에 있는 obj1 객체에 직접 접근하여 그 name 속성인 'obj1'을 출력함

- 이 방법은 this 바인딩의 복잡성을 피할 수 있지만, 코드가 특정 변수명에 강하게 결합되어 유연성이 저하될 수 있음

```
// 예제 4-9 콜백 함수 내부의 this를 사용하지 않은 경우
var obj1 = {
  name: 'obj1',
  func: function () {
    console.log(obj1.name); // this 대신 obj1을 직접 참조
  }
};
setTimeout(obj1.func, 1000);
```

```
//실행 결과
obj1
```

#### Ex 4-10
- Ex 4-8을 다른 객체(obj2, obj3)의 컨텍스트에서 재활용하려 할 때의 동작을 보여줌

- obj1.func를 obj2의 func 메서드로 할당하고 obj2.func()를 호출하여 콜백 함수을 callback2에 저장함

- 또한, obj1.func를 obj3을 this로 하여 호출(obj1.func.call(obj3))하고 그 반환값(콜백 함수)을 callback3에 저장함

```
... (예제 4-8)

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
```

```
//실행 결과
obj1
obj2
obj3
```


#### Ex 4-11
- Function.prototype.bind 메서드를 사용하여 콜백 함수 내부의 this 값을 원하는 객체로 명시적으로 바인딩하는 방법

- obj1.func는 this.name을 출력하는 함수임

- setTimeout(obj1.func.bind(obj1), 1000): obj1.func의 this를 obj1으로 바인딩한 새로운 함수를 생성하여 setTimeout에 전달함. 1초 후, 콜백이 실행되면 this는 obj1을 참조하여 'obj1'을 출력함
- 
- setTimeout(obj1.func.bind(obj2), 1500): obj1.func의 this를 obj2로 바인딩한 새로운 함수를 생성하여 setTimeout에 전달함. 1.5초 후, 콜백이 실행되면 this는 obj2를 참조하여 'obj2'를 출력함

```
// 예제 4-11 콜백 함수 내부의 this를 다른 값으로 바인딩하는 방법(2) - bind 메서드 활용
var obj1 = {
    name: "obj1",
    func: function () {
      console.log(this.name);
    }
  };
  setTimeout(obj1.func.bind(obj1), 1000);
  
  var obj2 = { name: "obj2" };
  setTimeout(obj1.func.bind(obj2), 1500);
```

```
//실행 결과
obj1
obj2
```

#### Ex 4-12
- 비동기 작업을 순차적으로 처리하기 위해 콜백 함수를 반복적으로 중첩 사용하여 발생하는 "콜백 지옥"의 전형적인 예시를 보여줌
  
- setTimeout 함수가 연쇄적으로 호출되며, 각 콜백 함수는 커피 이름을 coffeeList 문자열에 누적하고 현재까지의 목록을 콘솔에 출력함

- 첫 번째 setTimeout은 '에스프레소'를, 다음은 '아메리카노', 그 다음은 '카페라떼', 마지막으로 '카페모카'를 0.5초 간격으로 순차적으로 추가하고 출력함

- 콜백 함수가 계속 중첩되면서 코드의 들여쓰기가 깊어지고, 이로 인해 코드의 흐름을 파악하기 어렵고 가독성이 저하되는 문제점을 나타냄


```
// 예제 4-12 콜백 지옥 예시(1-1)
setTimeout(function (name) {
    var coffeeList = name;
    console.log(coffeeList);
  
    setTimeout(function (name) {
      coffeeList += ', ' + name;
      console.log(coffeeList);
  
      setTimeout(function (name) {
        coffeeList += ', ' + name;
        console.log(coffeeList);
  
        setTimeout(function (name) {
          coffeeList += ', ' + name;
          console.log(coffeeList);
        }, 500, '카페라떼');
      }, 500, '카페모카카');
    }, 500, '아메리카노');
  }, 500, '에스프레소');
```

```
//실행 결과
에스프레소
에스프레소, 아메리카노
에스프레소, 아메리카노, 카페라떼
에스프레소, 아메리카노, 카페라떼, 카페모카
```

#### Ex 4-13
- 예제 4-12에서 나타난 콜백 지옥 문제를 해결하기 위해, 중첩된 익명 콜백 함수들을 각각의 독립적인 기명 함수로 분리하여 코드의 가독성을 향상시키는 방법을 제시함

- 커피를 추가하고 다음 커피 추가 함수를 호출하는 로직을 addEspresso, addAmericano, addMocha, addLatte라는 네 개의 개별 함수로 정의함

- 각 함수는 자신의 로직을 수행한 후, 다음 순서의 함수를 setTimeout을 이용해 0.5초 뒤에 호출함

- 이처럼 함수를 분리함으로써 코드의 들여쓰기 수준이 낮아지고 각 함수의 역할이 명확해져 전체적인 코드 구조가 더 평탄하고 이해하기 쉬워짐


```
// 예제 4-13 콜백 지옥 해결 - 기명함수로 변환
var coffeeList = '';

var addEspresso = function (name) {
  coffeeList = name;
  console.log(coffeeList);
  setTimeout(addAmericano, 500, '아메리카노');
};

var addAmericano = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList);
  setTimeout(addMocha, 500, '카페모카');
};

var addMocha = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList);
  setTimeout(addLatte, 500, '카페라떼');
};

var addLatte = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList);
};

setTimeout(addEspresso, 500, '에스프레소');
```

```
//실행 결과
에스프레소
에스프레소, 아메리카노
에스프레소, 아메리카노, 카페모카
에스프레소, 아메리카노, 카페모카, 카페라떼
```

