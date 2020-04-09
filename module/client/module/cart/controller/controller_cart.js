$(document).ready(function(){
    //saveItemsOnDB();
    loadItemsCart();
    
});

function itemsLSToArray(){
    items = localStorage.getItem('cart-items').split(',');
         
    items.sort();
    var arr = [];
    var current = null;
    var cnt = 0;
    for (var i = 0; i < items.length; i++) {
        if (items[i] != current) {
            if (cnt > 0) {
                arr.push({
                    "id":current,"cant":cnt
                });
            }
            current = items[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        arr.push({
            "id":current,"cant":cnt
        });
    }
    return arr;
}

function saveItemsOnDB(){
    console.log("entraFunc");

    var arr = itemsLSToArray();

    new Promise(function(resolve, reject){
        $.ajax({
            data: {
                "items":arr,
                "idUser":localStorage.getItem('user_id')
            },
            type: 'POST',
            url: '/movieshop/module/client/module/cart/controller/controller_cart.php?op=saveItemsCart',
            dataType: 'json',
        })
        .done(function(data){
            if (data == 'ok')
            resolve();

            console.log(data);
            resolve();
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })

}


function loadItemsCart(){
    console.log("1");
    

        $('.cart-container').empty();
        $('.cart-summary').empty();

        if(localStorage.getItem('cart-items')===null || localStorage.getItem('cart-items')==""){ // AL RECARGAR LA PAGINA COMPROBAR SI ESTABA EN EL DETAILS
            $('.cart-container').append(
                '<div class="title-cart">'+
                    '<span data-tr="Basket"></span>'+
                    '<span>(0)</span>'+
                '</div>'+
                '<div class="cart-items"></div>'
            );

            $('.cart-summary').append(
                '<h3>Order summary</h3>'+
                '<a href="#" class="purchase-button-summary" data-tr="Buy">Buy</a>'
            );

            $('.cart-items').append(
                '<span>Any item in the cart</span>'
            );
        }else{
            
            var arr = itemsLSToArray();

            //ADD TITLE BASKET AND LENGTH OF PRODUCTS
            $('.cart-container').append(
                '<div class="title-cart">'+
                    '<span data-tr="Basket"></span>'+
                    '<span>('+arr.length+')</span>'+
                '</div>'+
                '<div class="cart-items"></div>'
            );

            $('.cart-summary').append(
                '<h3>Order summary</h3>'+
                '<a href="#" class="purchase-button-summary" data-tr="Buy">Buy</a>'
            );

            
            for (let x = 0; x < arr.length; x++) {
                console.log("id= "+arr[x].id+" cantidad="+arr[x].cant);

                getItemCart(arr[x].id).then(function(data){
                    film = JSON.parse(data)[0]
                    console.log(film);

                    $('.cart-items').append(
                        '<div class="item-cart" id="'+film.id+'">'+
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
                                    '<a class="minus">-</a>'+

                                    '<input type="number" min="0" max="5" name="quantity" class="quantity-input" value="'+arr[x].cant+'"/>'+

                                    '<a class="plus">+</a>'+
                                '</div>'+
                                '<a class="remove-item-cart" data-tr="Remove">Remove</a>'+
                            '</div>'+
                        '</div>'
                    );
                });
            } //end-for
            setTimeout(function() {
                btnRemove();
                btnsQuantity(); 
            },500);
            
           
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

function btnRemove(){
    console.log("2");
    $('.remove-item-cart').on('click', function() {
        var p1 = $(this).parent();
        var parent = p1.parent();
        var parentID = parent.attr('id');

        items = localStorage.getItem('cart-items').split(',');
        console.log(items);

        filteredItems = items.filter(function(item) {
            return item !== parentID;
        });
        localStorage.setItem('cart-items',filteredItems);
        location.reload();
    });
}

function btnsQuantity(){
    $('.plus').on('click', function() {
        var p1 = $(this).parent();
        var p2 = p1.parent();
        var p3 = p2.parent();
        items = localStorage.getItem('cart-items').split(',');
        items.push(p3.attr('id'));
        localStorage.setItem('cart-items',items);
        location.reload();
    });
    
    $('.minus').on('click', function() {
        var p1 = $(this).parent();
        var p2 = p1.parent();
        var p3 = p2.parent();
        items = localStorage.getItem('cart-items').split(',');
        for (let i = 0; i < items.length; i++) {
            if (items[i] == p3.attr('id')){
                console.log(i);
                items.splice(i,1);
                break;
            }
            
        }
        localStorage.setItem('cart-items',items);
        location.reload();
    });

    $('.quantity-input').on('change', function() {
        var p1 = $(this).parent();
        var p2 = p1.parent();
        var p3 = p2.parent();
        items = localStorage.getItem('cart-items').split(',');
        items2=[];
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            if (items[i] != p3.attr('id')){
                items2.push(items[i]);
            }
        }
        console.log(items2);
        var leng=$(this).val();
        console.log(leng);
        for (let j = 0; j < leng; j++) {
            items2.push(p3.attr('id'));
        }
        console.log(items2);
        localStorage.setItem('cart-items',items2);
        location.reload();
    });
}