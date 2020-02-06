<?php

$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/shop/model/DAO_Shop.php");


switch($_GET['op']){

    case 'getMovies';

        $movies = getAllMovies();

        echo json_encode($movies);
        exit;

    break;

}
