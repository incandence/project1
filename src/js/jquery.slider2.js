function throttle(callback,wait){
  let prev = 0; // 用于记录上一次的执行时间

  return function(){
    let now = Date.now();

    if(now - prev >= wait){ // 到达预设时间的条件
      // apply 修改this指向为当前函数环境
      // 传入参数 arguments (时间处理函数的第一个参数是event)
      callback.apply(this,arguments);
      prev = now;
    }
  }
}

$.fn.extend({
  slider(options) {
    const defaults = {
      speed: 500,
      delay: 2000
    };

    $.extend(defaults, options); // 合并参数

    // 函数式编程(抽象功能)
    let main = null, // 主函数 所有功能的入口 
      init = null, // 初始化函数
      start = null, // 开始动画
      stop = null, // 停止动画
      prev = null, // 播放上一张
      next = null, // 播放下一张
      timer = null, // 计时器
      circle = null,  // 小圆
      elms = {}; // 命名空间 用于存放公用的内容 对象中的属性可以供多个函数共享(比如索引)

    init = () => {
      // 初始化 需要完成
      // 1. 元素选择
      elms.sliderElm = this.children('div'); // 轮播的元素
      elms.btns = this.children('span'),
      elms.ul = this.children('.bar'),

      elms.ulN; // 左右按钮

      // 2. 复制第一张图片放到最后
      // elms.sliderElm.append(elms.sliderElm.children('img').first().clone());

      // 3. 设置索引
      elms.index = 0;

      // 4. 获得图片的宽度(每次需要移动的距离)
      // elms.width = elms.sliderElm.children('img').first().width();

      // 5. 设置小圆
      // let len = elms.sliderElm.children().length;
      // let str = '';
      // for (let i = 0; i < len; i++) {
      //   str += `<li></li>`;
      // }
      // elms.ul.html(str).children().first().addClass('active');

      // 事件
      this.hover(function () {
        stop();
      }, function () {
        timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
      });

      elms.btns.on('click', throttle(function () {
        if (elms.btns.index(this)) { // 左边按钮索引是0 右边按钮索引是1
          next();
        } else {
          prev();
        }
      }, 1000));


      // 小圆点击
      elms.ul.on('click', 'span', function(){
        elms.ulN = elms.ul.children().index($(this));
        circle();
      })
    }


    start = function (direction) {
      if (direction) {
        if (elms.index >= elms.sliderElm.children().length - 1) {
          elms.sliderElm.children().last().fadeOut().parent().children().first().fadeIn();
          elms.index = 0;
        } else {
          elms.sliderElm.children().eq(elms.index).fadeOut().next().fadeIn();
          elms.index++;
        }
        elms.ul.children().eq(elms.index).addClass('active').siblings().removeClass('active');
      } else {
        if (elms.index <= 0) {
          elms.sliderElm.children().first().fadeOut().parent().children().last().fadeIn();
          elms.index = elms.sliderElm.children().length - 1;
        } else {
          elms.sliderElm.children().eq(elms.index).fadeOut().prev().fadeIn();
          elms.index--;
        }
      }
      
    }.bind(this);

    circle = () => {
      elms.ul.children().eq(elms.ulN).addClass('active').siblings().removeClass('active');
      elms.sliderElm.children().eq(elms.index).fadeOut().parent().children().eq(elms.ulN).fadeIn();
      elms.index = elms.ulN;
    }

    stop = () => {
      clearInterval(timer);
      elms.sliderElm.stop(true, true);
    }

    prev = () => {
      stop();
      start(0);
    }

    next = () => {
      stop();
      start(1);
    }

    main = () => {
      init();
      timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
    }

    main();

  }
});