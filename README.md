# -HW-2
코어 자바스크립트 예제 풀이입니다

## Chapter 4
---
### Ex 4-1
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


### Ex 4-2
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

### Ex 4-3

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

### Ex 4-4
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

### Ex 4-5
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

### Ex 4-6
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



### Ex 4-7

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

### Ex 4-8
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


### Ex 4-9

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

### Ex 4-10
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


### Ex 4-11
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

### Ex 4-12
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

### Ex 4-13
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

### Ex 4-14
- Promise를 사용하여 예제 4-12와 같은 콜백 지옥 형태의 비동기 코드를 보다 동기적인 흐름으로 표현하는 방법

- 각 커피를 추가하는 비동기 작업(setTimeout으로 0.5초 지연)을 별도의 Promise 객체로 감쌈

- Promise 내부의 비동기 작업이 완료되면 resolve(name)을 호출하여 다음 처리 단계로 결과(name)를 전달함

- .then() 메서드를 체인 형태로 연결하여, 이전 Promise가 성공적으로 resolve되면 다음 Promise 로직이 순차적으로 실행됨 

- 이를 통해 깊은 들여쓰기 없이 비동기 작업들의 순서를 명확하게 표현하여 코드의 가독성과 관리 용이성을 높임


```
// 예제 4-14 비동기 작업의 동기적 표현(1) - Promise(1)
new Promise(function (resolve) {
    setTimeout(function () {
      var name = '에스프레소';
      console.log(name);
      resolve(name);
    }, 500);
  }).then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ', 아메리카노';
        console.log(name);
        resolve(name);
      }, 500);
    });
  }).then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ', 카페모카';
        console.log(name);
        resolve(name);
      }, 500);
    });
  }).then(function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var name = prevName + ', 카페라떼';
        console.log(name);
        resolve(name);
      }, 500);
    });
  });
```

```
//실행 결과
에스프레소
에스프레소, 아메리카노
에스프레소, 아메리카노, 카페모카
에스프레소, 아메리카노, 카페모카, 카페라떼
```


### Ex 4-15
- 예제 4-14에서 Promise 체인을 구성할 때 반복적으로 사용된 로직을 addCoffee라는 고차 함수로 분리하여 코드를 더 간결하게 만드는 방법

- addCoffee(name) 함수는 prevName을 인자로 받아 새로운 Promise를 반환하는 함수를 리턴함

- 이 반환된 함수는 실행될 때, prevName에 현재 커피 name을 추가하여 coffeeList를 만들고, 0.5초 후 이 새 목록으로 resolve되는 Promise를 생성함

- .then() 체인에서는 addCoffee('커피이름') 형태로 호출하여 각 단계를 실행하며, 이를 통해 코드의 중복을 줄이고 가독성을 향상시킴


```
// 예제 4-15 비동기 작업의 동기적 표현(2) - Promise(2)
var addCoffee = function (name) {
    return function (prevName) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var newName = (prevName ? prevName + ', ' : '') + name;
          console.log(newName);
          resolve(newName);
        }, 500);
      });
    };
  };
  
  addCoffee('에스프레소')()
    .then(addCoffee('아메리카노'))
    .then(addCoffee('카페모카'))
    .then(addCoffee('카페라떼'));
```

```
//실행 결과
에스프레소
에스프레소, 아메리카노
에스프레소, 아메리카노, 카페모카
에스프레소, 아메리카노, 카페모카, 카페라떼
```

### Ex 4-16
- Generator를 사용하여 비동기적인 커피 추가 작업을 동기적인 코드처럼 보이도록 작성하는 방법

- coffeeGenerator는 *가 붙은 제너레이터 함수로, yield 키워드를 사용하여 각 addCoffee 비동기 작업 지점에서 함수의 실행을 일시 중단함

- addCoffee 함수는 0.5초의 setTimeout 비동기 작업이 완료된 후, 제너레이터의 coffeeMaker.next(value)를 호출하여 제너레이터 함수의 실행을 재개시키고 결과 값을 전달함

