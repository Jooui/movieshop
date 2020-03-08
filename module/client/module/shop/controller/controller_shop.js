var urlAjax = "";

$(document).ready(function(){
    if(localStorage.getItem('movie-details')=="null"){ // AL RECARGAR LA PAGINA COMPROBAR SI ESTABA EN EL DETAILS
        //AQUÍ checkFilters()  EN CASO DE HABER GENEROS EN LOCALSTORAGE
        loadItems(); //Show movies
        loadFilters(); //Se cargan dinamicamente todos los filtros
        infoButtonClick(); //Mostrar o esconder breve descipción de la pelicula
        onClickGenre(); //Al clicar un genero
        onOrderChange(); //Si cambia un select de order
        toggleFilters(); //MARCA LOS FILTROS QUE ESTÁN EN LocalS, al reload page se marcan automaticamente
        loadItemsOnScroll(); //Cargar la funcion para cargar más movies al hacer scroll (dinamicamente)
    }else{
        printDetails(localStorage.getItem('movie-details'));
    }
});


function loadItems(type = "title",mode = "asc"){
    console.log(type);
    console.log(mode);
    numItemsShop = $('.card-shop').length; //OBTENER CUANTAS PELICULAS HAY PARA CARGAR 20 MAS

    //CONTROLLER PARA SABER QUE BUSCAR (HAY GENEROS?, ALGUN FILTRO ORDER SELECCIONADO?)
    if (localStorage.getItem('shop-genre')==="null"){
        console.log("1");
        console.log(localStorage.getItem('mode'));
        console.log("fin");
        if (!localStorage.hasOwnProperty('type') || !localStorage.hasOwnProperty('mode')){
            console.log("1.1");
            urlAjax = "/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMovies";
            ajaxData = {                        
                "limit":20,
                "offset":numItemsShop,
                "idsGenres":localStorage.getItem('shop-genre'),
                "order":"title",
                "dir":"asc"
            };
        }else{
            console.log("1.2");
            urlAjax = "/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMovies";
            ajaxData = {                        
                "limit":20,
                "offset":numItemsShop,
                "idsGenres":localStorage.getItem('shop-genre'),
                "order":localStorage.getItem('type'),
                "dir":localStorage.getItem('mode')
            };
        }
        
    }else{
        urlAjax = "/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMoviesFiltered";
        ajaxData = {                        
            "limit":20,
            "offset":numItemsShop,
            "idsGenres":localStorage.getItem('shop-genre'),
            "order":type,
            "dir":mode
        };
    }

    if (localStorage.getItem('text-movie')!=="null"){
        urlAjax = "/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMoviesByTitle";
        ajaxData = {                        
            "limit":20,
            "offset":numItemsShop,
            "titleMovie":localStorage.getItem('text-movie'),
            "order":"title",
            "dir":"asc"
        };
    }

    $.ajax({
        type: 'GET',
        url: urlAjax,
        dataType: 'json',
        async: false, //,"genres":idGenreOnLocalStorage,"idsGenres":idsGenresType
        data: ajaxData,
        success: function (data) {
            console.log(data);
            $("#loadingGif").html(
                
                '<img src="module/client/view/img/loadingGif.gif" class="loading-gif" alt="Loading">'
                
            );
            //sleep(1000);
            if (data.length == 0){
                $("#cardsContainer").append(
                    '<span>NO SE HA ENCONTRADO NINGUN RESULTADO</span>'
                );
            }else{
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
                                            '<i class="far fa-eye"></i>'+
                                            '<span>'+data[i].visits+'</span>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
                    );
                } 
            }
            
            getDetails();
            backArrow();
        },
        error: function(){
          console.log("error");
        }
    });
    
}

function toggleFilters(){
    lengthGenres = $('.genre-filter').length;
    films = $('.genre-filter');
    LSGenres = localStorage.getItem('shop-genre').split(',');

    for (let i = 0; i < LSGenres.length; i++) { //toggle genres
        console.log(LSGenres[i]);
        for (x=0; x<lengthGenres;x++){
            if(films[x].getAttribute('id')==LSGenres[i]){
                films[x].checked = true;
            }
        }
    }

    switch (localStorage.getItem('type')) {
        case "title":
            $("#release_date").val('asc');
            $("#score").val('asc');
            $("#visits").val('asc');
            $("#title").val(localStorage.getItem('mode'));
            break;
        
        case "release_date":
            $("#title").val('asc');
            $("#score").val('asc');
            $("#visits").val('asc');
            $("#release_date").val(localStorage.getItem('mode'));
            break;
        
        case "score":
            $("#title").val('asc');
            $("#release_date").val('asc');
            $("#visits").val('asc');
            $("#score").val(localStorage.getItem('mode'));
            break;

        case "visits":
            $("#title").val('asc');
            $("#release_date").val('asc');
            $("#score").val('asc');
            $("#visits").val(localStorage.getItem('mode'));
            break;
    }
}

