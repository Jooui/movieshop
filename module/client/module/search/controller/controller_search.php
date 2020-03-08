<?php

$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/search/model/DAO_search.php");


switch($_GET['op']){

    case 'get_genres';
    
       $genres = getGenres();
       echo json_encode($genres);

       exit;
        
    break;

    case 'getAutocomplete';
    
       $movies = getAutocomplete($_GET['text']);
       echo json_encode($movies);

       exit;
        
    break;
}
