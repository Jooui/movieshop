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

function getMovie($id){
    $connection = new connection();
    $query = $connection->prepare('SELECT * FROM Films WHERE id = :id');
    $query->bindParam(':id', $id);
    $query->execute();
    $connection = null;
    //return $query->fetchObject();
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function getMoviesFiltersGenres($nlimit,$noffset,$genres,$order = "title",$dir = "ASC"){
    $connection = new connection();
    $query = $connection->prepare('select distinct f.* from films_genres r inner join films f on r.id_film = f.id and r.id_genre in ('.$genres.') ORDER BY '.$order.' '.$dir.' LIMIT :a OFFSET :b');
    $query->bindValue(':a', (int) $nlimit, PDO::PARAM_INT);
    $query->bindValue(':b', (int) $noffset, PDO::PARAM_INT);
    $query->execute();             
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
}


function getGenresOfFilm($id){
        
    $connection = new connection();
    $query = $connection->prepare('SELECT genre FROM `genres` WHERE id IN (SELECT id_genre FROM `films_genres` where id_film = '.$id.')');
    $query->execute();             
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function getAllGenres(){
    $connection = new connection();
    $query = $connection->prepare('SELECT * FROM genres');
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function getGenresToString($id){
    
    $genres = getGenresOfFilm($id);
    
    $str1  = "";
    for ($i = 0; $i < sizeof($genres); $i++ ){
        $str1 = $str1 . $genres[$i]->genre . ",";
    }

    //remove last character ":"
    $str = substr($str1, 0, -1);
    return $str;
}

function getMovieById($id){
    $arrayMovie = getMovie($id);
    $genres = getGenresOfFilm($id);
    $arrayMovie['genres'] = $genres;
    return $arrayMovie;
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