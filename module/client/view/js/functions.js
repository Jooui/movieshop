
$(document).ready(function(){

    //CHANGE HEADER-MAIN OPACITY WHILE SCROLLING DOWN
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        $(".header").css({
            "background-color": function(){
                var elementHeight = 390;
                var value = 1 - (elementHeight - scrollTop) / elementHeight;
                return "rgba(20, 20, 20," + value + " )";
            }        
        });
    }); 

    //FUNCTION FOR CHANGE THE LENGTH OF BORDER-BOTTOM
    /*$( "#header-login" ).hover(
        function() {
            $(this).css({
                "display": "block",
                "width": "20px",
                "border-bottom": "1px solid white",
                "border-bottom-width": "15px,"
            })
        }, function() {
            $(this).css({"border-bottom": "0px solid white"})
          }
      );*/

    $( "#header-login" ).hover(
        function() {
            $(this).css({
                "border-bottom": "1.3px solid white",
            })
        }, function() {
            $(this).css({"border-bottom": "1.3px solid transparent"})
        }
    );

    $('#header-login').on('click', function() {

        $.ajax({
            type: 'GET',
            url: '/movieshop/module/client/module/home/controller/controller.php?op=usertype',
            dataType: 'json',
            async: false,
            data:{},
            success: function (data) { //$data es toda la informacion que nos retorna el ajax
              //console.log(data[0]); data[0] porque (return $query->fetchAll(PDO::FETCH_OBJ);) retorna en array, al ser 1 hay que poner [0]
                location.href="index.php";
            },
            error: function(){
              console.log("error");
            }
        });
        
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
});