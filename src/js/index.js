$(function(){

    $.ajax({
        url:'../interface/getitems.php',
        type:'get',
        dataType:'json'
    }).then(res =>{
        console.log(res);
        res.forEach((elm,index)=> {
            let pic = JSON.parse(elm.picture);
            $(`.box1-bd-right>li:nth-of-type(${index+1})>a`).attr('href',`./item.html?id=${elm.id}`);
            $(`.box1-bd-right>li:nth-of-type(${index+1})>a>.figure>img`).attr('src',pic[0].src);
            $(`.box1-bd-right>li:nth-of-type(${index+1})>a>.title`).html(elm.title);
            $(`.box1-bd-right>li:nth-of-type(${index+1})>a>.desc`).html(elm.description);
            $(`.box1-bd-right>li:nth-of-type(${index+1})>a>p>.price`).html(elm.price);
        });
        

    }).catch(xhr =>{
        console.log(xhr.status);
    });








    $('.tabs>.nav>li').on('mouseout',function(ev){
        ev.stopPropagation();
    });
    $('.tabs>.nav>li>a').on('mouseout',function(ev){
        ev.stopPropagation();
    });
    $('.tabs-content>.erji2>li>a').on('mouseout',function(ev){
        ev.stopPropagation();
    });
    $('.tabs-content>.erji2>li').on('mouseout',function(ev){
        ev.stopPropagation();
    });
    $('.tabs>.nav>li').on('mouseover',function(){
        let index = $('.tabs>.nav>li').index(this);
        $('.tabs-content>.erji2').eq(index).addClass('display').siblings().removeClass('display')
        $('.tabs-content').shop().delay(3000).slideDown(200);
        console.log(1);
    });
    $('.tabs>.nav').on('mouseout',function(){
        console.log(2);
        $('.tabs-content').shop().delay(3000).slideUp(200);
    });
    $('.tabs-content').on('mouseout',function(){
        $('.tabs-content').shop().delay(3000).slideUp(200);
        console.log(3);
    });



    // $('header>.header-bottom>.container>.content>form').on('click',function(ev){
    //     console.log(1);
    //     if(ev.target.className=='search'){
    //         $('header>.header-bottom>.container>.content>form>.search').css('border','1px solid #ff6700');
    //         $('header>.header-bottom>.container>.content>form>.submit').css('border','1px solid #ff6700');
    //         $('header>.header-bottom>.container>.content>form>.keyword-list').css('display','block');
    //     }
    // });



    $('header>.header-bottom>.container>.content>form>.search').on('focus',function(){
        $('header>.header-bottom>.container>.content>form>.search').css('border','1px solid #ff6700');
        $('header>.header-bottom>.container>.content>form>.submit').css('border','1px solid #ff6700');
        $('header>.header-bottom>.container>.content>form>.keyword-list').css('display','block');

    });
    $('header>.header-bottom>.container>.content>form>.search').on('blur',function(){
        $('header>.header-bottom>.container>.content>form>.search').css('border','');
        $('header>.header-bottom>.container>.content>form>.submit').css('border','');
        $('header>.header-bottom>.container>.content>form>.keyword-list').css('display','none');

    });










    $(window).on('scroll',function(){
        let scrollTop=$(document).scrollTop();
        if(scrollTop>$('.main_hd').offset().top){
            $('.home-tool>.f-6').css('display','block');
        }else{
            $('.home-tool>.f-6').css('display','none');
        }
    });














    $('.tabs-list>li').on('mouseover',function(){
        $(this).addClass('active').siblings().removeClass('active');
        let index = $('.tabs-list>li').index(this);
        $('.right-children>.box-bd-right').eq(index).addClass('display').siblings().removeClass('display');
    })


    var index=0;
    setInterval(function(){
        let arr=['./img/info-link5.png','./img/info-link6.png'];
        let img=$('.info-link>a:nth-of-type(5)>img');
        $(img).attr('src',arr[index]);
        index++;
        if(index>arr.length-1)index=0;
    },1000)
        
        

});