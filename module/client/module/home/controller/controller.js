var path = "/movieshop/module/client/module/home/controller/controller.php";

function loadRatesMovies(){
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
                    '<div class="item movie-carousel" id="'+data[i].id+'">'+
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
            $('.movie-carousel').on('click', function() {
                id = $(this).attr('id');
                localStorage.setItem('text-movie',null);
                localStorage.setItem('shop-genre',null);
                localStorage.setItem('movie-details',id);
                location.href="index.php?page=shop";
            });
                         
        },
        error: function(){
          console.log("error");
        }
    });
}

function loadGenresOnScroll(){
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            getGenresMovies();
        }
    });
}

var getApiMovies = function(urlTitle) {
    title = urlTitle.split(' ').join('+');
    return new Promise(function(resolve, reject){
        $.ajax({
            type: 'GET',
            url: 'http://www.omdbapi.com/?s='+title+'&apikey='+API_OMDb+'&plot=full',
            dataType: 'json',
        })
        .done(function(data){
            console.log(data);
            resolve(data);
        })
        .fail(function(data){
            console.log(data);
            reject("Error");
        });
    })
}

function apiMovies(){

    getApiMovies("The lord of the rings").then(function(data){
        for(i = 0; i < 5; i++){
            $("#canvas-api-movies").append(
                '<div class="item movie-carousel card-api-movie" id="'+data.Search[i].imdbID+'">'+

                    '<img src="'+data.Search[i].Poster+'">'+
                    '<div class="canvas-score">'+
                        '<span class="score-movie-carousel"> <i class="fas fa-star score-star"></i>0</span>'+
                    '</div>'+
                    '<div class="footer-item">'+
                        '<span class="movie-title-footer">'+data.Search[i].Title+'</span>'+
                    '</div>'+
                    '<br> <span>'+data.Search[i].title+'</span>'+
                '</div>'
            );
        }
    });
}

function getGenresMovies(){
    getOffset = $('.card-genre').length;
    console.log(getOffset);
    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/home/controller/controller.php?op=get_genres_movies',
        dataType: 'json',
        async: false,
        data:{"offset":getOffset},
        success: function (data) {
            console.log(data);
            for(i = 0; i < data.length; i++){
                $("#canvas-card-genres").append(
                    '<div class="card-genre" id="'+data[i].id+'">'+
                        '<span class="card-genre-title">'+data[i].genre+" "+data[i].visits+'</span>'+
                    '</div>'
                );
            }
            
            $(".card-genre").on('click', function() {
                localStorage.setItem('movie-details', null);
                var cardID = $(this).attr('id');
                $.ajax({
                    type: 'GET',
                    url: "/movieshop/module/client/module/home/controller/controller.php?op=sumVisitGenre",
                    async: false,
                    data:{"id":cardID},
                    error: function(data) {
                        console.log(data);
                    }
                });
    
                localStorage.setItem('shop-genre', cardID);
                location.href="index.php?page=shop";
            });
        },
        error: function(){
          console.log("error");
        }
    });
}

function owlCarousel(){
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
}

function loadVisitedMovies(){
    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/home/controller/controller.php?op=visited-movies',
        dataType: 'json',
        async: false,
        data:{},
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
          //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0]
            console.log(data);
            for(i = 0; i < 10; i++){
                $urlCoverImage = data[i].coverimg;
                $("#top-visited-movies").append(
                    '<div class="item movie-carousel" id="'+data[i].id+'">'+
                        //'<img src="'+$urlCoverImage+'" style="width=170px; height: 230px;">'+
                        '<img src="'+$urlCoverImage+'">'+
                        '<div class="canvas-score">'+
                            '<span class="score-movie-carousel"> <i class="far fa-eye score-star"></i> '+data[i].visits+'</span>'+
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
            $('.movie-carousel').on('click', function() {
                id = $(this).attr('id');
                localStorage.setItem('movie-details',id);
                location.href="index.php?page=shop";
            });
                         
        },
        error: function(){
          console.log("error");
        }
    });
}

    $(document).ready(function(){

        loadRatesMovies();

        loadVisitedMovies()
        
        getGenresMovies();

        apiMovies();

        loadGenresOnScroll();
        
        owlCarousel();


        //ON CLICKS ----------------------
    
        $(".option").click(function(){
            $(".option").removeClass("active");
            $(this).addClass("active");
        });

        //END- ON CLICKS -----------------
    
    });