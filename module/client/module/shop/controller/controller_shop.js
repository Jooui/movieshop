$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMovies',
        dataType: 'json',
        async: false,
        data:{},
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
          //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0]
            for(i = 0; i < data.length; i++){
                
                $urlCoverImage = data[i].coverimg;
    
              
                $("#cardsContainer").append(
                    '<div class="card-shop">'+
                        '<div class="card-shop-img">'+
                           ' <img class="img-size" src="'+$urlCoverImage+'">'+
    
                        '</div>'+
                        '<div class="card-shop-data">'+
                            '<p>dadada  adad a fsdfsdfds fdsfushdf disu fuhuifhsd uihfuhf dou dfsdufh ohsdf uhfsdiu hifusdhfhu fiusdhf iuhfiudsh iuh iufhsdiu hfiush iuhfsdiuf iuh</p>'+
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
});

