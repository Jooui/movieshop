var path = "/movieshop/module/client/module/home/controller/controller.php";

$(document).ready(function(){

    $('.material-card > .mc-btn-action').click(function () {
        var card = $(this).parent('.material-card');
        var icon = $(this).children('i');
        icon.addClass('fa-spin-fast');

        if (card.hasClass('mc-active')) {
            card.removeClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-arrow-left')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-bars');

            }, 800);
        } else {
            card.addClass('mc-active');

            window.setTimeout(function() {
                icon
                    .removeClass('fa-bars')
                    .removeClass('fa-spin-fast')
                    .addClass('fa-arrow-left');

            }, 800);
        }
    });


    $(".option").click(function(){
        $(".option").removeClass("active");
        $(this).addClass("active");
        
     });     

    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/home/controller/controller.php?op=rated-movies',
        dataType: 'json',
        async: false,
        data:{},
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
          //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0]
            console.log(data);
            for(i = 0; i < 10; i++){
                $urlCoverImage = data[i].coverimg;
                $("#top-rated-movies").append(
                    '<div class="item movie-carousel">'+
                        //'<img src="'+$urlCoverImage+'" style="width=170px; height: 230px;">'+
                        '<img src="'+$urlCoverImage+'">'+
                        '<div class="canvas-score">'+
                            '<span class="score-movie-carousel"> <i class="fas fa-star score-star"></i> '+data[i].score+'</span>'+
                        '</div>'+
                        '<div class="canvas-num-top">'+
                            '<span class="num-movie-carousel">'+(i+1)+'</span>'+
                        '</div>'+
                        '<div class="footer-item">'+
                            '<span class="movie-title-footer">'+data[i].title+'</span>'+
                        '</div>'+
                        '<br> <span>'+data[i].title+'</span>'+
                    '</div>'
                );
    
            }  
            
        },
        error: function(){
          console.log("error");
        }
    });
    $('.owl-carousel').owlCarousel({
        
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            400:{
                items:1
            },
            630:{
                items:2
            },
            910:{
                items:3
            },
            1230:{
                items:4
            },
            1525:{
                items:5
            }
        }
    });
    $( ".owl-prev").html('<i class="fa fa-chevron-left prev-slide arrows-carousel"></i>');
    $( ".owl-next").html('<i class="fa fa-chevron-right next-slide arrows-carousel"></i>');

    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/home/controller/controller.php?op=get_genres_movies',
        dataType: 'json',
        async: false,
        data:{},
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
          //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0] 
            
        },
        error: function(){
          console.log("error");
        }
    });


});
