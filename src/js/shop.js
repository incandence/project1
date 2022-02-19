$(function () {

    let shop = cookie.get('shop');
    shop = JSON.parse(shop);
    console.log(shop);

    let idList = shop.map(el =>el.id).join();

    console.log(idList);

    $.ajax({
        url: '../interface/shop.php',
        data: { idList },
        type: 'get',
        dataType: 'json'
    }).then(res => {
        console.log(res);
        let template=``;

        shop.forEach(el =>{
            let data = res.filter(elm => elm.id == el.id)[0];
            let pic = JSON.parse(data.picture);

            let c_index = el.c_index;
            let v_index = el.v_index;
            let num = el.num;
            
            console.log(data);
            console.log(el);
            // console.log(JSON.parse(data.picture)[c_index].src);



            let type =JSON.parse(data.type)[0];
            console.log(type);
            let versions = type.version[v_index];
            let color = type.color[c_index];
            let price = type.price[v_index];

            template+=`<div class="item-box">
            <div class="col-check">
                <input type="checkbox" class="checkbox">
            </div>
            <div class="col-img"><img src="./${pic.length <= 2 ? pic[0] : pic[c_index+2].src}" alt=""></div>
            <div class="col-name"><a href="">${data.title} ${versions} ${color}</a> </div>
            <div class="col-price">${price}元</div>
            <div class="col-num">
                <div class="change-num">
                    <a href="javascript:;" class="poor"><svg t="1644828083466" class="icon" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3886" width="12"
                            height="12">
                            <path d="M170.666667 469.333333h682.666666v85.333334H170.666667z"
                                fill="#757575" p-id="3887"></path>
                        </svg></a>
                    <input type="text" value="${num}" min="1">
                    <a href="javascript:;" class="more"><svg t="1644828027129" class="icon" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2986" width="12"
                            height="12">
                            <path
                                d="M580.722174 437.990403 580.722174 78.171384 436.794158 78.171384 436.794158 437.990403 76.975139 437.990403 76.975139 581.918419 436.794158 581.918419 436.794158 941.737438 580.722174 941.737438 580.722174 581.918419 940.542216 581.918419 940.542216 437.990403Z"
                                p-id="2987" fill="#757575"></path>
                        </svg></a>
                </div>
            </div>
            <div class="col-total">${price * num}元</div>
            <div class="col-action"><span data-id="${el.id+v_index+c_index}">×</span></div>
            <div class="item-sub">
                <div class="item-sub-box">
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        意外保障服务
                        <span>199元 <span class="price-diff">(意外损免费修)</span></span>
                        <a href="">了解意外保护></a>
                    </div>
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        碎屏保障服务
                        <span>129元 <span class="price-diff">(碎屏免费修)</span></span>
                        <a href="">了解意外保护></a>
                    </div>
                </div>
                <div class="item-sub-box">
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        延长保修服务
                        <span>69元 <span class="price-diff">(质保延长1年)</span></span>
                        <a href="">了解延长保修></a>
                    </div>
                </div>
                <div class="item-sub-box">
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        云空间年卡200G
                        <span>208元</span>
                        <a href="">了解云空间服务></a>
                    </div>
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        云空间年卡50G
                        <span>58元</span>
                        <a href="">了解云空间服务></a>
                    </div>
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        云空间月卡200G
                        <span>21元</span>
                        <a href="">了解云空间服务></a>
                    </div>
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        云空间月卡50G
                        <span>6元</span>
                        <a href="">了解云空间服务></a>
                    </div>
                </div>
                <div class="item-sub-box">
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        +349元得Redmi 手表 2
                        <span>349元 <span class="price-diff">( 省 30 元 )</span></span>
                        <span>（多版本可选）</span>
                    </div>
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        +110元得Air2 SE耳机
                        <span>110元 <span class="price-diff">( 省 19 元 )</span></span>
                    </div>
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        +199元得小米手环6
                        <span>199元 <span class="price-diff">( 省 10 元 )</span></span>
                    </div>
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        +179元得Redmi Buds 3
                        <span>179元 <span class="price-diff">( 省 10 元 )</span></span>
                    </div>
                    <div class="extend-buy">
                        <svg t="1644829219861" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6740" width="25" height="25">
                            <path
                                d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
                                p-id="6741" fill="#ff6700"></path>
                        </svg>
                        +279元得Redmi AirDots 3 Pro
                        <span>279元</span>
                    </div>
                </div>
            </div>
        </div>`


        })
        $('.list-item').html(template);
        $('.cart-total>i:nth-of-type(1)').html($('.list-item>.item-box').length); 


        $('.change-num').on('click','a',function(){
            let index = $('.item-box').index($(this).parent().parent().parent());
            console.log(index);
            let con = 0;
            if($(this).hasClass('more')){
                shop[index].num++;
                cookie.set('shop',JSON.stringify(shop));
                $(this).siblings('input').val(shop[index].num);
                let price = parseInt($(this).parents('.col-num').siblings('.col-price').html());
                $(this).parents('.col-num').siblings('.col-total').html(shop[index].num*price+'元')
                if($('.allcheck').prop('checked')){
                    // $('.total-price>em').html(shop[index].num*price+'元');
                    let item =Array.from($('.item-box>.col-total')); 
                    item.forEach(el=>{
                        con += parseInt($(el).html()); 
                    });
                    $('.total-price>em').html(con);
                }else{
                    let checked=Array.from($('.item-box :checked')); 
                    checked.forEach(el=>{
                        console.log(parseInt($(el).parent().siblings('.col-total').html()));
                        con += parseInt($(el).parent().siblings('.col-total').html()) ;
                    });
                    console.log(con);
                    $('.total-price>em').html(con);
                }
                // console.log(); 
                // console.log(parseInt($(this).parents('.col-num').siblings('.col-total').html()) ); 
                // console.log(parseInt($(this).parents('.col-num').siblings('.col-price').html()) ); 
                
                // location.reload();
            }else{
                if(!(shop[index].num<=1)){
                        shop[index].num--;
                        cookie.set('shop',JSON.stringify(shop));
                        $('.change-num>input').html(shop[index].num);
                        $(this).siblings('input').val(shop[index].num);
                        let price = parseInt($(this).parents('.col-num').siblings('.col-price').html());
                        $(this).parents('.col-num').siblings('.col-total').html(shop[index].num*price+'元')

                        if($(this).parents('.col-num').siblings('.col-check').children('.checkbox').prop('checked')){
                            $('.total-price>em').html(shop[index].num*price);
                        }
                        if($('.allcheck').prop('checked')){
                            let item =Array.from($('.item-box>.col-total')); 
                            item.forEach(el=>{
                                con += parseInt($(el).html()); 
                            });
                            $('.total-price>em').html(con);
                        }else{
                            let checked=Array.from($('.item-box :checked')); 
                            checked.forEach(el=>{
                                console.log(parseInt($(el).parent().siblings('.col-total').html()));
                                con += parseInt($(el).parent().siblings('.col-total').html()) ;
                        });
                            console.log(con);
                    $('.total-price>em').html(con);
                        }
                };
                    
                // location.reload();
            }
        })
        let index2 = 0;
        $('.col-action').on('click','span',function(){
            $('.mi-popup').css({"visibility":"visible","top":"0","opacity":"1"});
            index2 = $(this).parents('.item-box').index();
        })
    
        $('.btn-primary').on('click',function(){
            console.log($(`.item-box:nth-of-type(${index2+1})>.col-action>span`).attr('data-id'));
            let result = shop.filter(el=>el.id+''+el.v_index+''+el.c_index !=$(`.item-box:nth-of-type(${index2+1})>.col-action>span`).attr('data-id'));
            cookie.set('shop',JSON.stringify(result));
            $('.mi-popup').css({"visibility":"hidden","top":"-30px","opacity":"0"});
            // $(`.item-box:nth-of-type(${index2+1})`).remove();
            location.reload()
        });

        // 单选框
        let count=0;
        $('.col-check').on('change','.checkbox',function(){
            $('.allcheck').prop('checked',isAllCheck());
            let index = $('.checkbox').index(this);
            let arr=Array.from($('.item-box>.col-check>.checkbox')); 
            let res=arr.some(el =>$(el).prop('checked'));
            if(res){
                $('.btn-a').css({"background":" #ff6700",
                "border-color":" #ff6700",
                "color":"#fff"});
                $('.no-select-tip').css('display','none')
            }else{
                $('.btn-a').css({"background":" #e0e0e0",
                "border-color":" #e0e0e0",
                "color":"#b0b0b0"});
                $('.no-select-tip').css('display','block')
            }
            if($(this).prop('checked')){
                $('.item-sub').eq(index).addClass('display').siblings().removeClass('display') ;
                count += parseInt($(this).parent().siblings('.col-total').html());
                // console.log(count);
            }else{
                $('.item-sub').eq(index).removeClass('display');
                if(res){
                    count -= parseInt($(this).parent().siblings('.col-total').html());
                }else{
                    count= 0;
                }
            }
            $('.total-price>em').html(count);

            $('.cart-total>i:nth-of-type(2)').html($('.item-box :checked').length);

        });

        // 多选框
        $('.allcheck').on('change',function(){
            $('.checkbox').prop('checked',$(this).prop('checked'));
            if($(this).prop('checked')){
                $('.item-sub').addClass('display').siblings().removeClass('display') ;
                let arr=Array.from($('.item-box>.col-total'))
                arr.forEach(el=>{
                count+=parseInt($(el).html());
                $('.btn-a').css({"background":" #ff6700",
                            "border-color":" #ff6700",
                            "color":"#fff"});
                $('.no-select-tip').css('display','none')
            })
            }else{
                $('.item-sub').removeClass('display');
                $('.btn-a').css({"background":" #e0e0e0",
                "border-color":" #e0e0e0",
                "color":"#b0b0b0"});
                $('.no-select-tip').css('display','block');
                count=0;
            }
            $('.cart-total>i:nth-of-type(2)').html($('.item-box :checked').length);
            $('.total-price>em').html(count);
        });



    }).catch(xhr => {
        console.log(xhr.status);
    });

    // -------------------------
    function isAllCheck(){
        let elms = Array.from($('.checkbox'));
        let res = elms.every(el=>$(el).prop('checked'));
        return res
    }

    // 删除
    $('.confirm-h>span').on('click',function(){
        $('.mi-popup').css({"visibility":"hidden","top":"-30px","opacity":"0"});
    });
    $('.btn-gray').on('click',function(){
        $('.mi-popup').css({"visibility":"hidden","top":"-30px","opacity":"0"});
    });
    











    // 用户
    $('.user>a').on('mouseover', function () {
        $('.user-list').css('height', '164px');
    });
    $('.user>a').on('mouseout', function () {
        $('.user-list').css('height', '0px');
    });
    $('.user-list').on('mouseover', function () {
        $('.user-list').css('height', '164px');
    });
    $('.user-list').on('mouseout', function () {
        $('.user-list').css('height', '0px');
    });

    // 结算
    // setInterval(function () {
    //     let Top = $('.raise-buy-box').offset().top;
    //     if ($(document).scrollTop() + $(window).height() < $('.raise-buy-box').offset().top) {
    //         $('.cart-bar').css({ "position": "fixed", "bottom": "0", "width": "1226px", "background-color": "#fafafa" })
    //     } else {
    //         $('.cart-bar').css({ "position": "", "bottom": "", "background-color": "#fff" })
    //     }
    // }, .1)

    // 滚动结算
    $(window).on('scroll', function () {
        let scrollTop = $(document).scrollTop();
        let windowHeight = $(window).height();
        let Top = $('.raise-buy-box').offset().top+$('.raise-buy-box').height();
        if (scrollTop + windowHeight < Top) {
            $('.cart-bar').css({ "position": "fixed", "bottom": "0", "width": "1226px", "background-color": "#fafafa" })
        } else {
            $('.cart-bar').css({ "position": "", "bottom": "", "background-color": "#fff" })
        }
    });
    








});

