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

function getMovieById($id){
    $connection = new connection();
    $query = $connection->prepare('SELECT * FROM Films WHERE id = :id');
    $query->bindParam(':id', $id);
    $query->execute();
    $connection = null;
    //return $query->fetchObject();
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function getLimitMoviesByGenre($nlimit,$noffset,$genres){ //Get limited data filtered by genres
    $connection = new connection();
    $genreToString = $genres."";
    $query = $connection->prepare('SELECT f.*,g.id_genre from films f inner join films_genres g on f.id = g.id_film where g.id_genre in ('.$genreToString.') LIMIT :a OFFSET :b');
    $query->bindValue(':a', (int) $nlimit, PDO::PARAM_INT);
    $query->bindValue(':b', (int) $noffset, PDO::PARAM_INT);
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
    
}