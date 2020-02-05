$(document).ready(function(){
    $('.info-button').on('click', function() {
        console.log("ssaa");
        $('.card-shop-img').css({
            "height": "230px"
        });
        $('.card-shop-data').css({
            "height": "0px"
        });
        var card_img = $(this).parent().find('.card-shop-img');
        console.log(card_img);

        if (!card_img.hasClass('toggled')){
            card_img.addClass('toggled');
        }else{
            card_img.removeClass('toggled');
        }
            


        

        var card_data = $(this).parent().find('.card-shop-data');
        console.log(card_data);
        card_data.css({
            "height": "230px",

        });

        if (!card_data.hasClass('toggled-data')){
            card_data.addClass('toggled-data');
        }else{
            card_data.removeClass('toggled-data');
        }
        
    });

    $('.card-shop-img').on('click', function() {
        console.log("object");


    });
    
});