- coffeeMaker = coffeeGenerator()로 제너레이터 객체를 생성하고, coffeeMaker.next()를 최초 호출하여 실행을 시작함

- 이후 각 addCoffee의 콜백에서 coffeeMaker.next()가 호출됨에 따라, coffeeGenerator 내부의 코드가 yield 문을 기준으로 위에서 아래로 순차적으로 실행되는 것처럼 동작함


```
// 예제 4-16 비동기 작업의 동기적 표현(3) - Generator
var addCoffee = function (prevName, name) {
    setTimeout(function () {
      coffeeMaker.next((prevName ? prevName + ', ' : '') + name);
    }, 500);
  };
  var coffeeGenerator = function* () {
    var espresso = yield addCoffee('', '에스프레소');
    console.log(espresso);
    var americano = yield addCoffee(espresso, '아메리카노');
    console.log(americano);
    var mocha = yield addCoffee(americano, '카페모카');
    console.log(mocha);
    var latte = yield addCoffee(mocha, '카페라떼');
    console.log(latte);
  };
  var coffeeMaker = coffeeGenerator();
  coffeeMaker.next();
```

```
//실행 결과
에스프레소
에스프레소, 아메리카노
에스프레소, 아메리카노, 카페모카
에스프레소, 아메리카노, 카페모카, 카페라떼
```

### Ex 4-17
- async/await 구문을 Promise와 함께 사용하여 비동기적인 커피 추가 작업을 동기적인 코드 흐름처럼 작성하는 방법

- addCoffee(name) 함수는 0.5초 후 전달받은 name으로 resolve되는 Promise를 반환함

- async 함수인 coffeeMaker는 비동기 작업의 전체 흐름을 관리하며, 내부 async 함수인 _addCoffee(name)를 순차적으로 호출함

_addCoffee 함수는 await addCoffee(name)을 통해 addCoffee Promise가 완료될 때까지 실행을 기다림. 완료 후, coffeeList 문자열에 새로운 커피 이름을 추가하고, 업데이트된 coffeeList를 즉시 콘솔에 출력함

- coffeeMaker 함수는 각 await _addCoffee(...) 호출이 완료된 후, coffeeList의 현재 상태를 추가적으로 콘솔에 한 번 더 출력함. 이로 인해 각 커피가 추가될 때마다 최종 리스트가 두 번씩 (한 번은 _addCoffee 내부에서, 한 번은 coffeeMaker 내부에서) 출력되는 패턴을 보임

- await를 사용함으로써 비동기 작업들이 마치 동기적인 코드처럼 순서대로 실행되는 것처럼 보여 가독성을 크게 향상시킴


```
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
```

```
//실행 결과
에스프레소
에스프레소
에스프레소,아메리카노
에스프레소,아메리카노
에스프레소,아메리카노,카페모카
에스프레소,아메리카노,카페모카
에스프레소,아메리카노,카페모카,카페라떼
에스프레소,아메리카노,카페모카,카페라떼
```



## Chapter 5
---

### Ex 5-1
- 내부 함수가 외부 함수의 스코프에 있는 변수에 접근하는 일반적인 동작을 설명함


```
//예제 5-1 외부 함수의 변수를 참조하는 내부 함수(1)
var outer = function () {
    var a = 1;
    var inner = function () {
        console.log(a);
    };
    inner();
};
outer();
```

```
//실행 결과
1
```

### Ex 5-2
- 내부 함수가 외부 함수의 변수를 참조하고 그 값을 변경할 수 있음을 보여줌
  
- 외부 함수가 내부 함수의 실행 결과를 반환하는 경우를 설명함

```
// 예제 5-2 외부 함수의 변수를 참조하는 내부 함수(2)
var outer = function () {
    var a = 1;
    var inner = function () {
        return ++a;
    };
    return inner();
};
var outer2 = outer();
console.log(outer2); // 2
```

