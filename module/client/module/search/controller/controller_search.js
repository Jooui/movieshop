$(document).ready(function(){
    onClicks();
    loadGenres();
    autocomplete();
});

function loadGenres(){
    $.ajax({
      type: 'GET',
      url: '/movieshop/module/client/module/search/controller/controller_search.php?op=get_genres',
      dataType: 'json',
      async: false,
      data:{},
      success: function (data) { //$data es toda la informacion que nos retorna el ajax
          for(i = 0; i < data.length; i++){
              $("#genres").append(
                  '<option type="checkbox" value="'+data[i].id+'">'+data[i].genre+'</option>'
              );
          }
      },
      error: function(data){
        console.log("error: "+data);
      }
    });
  
    $('#genres').multipleSelect({
      minimumCountSelected: 8,
      selectAll: false
    });
  }

function onClicks(){
    $('.search-button').on('click', function() {
        if ($('#search-bar').val() == ""){
            localStorage.setItem('text-movie',null);
            getCheckedGenres();
            location.href="index.php?page=shop"; 
        }else{
            localStorage.setItem('shop-genre',null);
            localStorage.setItem('text-movie',$('#search-bar').val());
            location.href="index.php?page=shop";
        }
    });
}

function autocomplete(){
    $( "#search-bar" ).focus(function() {
        if ($( "#search-bar" ).val() != ""){
            keyupSearch();
        }
        $( "#search-bar" ).keyup(function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                if ($('#search-bar').val() == ""){
                    localStorage.setItem('text-movie',null);
                    getCheckedGenres();
                    location.href="index.php?page=shop"; 
                }else{
                    localStorage.setItem('shop-genre',null);
                    localStorage.setItem('text-movie',$('#search-bar').val());
                    location.href="index.php?page=shop";
                }
            }
            keyupSearch();
        });
    });
    $("#search-bar").blur(function(){
        if( $( "#search-bar" ).val() == "")
        $(".autocomplete-div").empty();
    });
}

function keyupSearch(){
    text = $( "#search-bar" ).val();
    console.log(text);
    $(".autocomplete-div").empty();
    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/search/controller/controller_search.php?op=getAutocomplete',
        dataType: 'json',
        async: false,
        data:{"text":text},
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
            for(i = 0; i < data.length; i++){
                $(".autocomplete-div").append(
                    '<div class="item-autocomplete" id="'+data[i].id+'">'+
                        '<img src="'+data[i].coverimg+'" class="img-item-autocomplete">'+
                        '<span class="text-item-autocomplete">'+data[i].title+'</span>'+
                        '<span class="text-item-autocomplete">Genres: </span>'+
                    '</div>'
                );
                onClickItemAuto();
            }
            
        },
        error: function(data){
            console.log("error: "+data);
        }
    });
}

function onClickItemAuto(){
    $('.item-autocomplete').on('click', function() {
        console.log("CLICK");
        itemId = $(this).attr('id');
        localStorage.setItem('movie-details',itemId);
        localStorage.setItem('type','title');
        location.href="index.php?page=shop";
    });
}

function getTitle(){
    textValue = $('#search-bar').val();
    localStorage.setItem('textSearch',textValue);
}

function getOrder(){
    valueOrder = $('#search-orders').val();
    localStorage.setItem('orderSearch',valueOrder);
}

function getCheckedGenres(){
    generos = $('#genres option');
    checkedGenres1 = "";
    for (let x = 0; x < generos.length; x++) {
        if (generos[x].selected){
            checkedGenres1 = checkedGenres1+generos[x].getAttribute('value')+",";
        }
    }
    checkedGenres = checkedGenres1.substring(0, checkedGenres1.length - 1);
    localStorage.setItem('shop-genre',checkedGenres);
}