function infoButtonClick(){
    $('.info-button').on('click', function() { //ABRIR INFORMACION FILM AL PULSAR BOTON INFO
        var card_img = $(this).parent().find('.card-shop-img');

        if (!card_img.hasClass('toggled')){
            $('.card-shop-img').removeClass('toggled')
            card_img.addClass('toggled');
        }else{
            card_img.removeClass('toggled');
        }

        var card_data = $(this).parent().find('.card-shop-data');

        if (!card_data.hasClass('toggled-data')){
            $('.card-shop-data').removeClass('toggled-data')
            card_data.addClass('toggled-data');
        }else{
            card_data.removeClass('toggled-data');
        }
    });
}

function saveGenresOnLS(){
    lengthGenres = $('.genre-filter').length;
    films = $('.genre-filter');
    var idGenres1 = "";
    for (x=0; x<lengthGenres;x++){
        if(films[x].checked){
            idGenres1 = idGenres1+films[x].getAttribute('id')+",";
        }
    }
    if (idGenres1 == ""){
        localStorage.setItem('shop-genre',null);
        return null;
    }
    idGenres = idGenres1.substring(0, idGenres1.length - 1);
    localStorage.setItem('shop-genre',idGenres);
    return idGenres;
}

function onClickGenre(){
    $('.genre-filter').on('click',function() {
        id = $(this).attr('id');
        localStorage.setItem("text-movie",null);
        $.ajax({
            type: 'GET',
            url: "/movieshop/module/client/module/shop/controller/controller_shop.php?op=sumVisitGenre",
            async: false,
            data:{"id":id},
            error: function(data) {
                console.log(data);
            }
        });
        saveGenresOnLS();
        $('#cardsContainer').empty();
        loadItems();
    });
}

function onOrderChange(){
    $('.order-filter').on('change',function() {
        $('#cardsContainer').empty();
        type = $(this).attr("id");
        mode = $(this).val();
        localStorage.setItem('type',type);
        localStorage.setItem('mode',mode);
        toggleFilters();
        loadItems();
    });
}

function loadFilters(){
    $('#filters-shop').append(
        '<h1 class="title-filters">Filters</h1>'+
        '<hr>'+
        '<div class="item-filter">'+
            '<input type="text" name="search-bar" id="search-bar-filter" placeholder="Write the name of the movie .." autocomplete="off">'+
            '<a href="#" class="button-search-filter" >search</a>'+
        '</div>'+
        '<hr>'+
        '<span class="title-section">Order by:</span>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Alphabetically: </span>'+
            '<select id="title" class="order-filter"><option value="asc">Ascendent</option><option value="desc">Descendent</option></select>'+
        '</div>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Release Date: </span>'+
            '<select id="release_date" class="order-filter"><option value="asc">Ascendent</option><option value="desc">Descendent</option></select>'+
        '</div>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Rating: </span>'+
            '<select id="score" class="order-filter"><option value="asc">Ascendent</option><option value="desc">Descendent</option></select>'+
        '</div>'+
        '<div class="item-filter">'+
            '<span class="sub-title-filter">Visits: </span>'+
            '<select id="visits" class="order-filter"><option value="asc">Ascendent</option><option value="desc">Descendent</option></select>'+
        '</div>'+
        '<hr>'+
        '<span class="title-section">Genres: </span>'+
        '<div class="genres-wrapper">'+
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


function getDetails(){
    $('.get-details').on('click', function() {

        var card = $(this).parent('.card-shop');
        var id = card.attr('id');
        localStorage.setItem('movie-details',id);
        
        printDetails(id);
        
    });
}

function loadItemsOnScroll(){
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            loadItems();
        }
    });
}

function backArrow(){
    $('.back-arrow').on('click', function() {
        console.log("click");
        localStorage.setItem('movie-details',null);
        location.reload();
    });
}

function printDetails(id){

    $.ajax({
        type: 'GET',
        url: "/movieshop/module/client/module/shop/controller/controller_shop.php?op=sumVisit",
        async: false,
        data:{"id":id},
        error: function(data) {
            console.log(data);
        }
    });

    $.ajax({
        type: 'GET',
        url: "/movieshop/module/client/module/shop/controller/controller_shop.php?op=getMovieById",
        dataType: 'json',
        async: false,
        data:{"id":id},
        success: function (data) {
            
            $('#cardsContainer').hide();
            $('#filters-shop').hide();
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
                            '<div class="flex-row-center"><span data-tr="Visits:">Visits: </span><span>'+data[0].visits+'</span></div>'+
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