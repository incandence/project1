$(function(){
    $('.language').on('mouseover',function(){
        $('.dropdown-menu').css('display','block');
        console.log(1);
        $('.language').css('color','#ff6700')
        $('.mi-language-picker__icon').css('transform','rotate(180deg)')
    });
    $('.language').on('mouseout',function(){
        console.log(2);
        $('.dropdown-menu').css('display','none');
        $('.mi-language-picker__icon').css('transform','rotate(0deg)')
        $('.language').css('color','#838383')
    });
    // $('.dropdown-menu>.dropdown-menu-item').on('mouseout',function(ev){
    //     console.log(3);
    //     ev.stopPropagation();
    // });
    $('.dropdown-menu').on('mouseout',function(){
        console.log(4);
        $('.dropdown-menu').css('display','none');
        $('.language').css('color','#838383')
        $('.mi-language-picker__icon').css('transform','rotate(0deg)')
    });
    $('.dropdown-menu').on('mouseover',function(){
        console.log(10);
        $('.dropdown-menu').css('display','block');
        $('.mi-language-picker__icon').css('transform','rotate(180deg)')
        $('.language').css('color','#ff6700')
    });




    $('.nav-scroll>div>.tab>.login').on('click',function(){
        $('.bar').css('transform','translateX(0px)');
        $('.nav-scroll>div>.tab>.login').addClass('active');
        $('.nav-scroll>div>.tab>.reg').removeClass('active');
        $('.mi-form>.mi-form-content').eq(0).addClass('display').siblings().removeClass('display');
        $('.mi-form').attr('action','../interface/login.php');
    });
    $('.nav-scroll>div>.tab>.reg').on('click',function(){
        $('.bar').css('transform','translateX(64px)');
        $('.nav-scroll>div>.tab>.reg').addClass('active')
        $('.nav-scroll>div>.tab>.login').removeClass('active');
        $('.mi-form>.mi-form-content').eq(1).addClass('display').siblings().removeClass('display');
        $('.mi-form').attr('action','../interface/reg.php');
    });

    // input
    let username = $('.mi-form-content>.input-group>.username');
    let num=0;
    username.on('focus',function(){
        $('.mi-form-content>.input-group>.phone-desc').css( {"font-size":"12px","top":"6px"}); 
        username.css({"outline-color":"#ff6700"});
        if(username.val()==''&& num>0){
            username.css({"background":"#fcf2f3"});
        }else{
            username.css({"background":"#f9f9f9"});
        }
        num++;
        username.on('input',function(){
            if(username.val()!==''){
                $('.mi-form-content>.input-group>.phone-desc').css( {"font-size":"12px","top":"6px","color":"#AAAAAA"});
                username.css({"background":"#f9f9f9"});
            }else{  
                $('.mi-form-content>.input-group>.phone-desc').css( {"font-size":"12px","top":"6px","color":"#f04645"});    
            }
        });
    });
    username.on('blur',function(){
        if(username.val()==''){
            $('.mi-form-content>.input-group>.phone-desc').css( {"font-size":"17px","top":"20px","color":"#f04645"});    
            username.css({"outline-color":"","background":"#fcf2f3"});
        }
    });









        // var res=$('.form-control').val();
        // console.log(14);
        // console.log(res.length);

        // if(res.length>0){
        //     $('.mi-btn').attr('disabled','');
        //     console.log(1);
        // }else{
        //     $('.mi-btn').attr('disabled','disabled');
        //     console.log(2);

        // }
        // console.log(12);
    
    
});