// 数据渲染
$(function(){
    let shop = cookie.get('shop');

    shop = JSON.parse(shop);

    let idList = shop.map(el => el.id).join();

    let cart = $('.cart');
    let cartEmpty = $('.cart-empty');

    // 判断有没有数据
    if (!idList) {
        cart.css('display', 'none');
        cartEmpty.css('display', 'block');
    } else {
        cart.css('display', 'block');
        cartEmpty.css('display', 'none');
    
        $.ajax({
            url: './product/shop',
            type: 'get',
            data: { idList }
        }).then(res => {

            let template = '';

            shop.forEach(el => {
                let data = res.filter(elm => elm.id == el.id)[0];
                let pic = JSON.parse(data.picture)[0].src;

                console.log(data);
                console.log(el);
                let ver_index = el.ver_index;
                let co_index = el.co_index;

                let type = JSON.parse(data.type)[0];
                let versions = type.versions[ver_index];
                let color = type.color[co_index];
                let price = type.price[ver_index] + type.add[co_index];
                
                let data_index = '' + el.id + ver_index + co_index;

                template += `<div class="item-box" data-index="${data_index}">
                                <ul class="product clear_fix">
                                    <li class="check">
                                        <i class="iconfont icon-gou" data-checked="${el.flag}"></i>
                                    </li>
                                    <li class="img">
                                        <img src="${pic.length <= 2 ? pic[0] : pic[co_index]}" alt="">
                                    </li>
                                    <li class="name">
                                        <a href="javascript:;">${data.title} ${versions} ${color}</a>
                                    </li>
                                    <li class="price">${price}</li>
                                    <li class="num">
                                        <div class="change-num clear_fix">
                                            <a href="javascript:;" class="subtraction">-</a>
                                            <input type="text" value="${el.num}" class="goods-num">
                                            <a href="javascript:;" class="add">+</a>
                                        </div>
                                    </li>
                                    <li class="total">${price * el.num}元</li>
                                    <li class="action">
                                        <i>&times;</i>
                                    </li>
                                </ul>
                                <!-- 附加 -->
                                <div class="additive">
                                    <!-- 赠品 -->
                                    <div class="sub-box">
                                        <ul class="clear_fix">
                                            <li class="img">
                                                <img src="./img/pms_1641896369.28045323.jpg" alt="">
                                            </li>
                                            <li class="name">
                                                <div>
                                                    <span>赠品</span>
                                                    <h3>
                                                        <a href="javascript:;">Xiaomi 12 Pro 素皮保护壳 for 玻璃版（紫色）</a>
                                                    </h3>
                                                    <p>
                                                        <a href="javascript:;">选择其他版本</a>
                                                    </p>
                                                </div>
                                            </li>
                                            <li class="price"></li>
                                            <li class="num">1</li>
                                            <li class="total"></li>
                                            <li class="action"></li>
                                        </ul>
                                    </div>

                                    <div class="service">
                                        <ol>
                                            <li>
                                                <i>+</i>
                                                MiCare保障服务
                                                <span class="price">749元</span>
                                                <em>(省 150元)</em>
                                                <a href="javascript:;">了解尊享服务 &gt;</a>
                                            </li>
                                        </ol>

                                        <ol>
                                            <li>
                                                <i>+</i>
                                                意外保障服务
                                                <span class="price"> 599元</span>
                                                <em>(意外损免费修)</em>
                                                <a href="javascript:;">了解意外保护 &gt;</a>
                                            </li>
                                            <li>
                                                <i>+</i>
                                                碎屏保障服务
                                                <span class="price"> 349元</span>
                                                <em>(碎屏免费修)</em>
                                                <a href="javascript:;">了解意外保护 &gt;</a>
                                            </li>
                                        </ol>

                                        <ol>
                                            <li>
                                                <i>+</i>
                                                延长保修服务
                                                <span class="price"> 199元</span>
                                                <em>(质保延长1年)</em>
                                                <a href="javascript:;">了解延长保修 &gt;</a>
                                            </li>
                                        </ol>

                                        <ol>
                                            <li>
                                                <i>+</i>
                                                云空间年卡200G
                                                <span class="price">208元</span>
                                                <em></em>
                                                <a href="javascript:;">了解云空间服务 &gt;</a>
                                            </li>
                                            <li>
                                                <i>+</i>
                                                云空间年卡50G
                                                <span class="price">58元</span>
                                                <em></em>
                                                <a href="javascript:;">了解云空间服务 &gt;</a>
                                            </li>
                                            <li>
                                                <i>+</i>
                                                云空间月卡200G
                                                <span class="price">21元</span>
                                                <em></em>
                                                <a href="javascript:;">了解云空间服务 &gt;</a>
                                            </li>
                                            <li>
                                                <i>+</i>
                                                云空间月卡50G
                                                <span class="price">6元</span>
                                                <em></em>
                                                <a href="javascript:;">了解云空间服务 &gt;</a>
                                            </li>
                                        </ol>
                                        
                                    </div>
                                </div>
                            </div>`;
            })

            $('.list-body').html(template);

            // --------------------------------------

            let cartBar = $('.cart-bar');
            let itemBox = $('.list-body .item-box');

            let checkAll = $('.list-head .check>i');
            let check = $('.list-body .check>i');
            let additive = $('.list-body .additive');

            let popup = $('.popup');


            // 已选择件数 + 总价
                function select(){
                    let select = Array.from(check).reduce((obj, current)=>{
                        if ($(current).data('checked')) {
                            obj.sum++;
                            obj.price += parseFloat($(current).parents('.product').find('.total').html());
                        }
                        return obj;
                    }, {sum: 0, price: 0});

                    cartBar.find('.cart-select').html(select.sum);
                    cartBar.find('.price').html(select.price);

                    if (select.price == 0) {
                        cartBar.find('.go').addClass('disable').siblings('.no-select').css('display', 'block');
                    } else {
                        cartBar.find('.go').removeClass('disable').siblings('.no-select').css('display', 'none');
                    }
                }
                select();

            // 数量改变更新cookie
                let updateNum = function (value){
                    let data_index = $(this).parents('.item-box').attr('data-index');
                    let result = shop.map(el => {
                        if ('' + el.id + el.ver_index + el.co_index == data_index) {
                            el.num = +value;
                        }
                        return el;
                    });
                    console.log($(this));
                    cookie.set('shop', JSON.stringify(result));
                }

            // 商品总计
                cartBar.find('.cart-total').html(itemBox.length);

            // 删除商品
                itemBox.on('click', 'li.action>i', function(){
                    let that = $(this);
                    let data_index = $(this).parents('.item-box').attr('data-index');

                    popup.addClass('show').children('.delete').addClass('show');
                    popup.on('click', 'a', function(e){
                        popup.removeClass('show').children('.delete').removeClass('show');

                        if ($(e.target).attr('class') === 'btn-confirm') {
                            let res = shop.filter(el => '' + el.id + el.ver_index + el.co_index != data_index);
                            cookie.set('shop', JSON.stringify(res));
                            that.parents('.item-box').remove();
                            // 总计
                            cartBar.find('.cart-total').html(--itemBox.length);

                            check = $('.list-body .check>i');
                            // 已选择件数
                            select();
                            location.reload();
                        }
                    })
                })



            let checkbox = function(){
                let boo = !$(this).data('checked');

                $(this).data('checked', boo);
                
                let elms = Array.from(check);
                let result = elms.every(el => $(el).data('checked'));
                
                boo ? $(this).addClass('active').parents('.item-box').find('.additive').css('display', 'block') : $(this).removeClass('active').parents('.item-box').find('.additive').css('display', 'none')
                
                checkAll.data('checked', result);
                
                result ? checkAll.addClass('active') : checkAll.removeClass('active')
            }
            // 选中按钮
                checkAll.data('checked', false);
                // check.data('checked', false);
                // 全选
                checkAll.on('click', function(){

                    let boo = !$(this).data('checked');
                    $(this).data('checked', boo);
                    check.data('checked', boo);
                    if (boo) {
                        $(this).addClass('active');
                        check.addClass('active');
                        additive.css('display', 'block');
                    } else {
                        $(this).removeClass('active');
                        check.removeClass('active');
                        additive.css('display', 'none');
                    }

                    // 已选择件数
                    select();
                })

                // 单选
                check.on('click', function(){
                    console.log($(this).attr('data-checked'));
                    let boo = !$(this).data('checked');

                    $(this).data('checked', boo);
                    
                    let elms = Array.from(check);
                    let result = elms.every(el => $(el).data('checked'));
                    
                    boo ? $(this).addClass('active').parents('.item-box').find('.additive').css('display', 'block') : $(this).removeClass('active').parents('.item-box').find('.additive').css('display', 'none')
                    
                    checkAll.data('checked', result);
                    
                    result ? checkAll.addClass('active') : checkAll.removeClass('active')

                    // 已选择件数
                    select();
                })


            // 弹出警示框
                function popupAlert(str){
                    popup.addClass('show').children('.alert').addClass('show').children('.text').html(str);
                    popup.on('click', 'a', function(){
                        popup.removeClass('show').children('.alert').removeClass('show');
                    })
                }


            // 单个商品数量 + -
                let num = $('.item-box .product .num');

                num.on('click', function(e){
                    let input = $(this).find('input');
                    let inputVal = input.val();
                    let price = parseFloat($(this).siblings('.price').html());
                    let total = $(this).siblings('.total');

                    // -
                    if ($(e.target).attr('class') === 'subtraction') {
                        inputVal <= 1 ? popupAlert('修改的数量不能小于0') : input.val(--inputVal);
                    }

                    // +
                    if ($(e.target).attr('class') === 'add') {
                        inputVal >= 5 ? popupAlert('商品加入购物车数量超过限购数') : input.val(++inputVal);
                    }

                    total.html(`${inputVal * price}元`);

                    select();
                })


        
            // 单个商品数量发生变化 对应的小计价格也发生变化
                let input = $('.item-box .product .goods-num');

                input.on('change', function(){
                    let inputVal = $(this).val();
                    let total = $(this).parents('.num').siblings('.total');
                    let price = parseFloat(total.siblings('.price').html());

                    if (+inputVal || inputVal == 0) {
                        if (inputVal < 1) {
                            popupAlert('修改的数量不能小于0');
                            $(this).val(1);
                            total.html(`${1 * price}元`);
                            select();
                            updateNum.call(this, 1);
                            return;
                        } else if (inputVal > 5) {
                            popupAlert('商品加入购物车数量超过限购数');
                            $(this).val(5);
                            total.html(`${5 * price}元`);
                            select();;
                            updateNum.call(this, 5);
                            return;
                        }
                    } else {
                        popupAlert('输入的数量只能是数字！');
                        $(this).val(5);
                        total.html(`${5 * price}元`);
                        select();
                        updateNum.call(this, 5);
                        return;
                    }
                    total.html(`${inputVal * price}元`);
                    select();
                    updateNum.call(this, inputVal);
                })

        }).catch(xhr => {
            console.log(xhr);
        });
    }
})


$(function(){

    // 结算条滚动指定距离 改变定位
        let cartBar = $('.cart .cart-bar');
        let placeholder = $('.cart .placeholder');

        // 设置一个默认top(固定不会变的)  获取占位符距离文档上方的位置 + 结算条的高度
        // let topDefault = placeholder.offset().top + cartBar.outerHeight();

        // let top = topDefault - window.innerHeight;

        // 当窗口大小发生改变时 就用默认top - 窗口可视区的高度
        // window.onresize = function(){
        //     top = topDefault - window.innerHeight;
        // }
        // 当滚动时 判断滚动距离是否小于top值
        // $(window).on('scroll', function(){
        //     if ($(this).scrollTop() <= top) {
        //         cartBar.addClass('position');
        //     } else {
        //         cartBar.removeClass('position');
        //     }
        // })

        let top;
        $(window).on('scroll', function(){
            top = placeholder.offset().top + cartBar.outerHeight() - window.innerHeight;

            if ($(this).scrollTop() <= top) {
                cartBar.addClass('position');
            } else {
                cartBar.removeClass('position');
            }
        })
})
