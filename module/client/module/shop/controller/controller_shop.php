<?php

$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/shop/model/DAO_Shop.php");



switch($_GET['op']){

    case 'listShop';
        include("module/client/module/shop/view/shop.html");
    break;

    case 'getGenresFilters';
        
        $genres = getAllGenres();
        
        echo json_encode($genres);
        exit;

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
        
        $movies = getLimitMoviesByGenre($_GET['limit'],$_GET['offset'],$_GET['genres']);

        echo json_encode($movies);
        exit;

    break;

    case 'getMoviesFiltered';
        
        $movies = getMoviesFiltersGenres($_GET['limit'],$_GET['offset'],$_GET['idsGenres'],$_GET['order'],$_GET['dir']);

        echo json_encode($movies);
        exit;
        
    break;

    default:
        include("module/client/module/shop/view/shop.html");
    break;
}
