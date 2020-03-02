var numItemsShop = 0;
var idGenreOnLocalStorage = localStorage.getItem('shop-genre');
var urlAjax = "";

$(document).ready(function(){
    console.log(localStorage.getItem('movie-details'));
    if(localStorage.getItem('movie-details')=="null"){
        console.log("aaa")
        loadItems();
        loadItemsOnScroll();
        loadFilters();
        onClickGenre();
        // loadGenresCreate();
    }else{
        printDetails(localStorage.getItem('movie-details'));
    }
});

function backArrow(){
    $('.back-arrow').on('click', function() {
        console.log("click");
        localStorage.setItem('movie-details',null);
        location.reload();
    });
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
        break;
        }
    }
}

function onClickGenre(){
    $('.genre-filter').on('click',function() {
        $('#cardsContainer').empty();
        loadItems("checkbox");
        if (getValuesFilters()==null){
            loadItems();
        }
    });
}

function getValuesFilters(){
        lengthGenres = $('.genre-filter').length;
        films = $('.genre-filter');
        var idGenres1 = "";
        for (x=0; x<lengthGenres;x++){
            if(films[x].checked){
                idGenres1 = idGenres1+films[x].getAttribute('id')+",";
            }
        }
        if (idGenres1 == ""){
            return null;
        }
        idGenres = idGenres1.substring(0, idGenres1.length - 1);
        return idGenres;
}

function loadItemsOnScroll(){
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            loadItems();
        }
    });
}

function getDetails(){
    $('.get-details').on('click', function() {
        console.log("aaaa");

        var card = $(this).parent('.card-shop');
        var id = card.attr('id');
        localStorage.setItem('movie-details',id);
        
        printDetails(id);
        
    });
}

function loadFilters(){
    $('#filters-shop').append(
        '<h1 class="title-filters">Filters</h1>'+
        '<hr>'+
        '<span class="title-section">Order by:</span>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Release Date: </span>'+
            '<select id="date-select"><option value="ascendent">Ascendent</option><option value="descendent">Descendent</option></select>'+
        '</div>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Alphabetically: </span>'+
            '<select id="alph-select"><option value="ascendent">Ascendent</option><option value="descendent">Descendent</option></select>'+
        '</div>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Rating: </span>'+
            '<select id="rating-select"><option value="ascendent">Ascendent</option><option value="descendent">Descendent</option></select>'+
        '</div>'+
        '<hr>'+
        '<span class="title-section">Genres: </span>'+
        '<div class="genres-wrapper">'+
            // '<label class="label-genre"><input type="checkbox" id="1" value="action" class="genre-filter">Action</label>'+
            // '<label class="label-genre"><input type="checkbox" id="2" value="drama" class="genre-filter">Drama</label>'+
        '</div>'
    );
    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/shop/controller/controller_shop.php?op=getGenresFilters',
        dataType: 'json',
        async: false,
        data:{},
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
            for(i = 0; i < data.length; i++){
                $(".genres-wrapper").append(
                    '<label class="label-genre"><input type="checkbox" id="'+data[i].id+'" value="'+data[i].id+'" class="genre-filter">'+data[i].genre+'</label>'
                );
            }
        },
        error: function(data){
          console.log("error: "+data);
        }
      });
}

// function loadGenresCreate(){
//     $.ajax({
//       type: 'GET',
//       url: '/movieshop/module/client/module/shop/controller/controller_shop.php?op=getGenresFilters',
//       dataType: 'json',
//       async: false,
//       data:{},
//       success: function (data) { //$data es toda la informacion que nos retorna el ajax
//           for(i = 0; i < data.length; i++){
//               $(".genres-wrapper").append(
//                   '<label class="label-genre"><input type="checkbox" id="'+data[i].id+'" value="'+data[i].id+'" class="genre-filter">'+data[i].genre+'</label>'
//               );
//           }
//       },
//       error: function(data){
//         console.log("error: "+data);
//       }
//     });
//   }

function printDetails(id){
    $.ajax({
        type: 'GET',
        url: "/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMovieById",
        dataType: 'json',
        async: false,
        data:{"id":id},
        success: function (data) {
            
            console.log(data[0]);
            $('#cardsContainer').empty();
            $('.filters').hide();
            $('#loadingGif').empty();
            $('#details-movie').append(
                    '<i class="fas fa-arrow-left back-arrow"></i>'+
                    '<img src="module/client/view/img/banner-movie.jpg" class="img-banner-movie" alt="Banner movie">'+
                    "<div class='movie-info'>"+
                        '<div class="details-left">'+
                            "<img src='"+data[0].coverimg+"' id='img-movie' alt='img movie'>"+
                            '<div class="separator"></div>'+
                            '<div class="flex-row-center"><span data-tr="score">Score: </span><span>'+data[0].score+'</span></div>'+
                            '<div class="flex-row-center"><span data-tr="Date:">Date: </span><span>'+data[0].release_date+'</span></div>'+
                            '<div class="flex-row-center"><span data-tr="Genres:">Genres: </span><span>'+data[0].genres+'</span></div>'+
                        '</div>'+
                        
                        "<div class='details-right'>"+
                            "<h1 id='title-movie'>"+data[0].title+"</h1>"+
                            '<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>'+
                        "</div>"+
                    "</div>"
            );
            backArrow();
        },
        error: function(data) {
            console.log(data);
        }
    });
}

function loadItems(type = "default"){
    //localStorage.setItem('movie-details',null);
    console.log(getValuesFilters());
    numItemsShop = $('.card-shop').length;

    if (idGenreOnLocalStorage == null){
        console.log("entra if 1");
        urlAjax = "/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMovies";
    }else{
        console.log("entra if 3");
        urlAjax = "/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMoviesFilterGenres";
    }
    if(type != "default"){
        console.log("ENTRA AL ELSE IF");
        urlAjax = "/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMoviesCheckBox";
    }
    $.ajax({
        type: 'GET',
        url: urlAjax,
        dataType: 'json',
        async: false,
        data:{"limit":20,"offset":numItemsShop,"genres":idGenreOnLocalStorage,"idsGenres":getValuesFilters()},
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
          //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0]
            console.log(data);
            console.log("data");
            //sql: select f.* from films f inner join films_genres g on f.id = g.id_film where g.id_genre in (2)
            //for select every films of the selected genre (in LocalStorage)


            $("#loadingGif").html(
                
                '<img src="module/client/view/img/loadingGif.gif" class="loading-gif" alt="Loading">'
                
            );
            sleep(1000);
            
            //$('.loading-gif').remove();

           for(i = 0; i < data.length; i++){
                
                $urlCoverImage = data[i].coverimg;
    
              
                $("#cardsContainer").append(
                    '<div class="card-shop" id="'+data[i].id+'">'+
                        '<div class="card-shop-img get-details">'+
                           ' <img class="img-size" src="'+$urlCoverImage+'">'+
    
                        '</div>'+
                        '<div class="card-shop-data">'+
                            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>'+
                        '</div>'+
                        '<div class="info-button" id="info-button">'+
                            '<i class="fa fa-bars"></i>'+
                        '</div>'+
    
                        '<div class="card-shop-footer get-details">'+
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
            getDetails();
            backArrow();
        },
        error: function(){
          console.log("error");
        }
    });
    
}

