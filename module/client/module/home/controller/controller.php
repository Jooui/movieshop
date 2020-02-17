<?php

$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/home/model/dao_home.php");


switch($_GET['op']){

    case 'rated-movies';

        $movies = getTop10Films();

        echo json_encode($movies);
        exit;

    break;

    case 'get_genres_movies';
    //echo json_encode($movies);
    
       $movies = getSixGenres();
       echo json_encode($movies);

       exit;
        

    break;

    case 'usertype';

        changeUsertype();
        echo json_encode("true");
        exit;

    break;

}
