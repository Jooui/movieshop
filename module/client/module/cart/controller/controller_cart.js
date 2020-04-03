$(document).ready(function(){
    loadItemsCart();
    
});


function loadItemsCart(){


    if(localStorage.getItem('cart-items')==="null"){ // AL RECARGAR LA PAGINA COMPROBAR SI ESTABA EN EL DETAILS
        
    }else{
        var itemsQuantity = {};
        items = localStorage.getItem('cart-items').split(',');
        items.forEach(function(x) { itemsQuantity[x] = (itemsQuantity[x] || 0)+1; });
        var ArrLength = Object.keys(itemsQuantity).length;
        
        //ADD TITLE BASKET AND LENGTH OF PRODUCTS
        $('.cart-container').append(
            '<div class="title-cart">'+
                '<span data-tr="Basket"></span>'+
                '<span>('+ArrLength+')</span>'+
            '</div>'+
            '<div class="cart-items"></div>'
        );

        for (var key in itemsQuantity) {

            new Promise((resolve,reject) => {

                var obj = itemsQuantity[key];
                console.log(obj);
                
                getItemCart(key).then(function(data){
                    film = JSON.parse(data)[0]
                    console.log(film);

                    $('.cart-items').append(
                        '<div class="item-cart">'+
                            '<img class="item-cart-img" src="'+film.coverimg+'">'+
                            '<div class="item-info">'+
                                '<h4>'+film.title+'</h4>'+
                                '<div class="item-description">'+
                                    '<span style="margin-right:6px;font-weight: bold;">Director:</span>'+
                                    '<span style="margin-right:6px;">'+film.director+'</span>'+
                                    '<span style="margin-right:6px;font-weight: bold;">Release Date:</span>'+
                                    '<span>'+film.release_date+'</span>'+
                                '</div>'+
                                '<div class="price">'+
                                    '<span style="margin-right:6px;font-weight: bold;">€</span>'+
                                    '<span style="font-weight: bold;">12.60</span>'+
                                '</div>'+
                            '</div>'+
                            '<div class="item-buttons">'+
                                '<div class="item-quantity">'+
                                    '<a href="#" class="minus">-</a>'+

                                    '<input type="text" name="quantity" class="quantity-input" value="'+obj+'"/>'+

                                    '<a href="#" class="plus">+</a>'+
                                '</div>'+
                                '<a href="#" class="remove-item-cart" data-tr="Remove">Remove</a>'+
                            '</div>'+
                        '</div>'
                    );
                });
                resolve();
            });
        }
    }
}

var getItemCart = function(data) {
    return new Promise(function(resolve, reject){
        $.ajax({
            data: {"id":data},
            type: 'GET',
            url: '/movieshop/module/client/module/cart/controller/controller_cart.php?op=getItemCart',
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}