```
//실행 결과
2
```

### Ex 5-3
- 외부 함수의 실행 컨텍스트가 종료된 후에도 호출 가능한 클로저를 만드는 방법을 보여줌

- 외부 함수가 내부 함수 자체를 반환하여, 반환된 함수가 원래의 외부 스코프에 계속 접근할 수 있음을 설명함

```
// 예제 5-3 외부 함수의 변수를 참조하는 내부 함수(3)
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
```

```
//실행 결과
2
3
```

### Ex 5-4
**(1) setInterval/setTimeout**

- setInterval 또는 setTimeout에 전달된 콜백 함수가 클로저를 형성하는 사례를 보여줌

- 비동기 작업에서 외부 함수의 변수를 참조하며 상태를 유지하는 클로저의 활용을 설명함


```
// (1) setInterval/setTimeout
(function () {
    var a = 0;
    var intervalId = null;
    var inner = function () {
        if (++a >= 10) {
            clearInterval(intervalId);
        }
        console.log(a);
    };
    intervalId = setInterval(inner, 1000);
})();



```

```
//실행 결과
1
2
3
4
5
6
7
8
9
10
```

**(2) eventListener**

- DOM 이벤트 리스너에 등록된 콜백 함수가 클로저를 형성하는 사례를 보여줌
  
- 이벤트 핸들러가 외부 함수의 변수를 참조하여 상태(클릭 횟수)를 유지하는 방법을 설명함
  
```
// (2) eventListener
(function () {
    var count = 0;
    var button = document.createElement('button');
    button.innerText = 'click';

    button.addEventListener('click', function () {
        console.log(++count, 'times clicked');
    });
    document.body.appendChild(button);
})();
```


