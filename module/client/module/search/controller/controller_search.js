$(document).ready(function(){
    onClicks();
    loadGenres();
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
            localStorage.setItem('textSearch',null);
            getCheckedGenres();
            getOrder();
            location.href="index.php?page=shop"; 
        }else{
            localStorage.setItem('genresSearch',null);
            getTitle();
            getOrder();
            location.href="index.php?page=shop";
        }
    
    });
}

function getTitle(){
    textValue = $('#search-bar').val();7
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
    localStorage.setItem('genresSearch',checkedGenres);
}