
$( document ).ready(function() {
    var dropdown = document.getElementsByClassName("dropdown_button");

    for (i = 0; i < dropdown.length; i++) {

        $( dropdown[i] ).on( "click", function() {

            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.height == "" || dropdownContent.style.height == "0px") {
                dropdownContent.style.height = "100px";
            } else {
                dropdownContent.style.height = "0px";
            }
        });
        
    }
    
    $('.button_VerticalMenu_canvas').on( "click", function() {
        $('.button_VerticalMenu_canvas').removeClass("buttonSelected");
        $(this).addClass("buttonSelected");

    });
    
        

    $( '#buttonSidebar' ).on( "click", function() {

        this.classList.toggle("open-sidebar");
        var sidebarArray = $('.verticalMenu');
        sidebar = sidebarArray[0];

        if (sidebar.style.width == "" || sidebar.style.width == "60px") {
            sidebar.style.width = "230px";
        } else {
            sidebar.style.width = "60px";
        }
        minibarArray = $('.no-minibar');

        widthNoLettersStr = sidebar.style.width.replace(/\D/g,'');

        widthNoLetters = parseInt(widthNoLettersStr, 10);

        canvasProfileItemsArray = $('.profile_VerticalMenu');
        canvasProfileItems = canvasProfileItemsArray[0];

        for (let i = 0; i < minibarArray.length; i++) {
            minibar = minibarArray[i];
            if (widthNoLetters < 70){
                console.log("entra if");
                canvasProfileItems.style.height = "0%";
                minibar.style.transition = "0.5s";
                minibar.style.width = "0%"
                //minibar.style.height = "0%"
                minibar.style.overflow = "hidden";
                //minibar.style.display = "none";
            
            }else{
                canvasProfileItems.style.height = "30%";
                minibar.style.transition = "0.5s";
                minibar.style.width = "100%"
                //minibar.style.height = "0%"
                minibar.style.overflow = "";
                //minibar.style.display = "block";
            }
        }
        /*if (sidebar.style.width == "70px")
                $('no-minibar').style.display = "none";
        else{
            $('no-minibar').style.display = "block";
        }*/

    });

    

});



