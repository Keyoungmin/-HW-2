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


