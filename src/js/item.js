$(function(){

    let id = location.search.split('=')[1];
    console.log(id);
    $.ajax({
        url:'../interface/getitem.php',
        type:'get',
        data:{id},
        dataType:'json',
    }).then(res=>{
        console.log(res);
        let res2=res;
        $('.product-content>h2').html(res.title);
        let arr = JSON.parse(res.type);
        let pic = JSON.parse(res.picture);
        let template = '';
        let template2 = '';
        let template3 = '';
        console.log(arr);
        console.log(pic);
        pic.slice(1).forEach((elm)=>{
            template3 += `<img src="./${elm.src}">`;
        });
        if(pic.length<=2){
            $('.slide').html(`<div>${template3}</div>`);
        }else{
            $('.slide>div').html(template3);
        }
        
        arr.forEach(elm => {

            elm.version.forEach(elm=>{
                console.log(elm);
                template += `<li>${elm}</li>`;
            });
            $(`.option-box:nth-of-type(1)>.config`).html(template);
            $('.option-box:nth-of-type(1)>.config>li').eq(0).addClass('active4');
            elm.color.forEach(elm=>{
                console.log(elm);
                template2 += `<li>${elm}</li>`;
            });
            $(`.option-box:nth-of-type(2)>.color`).html(template2);
            $('.option-box:nth-of-type(2)>.color>li').eq(0).addClass('active4');
            $('.price-info>span').html(elm.price[0]);

            let index = 0;
            let index2 = 0;

            $('.buy-option>.option-box>.config').on('click','li',function(){
                $(this).addClass('active4').siblings().removeClass('active4');
                index = $('.buy-option>.option-box>.config>li').index(this);
                $('.price-info>span').html(elm.price[index]);
                $('.selected-list>ul>li>span:nth-of-type(1)').html(res.title +` ` +$('.config>.active4').html());
                $('.selected-list>ul>li>span:nth-of-type(2)').html($('.color>.active4').html());
                $('.selected-list>ul>li>span:nth-of-type(3)').html(elm.price[index]);
                console.log(res.id,index,index2);

            })

            $('.buy-option>.option-box>.color').on('click','li',function(){
                index2 = $('.buy-option>.option-box>.color>li').index(this);
                $(this).addClass('active4').siblings().removeClass('active4');
                $('.selected-list>ul>li>span:nth-of-type(2)').html($('.color>.active4').html());
                console.log(index2);
                // console.log(res.id,elm.version[index2],elm.color[index2]);

            })



            $('.selected-list>ul>li>span:nth-of-type(1)').html(res.title +` ` +$('.config>.active4').html());
            $('.selected-list>ul>li>span:nth-of-type(2)').html($('.color>.active4').html());
            $('.selected-list>ul>li>span:nth-of-type(3)').html(elm.price[index]);
                

            $('.buy-option>.option-box>.version').on('click','li',function(){
                $(this).addClass('active4').siblings().removeClass('active4');
            })

            $('.service-box').on('click',function(){
                $(this).toggleClass('active5').siblings().removeClass('active5');
                $('.selected-list>ul>li').html(res.title +` ` +$('.config>.active4').html()+' '+$('.color>.active4').html());

                let count = parseInt ($(this).children('.price').html());

                if($(this).hasClass('active5')){
                    $(this).children('input').prop('checked','true')
                    $(this).children('.service-con').children('.agreement-box').children('input').prop('checked','true');
                    $(this).siblings().children('input').prop('checked','')
                    $(this).siblings().children('.service-con').children('.agreement-box').children('input').prop('checked','');
                }else{
                    $(this).children('input').prop('checked','');
                    $(this).children('.service-con').children('.agreement-box').children('input').prop('checked','');
                }
            });

                    // 添加购物车
            $('.sale-btn').on('click',function(){
                addItem(res.id,index,index2,1);
            })

            console.log(res.id,index,index2);
        });



    }).catch(xhr=>{
        console.log(xhr.status);
    })

    // 向cookie中添加一向内容
    function addItem(id,v_index,c_index,num){
        let product = {id,v_index,c_index,num};

        let shop = cookie.get('shop');

        if(shop){
            shop =JSON.parse(shop);
            if(shop.some(el=> el.id == id && el.v_index==v_index && el.c_index==c_index)){
                let index3 = shop.findIndex(elm => elm.id == id);
                let count = shop[index3].num;
                count += parseInt(num);
                shop[index3].num = count;
                console.log(1);
            }else{
                shop.push(product);
            }
            
        }else{
            shop = [];
            shop.push(product);
        }
        console.log(shop);
        cookie.set('shop',JSON.stringify(shop));
    }


    $('.tabs>.nav>li').on('mouseout',function(ev){
        ev.stopPropagation();
    });
    $('.tabs-content>.erji2>li>a').on('mouseout',function(ev){
        ev.stopPropagation();
    });
    $('.tabs-content>.erji2>li').on('mouseout',function(ev){
        ev.stopPropagation();
    });
    $('.tabs>.nav>li').on('mouseover',function(){
        $('.tabs-content').slideDown(200);
        console.log(1);
        let index = $('.tabs>.nav>li').index(this);
        $('.tabs-content>.erji2').eq(index).addClass('display').siblings().removeClass('display')
    });
    $('.tabs>.nav').on('mouseout',function(){
        console.log(2);
        $('.tabs-content').slideUp(200);
    });
    $('.tabs-content').on('mouseout',function(){
        $('.tabs-content').slideUp(200);
        console.log(3);
    });


    $('.header-bottom>.container>.content>.site').on('mouseover',function(){
        $('.header-bottom>.container>.content>.site>.b_sup>.site-category').css('display','inline-block');
    })
    $('.header-bottom>.container>.content>.site').on('mouseout',function(){
        $('.header-bottom>.container>.content>.site>.b_sup>.site-category').css('display','none');
    })


    $('header>.header-bottom>.container>.content>form>.search').on('focus',function(){
        $('.content>form>.search').css('border','1px solid #ff6700');
        $('.content>form>.submit').css('border','1px solid #ff6700');
        $('.content>form>.keyword-list').css('display','block');
    });
    $('header>.header-bottom>.container>.content>form>.search').on('blur',function(){
        $('.content>form>.search').css('border','');
        $('.content>form>.submit').css('border','');
        $('.content>form>.keyword-list').css('display','none');
    });


    $(window).on('scroll',function(){
        let scrollTop=$(document).scrollTop();
        if(scrollTop>205){
            $('.xm-product-box-f').slideDown();
        }else {
            $('.xm-product-box-f').slideUp("fast");
        }
    });



    $(window).on('scroll',function(){
        let scrollTop=$(document).scrollTop();
        if(scrollTop<765){
            $('.home-tool>.f-6').css('display','none');
        }else{
            $('.home-tool>.f-6').css('display','block');
        }
    });


    var index=0;
    setInterval(function(){
        let arr=['./img/info-link5.png','./img/info-link6.png'];
        let img=$('.info-link>a:nth-of-type(5)>img');
        $(img).attr('src',arr[index]);
        index++;
        if(index>arr.length-1)index=0;
    },1000)
        
        

});