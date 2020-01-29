var path = "/movieshop/module/client/module/home/controller/controller.php";

$(document).ready(function(){


    $.ajax({
        type: 'GET',
        url: '/movieshop/module/client/module/home/controller/controller.php?op=rated-movies',
        dataType: 'json',
        async: false,
        data:{},
        success: function (data) { //$data es toda la informacion que nos retorna el ajax
          //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0]
            console.log(data);
            for(i = 0; i < 12; i++){

                $("#top-rated-movies").append(
                    '<div class="item movie-carousel"><h4>'+(i+1)+'</h4></div>'
                );
    
            }  
            
        },
        error: function(){
          console.log("error");
        }
    });



});
