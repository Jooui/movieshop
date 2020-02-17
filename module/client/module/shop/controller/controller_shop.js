var numItemsShop = 0;
$(document).ready(function(){

    loadItems();
    loadItemsOnScroll();
    
});

function loadItemsOnScroll(){
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            loadItems();
        }
    });
}

function loadItems(){
    numItemsShop = $('.card-shop').length;
    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMovies',
        dataType: 'json',
        async: false,
        data:{"limit":20,"offset":numItemsShop},
        beforeSend: function() {

        },
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
          //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0]
            console.log(data);

           for(i = 0; i < data.length; i++){
                
                $urlCoverImage = data[i].coverimg;
    
              
                $("#cardsContainer").append(
                    '<div class="card-shop">'+
                        '<div class="card-shop-img">'+
                           ' <img class="img-size" src="'+$urlCoverImage+'">'+
    
                        '</div>'+
                        '<div class="card-shop-data">'+
                            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>'+
                        '</div>'+
                        '<div class="info-button" id="info-button">'+
                            '<i class="fa fa-bars"></i>'+
                        '</div>'+
    
                        '<div class="card-shop-footer">'+
                            '<div class="effect-3d"></div>'+
                            '<div class="card-footer-text">'+
                                '<span>'+data[i].title+'</span>'+
    
                                '<div class="card-rate">'+
                                    '<strong>'+
                                       ' <i class="fa fa-fw fa-star"></i>'+
                                       data[i].score+' / 10'+
                                    '</strong>'+
                                   '<div class="likes-card">'+
                                        '<i class="fas fa-heart"></i>'+
                                        '<span>7593</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                );
            } 
            
        },
        error: function(){
          console.log("error");
        }
    });
    
}

