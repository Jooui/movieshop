<?php

$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/home/model/dao_home.php");


switch($_GET['op']){

    case 'rated-movies';

        $movies = getTop10Films();

        echo json_encode($movies);
        exit;

    break;

}
