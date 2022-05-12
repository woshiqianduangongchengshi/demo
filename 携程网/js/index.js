window.addEventListener('load', function () {
    // 移动端click时间延迟300ms的问题
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }

    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    //focus的宽度
    var w = focus.offsetWidth;
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        //单位单位单位单位单位单位单位
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 无缝滚动
    ul.addEventListener('transitionend', function () {
        if (index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 小圆圈跟着图片播放
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');

    });

    // 手指拖动图片
    var startX = 0;
    var moveX = 0;
    var flag = true;
    // 触摸获取初始位置
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    // 移动获得滑动距离
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
    });
    // 手指离开 根据移动的大小回弹上一张还是下一张
    ul.addEventListener('touchend', function () {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
            // 手指离开重启定时器
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                var translatex = -index * w;
                //单位单位单位单位单位单位单位
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }, 2000);
        }
    });

    //返回顶部按钮

    var goBack = document.querySelector('.goback')
    var nav = document.querySelector('nav')
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block'
        } else {
            goBack.style.display = 'none'
        }
    });
    goBack.addEventListener('click', function () {
        window.scroll(0, 0)
    })

});