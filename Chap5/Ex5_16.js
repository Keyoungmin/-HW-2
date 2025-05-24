// 예제 5-16 부분 적용 함수 - 디바운스
var debounce = function (eventName, func, wait) {
    var timeoutId = null;
    return function (event) {
        var self = this;
        console.log(eventName,'이벤트 발생');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func.bind(self, event), wait);
    };
};

var moveHandler = function (e) {
    console.log('move 이벤트 처리)');
};
var wheelHandler = function (e) {
    console.log('wheel 이벤트 처리)');
};
document.body.addEventListener('mousemove', debounce('mousemove', moveHandler, 500));
document.body.addEventListener('mousewheel', debounce('mousewheel', wheelHandler, 700));
