<?php

$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/shop/model/DAO_Shop.php");



switch($_GET['op']){

    case 'listShop';
        include("module/client/module/shop/view/listFilms.php");
    break;


    break;

    case 'getMovies';
    //  echo json_encode($_GET['limit']."aaaa".$_GET['offset']);
    // exit; 
          $movies = getLimitMovies($_GET['limit'],$_GET['offset']);
 
        // $movies = getAllMovies();

        echo json_encode($movies);
        exit; 

    break;

    default:
        include("module/client/module/shop/view/listFilms.php");
    break;
}
