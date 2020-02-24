<?php

$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/shop/model/DAO_Shop.php");



switch($_GET['op']){

    case 'listShop';
        include("module/client/module/shop/view/shop.html");
    break;


    break;

    case 'getMovieById';
        $movie = getMovieById($_GET['id']);

        echo json_encode($movie);
        exit;

    break;

    case 'getMovies';

        $movies = getLimitMovies($_GET['limit'],$_GET['offset']);

        echo json_encode($movies);
        exit; 

    break;

    case 'getMoviesFilterGenres';
        // echo json_encode($_GET['genres']);
        // exit;
        
        $movies = getLimitMoviesByGenre($_GET['limit'],$_GET['offset'],$_GET['genres']);

        echo json_encode($movies);
        exit;
    break;

    default:
        include("module/client/module/shop/view/shop.html");
    break;
}