//실행 결과
![image](https://github.com/user-attachments/assets/1b792c35-1e13-4d52-bc85-878b504a79e8)



### Ex 5-5

**(1) return에 의한 클로저의 메모리 해제**

- `return`된 함수의 클로저의 메모리 관리 방법을 보여줌
  
- 외부 함수의 변수를 참조하는 내부 함수(클로저)가 반환된 후, 더 이상 해당 클로저가 필요 없을 때 참조를 명시적으로 해제(`null` 할당)하여 가비지 컬렉터가 메모리를 회수할 수 있도록 유도함
  
```
// (1) return된 함수의 클로저의 메모리 해제
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
```

```
//실행 결과
2
3
```

**(2) setInterval에 의한 클로저의 메모리 해제**

- setInterval의 콜백 함수로 클로저가 사용될 때, 특정 조건이 충족되면 clearInterval을 호출하여 인터벌을 중지함
  
- 더 나아가 콜백 함수 자체에 대한 참조도 null로 만들어, 클로저와 관련된 메모리가 해제될 수 있도록 함

```
// (2) setInterval에 의한 클로저의 메모리 해제
(function () {
    var a = 0;
    var intervalId = null;
    var inner = function () {
      if (++a >= 10) {
        clearInterval(intervalId);
        inner = null; // inner 식별자의 함수 참조를 끊음
      }
      console.log(a);
    };
    intervalId = setInterval(inner, 1000);
  })();
```

```
//실행 결과
1
```
**(3) eventListener에 의한 클로저의 메모리 해제**

- DOM 요소의 이벤트 리스너로 클로저가 사용될 때, 특정 조건(예: 버튼 클릭 횟수)이 충족되면 removeEventListener를 사용하여 이벤트 리스너를 제거함
  
- 또한, 이벤트 핸들러 함수 자체의 참조도 null로 할당하여 클로저 관련 메모리가 해제되도록 함

- 이벤트 리스너로 인한 메모리 누수를 방지하고, 더 이상 필요 없는 리소스의 참조를 정리하는 방법을 설명함


```
// (3) eventListener에 의한 클로저의 메모리 해제
(function () {
    var count = 0;
    var button = document.createElement('button');
    button.innerText = 'click';
  
    var clickHandler = function () {
      console.log(++count, 'times clicked');
      if (count >= 5) { // 5번 클릭되면
        button.removeEventListener('click', clickHandler);
        clickHandler = null; // clickHandler 식별자의 함수 참조를 끊음
      }
    };
    button.addEventListener('click', clickHandler);
    document.body.appendChild(button);
  })();
```


//실행 결과
![image](https://github.com/user-attachments/assets/32a44e8f-4d58-4c25-aa90-ec2f461ef9b7)


### Ex 5-6

- 콜백 함수가 외부 스코프 변수를 참조할 때, 반복문이 종료된 후 실행되면 변수의 최종 값만 참조하는 문제를 보여줌
  
- forEach의 콜백 함수 내 이벤트 리스너가 fruit 변수를 참조할 때, 의도와 다르게 동작할 수 있는 가능성을 제시함

```
// 예제 5-6 콜백 함수와 클로저 (1)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

fruits.forEach(function (fruit) { // (A)
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', function () { // (B)
        alert('your choice is ' + fruit);
    });
    $ul.appendChild($li);
});
document.body.appendChild($ul);
```


//실행 결과
![image](https://github.com/user-attachments/assets/5c2e83ab-5a4b-425c-9b39-76280e81282c)
책의 설명에 따르면 어떤 버튼을 클릭해도 'peach'가 떠야 하지만, 이 코드는 정상 동작하여 각 과일 이름이 올바르게 alert됨

### Ex 5-7

- 즉시실행함수를 사용하여 콜백 함수 내부에서 반복 변수의 특정 시점 값을 유지하는 방법을 보여줌
  
- 각각의 이벤트 리스너가 자신만의 독립된 스코프를 가지도록 하여 클로저 문제를 해결

```
// 예제 5-7 콜백 함수와 클로저 (2)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', (function (f) { // (B) 즉시실행함수
        return function () { // (C)
            alert('your choice is ' + f);
        };
    })(fruit)); // (A) fruit 값을 인자로 전달
    $ul.appendChild($li);
});
document.body.appendChild($ul);
```


//실행 결과
![image](https://github.com/user-attachments/assets/4be18f1e-c406-4dfa-94c0-401f03f41c4a)


### Ex 5-8

- Function.prototype.bind 메서드를 사용하여 콜백 함수에 인자를 전달하고 this 값을 바인딩하는 방법을 보여줌
- 클로저 문제 해결 및 콜백 함수 컨텍스트 관리를 위한 bind의 활용법을 설명함

```
// 예제 5-8 콜백 함수와 클로저 (3)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

var alertFruit = function (fruit) {
    alert('your choice is ' + fruit);
};
fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    // this는 원래 $li지만, 첫번째 인자가 null이므로 그냥 전역객체를 바라보게 됨.
    $li.addEventListener('click', alertFruit.bind(null, fruit));
    $ul.appendChild($li);
});
document.body.appendChild($ul);
```

```
//실행 결과
Ex 5-7 과 동일
```

### Ex 5-9

- 콜백 함수에서 외부 변수를 참조하기 위해 고차 함수(Higher-Order Function)를 활용하여 클로저를 적극적으로 사용하는 방법을 보여주는 예제
- alertFruitBuilder는 fruit 문자열을 인자로 받아, 이 fruit 값을 기억하고 있는 새로운 함수(클로저)를 반환함
- fruits 배열의 각 요소에 대해 li 요소를 생성하고, 각 li 요소의 클릭 이벤트 리스너로 alertFruitBuilder(fruit)의 반환 값을 등록함


```
// 예제 5-9 콜백 함수와 클로저(4)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

var alertFruitBuilder = function (fruit) {
    return function () {
      alert('your choice is - ' + fruit);
    };
  };

  fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', alertFruitBuilder(fruit));
    $ul.appendChild($li);
  });
  document.body.appendChild($ul);
```

```
//실행 결과
Ex 5-7 과 동일
```





