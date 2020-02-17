<?php
$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/';
include_once($path."model/connection.php");
include_once($path."model/Browser.class.php");


function getAllMovies(){ //Get all data from Films
    $connection = new connection();
    $query = $connection->prepare('SELECT * FROM films');
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
    
}

function getLimitMovies($nlimit,$noffset){ //Get limited data from Films by offset
    $connection = new connection();
    $query = $connection->prepare('SELECT * FROM films LIMIT :a OFFSET :b');
    $query->bindValue(':a', (int) $nlimit, PDO::PARAM_INT);
    $query->bindValue(':b', (int) $noffset, PDO::PARAM_INT);
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
    
}