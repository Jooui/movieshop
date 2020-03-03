$(document).ready(function(){
    onClicks();
});

function getGenresMovies(){
    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/search/controller/controller_search.php?op=get_genres',
        dataType: 'json',
        async: false,
        data:{},
        success: function (data) {
            for(i = 0; i < data.length; i++){
                $(".dropdown-wrapper").append(
                    '<label class="label-genre"><input type="checkbox" id="'+data[i].id+'" value="'+data[i].id+'" class="genre-filter">'+data[i].genre+'</label>'
                );    
            }  
        },
        error: function(){
          console.log("error");
        }
    });
}

function onClicks(){
    $('#search-genres').on('click', function() {
        if ($('#search-genres-dropdown').hasClass('toggled')){
            $('#search-genres-dropdown').removeClass('toggled');
            $('#search-genres-dropdown').css({
                "height": "0px"
            });
        }else{
            $('#search-genres-dropdown').addClass('toggled');
            $('#search-genres-dropdown').css({
                "height": "200px"
            });
        }
        
    });
}