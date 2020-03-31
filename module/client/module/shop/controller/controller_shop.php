<?php

$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/shop/model/DAO_Shop.php");



switch($_GET['op']){

    case 'sumVisit';
        sumVisitMovie($_GET['id']);
    break;

    case 'sumVisitGenre';
        sumVisitGenre($_GET['id']);
    break;

    case 'addFav';
        addFav($_POST['id_movie'],$_POST['id_user']);
    break;

    case 'checkFavUser';
       $fav = checkFavUser($_GET['id_movie'],$_GET['id_user']);
        // echo json_encode($fav);
        // exit;
        echo json_encode($fav);
        exit;
    break;

    case 'removeFav';
        removeFav($_POST['id_movie'],$_POST['id_user']);
    break;

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

        $movies = getLimitMovies($_GET['limit'],$_GET['offset'],$_GET['order'],$_GET['dir']);

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

    case 'getMoviesFilteredCount';
        
        $movies = getMoviesFiltersGenresCount($_GET['idsGenres']);

        echo json_encode($movies[0]->total);
        exit;
        
    break;

    case 'getMoviesByTitle';
        
        $movies = getMoviesByTitle($_GET['limit'],$_GET['offset'],$_GET['titleMovie'],$_GET['order'],$_GET['dir']);

        echo json_encode($movies);
        exit;
        
    break;

    case 'countAllMovies';
        
        $movies = countAllMovies();

        echo json_encode($movies[0]->total);
        exit;
        
    break;
    
    default:
        include("module/client/module/shop/view/shop.html");
    break;
}
