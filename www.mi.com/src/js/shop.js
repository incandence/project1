$(function(){

    // $('.user-list>li').on('mouseout',function(ev){
    //     ev.stopPropagation();
    // });
    // $('.user-list>a').on('mouseout',function(ev){
    //     ev.stopPropagation();
    // });
    $('.user>a').on('mouseover',function(){
        $('.user-list').css('height','164px');
    });
    $('.user>a').on('mouseout',function(){
        $('.user-list').css('height','0px');
    });
    $('.user-list').on('mouseover',function(){
        $('.user-list').css('height','164px');
    });
    $('.user-list').on('mouseout',function(){
        $('.user-list').css('height','0px');
    });
})