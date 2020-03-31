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

function addFav($id_movie,$id_user){
    $connection = new connection();
    $query = $connection->prepare('INSERT INTO user_favorites_movies (id_movie, id_user) VALUES (:id_movie, :id_user)');
    $query->bindParam(':id_movie', $id_movie);
    $query->bindParam(':id_user', $id_user);
    $query->execute();
}

function removeFav($id_movie,$id_user){
    $connection = new connection();
    $query = $connection->prepare('DELETE FROM user_favorites_movies WHERE id_movie = :id_movie AND id_user = :id_user');
    $query->bindParam(':id_movie', $id_movie);
    $query->bindParam(':id_user', $id_user);
    $query->execute();
}

function checkFavUser($id_movie, $id_user){
    $connection = new connection();
    $query = $connection->prepare('SELECT * FROM user_favorites_movies WHERE id_movie = :id_movie AND id_user = :id_user');
    $query->bindParam(':id_movie', $id_movie);
    $query->bindParam(':id_user', $id_user);
    $query->execute();
    $data = $query->fetch();
    $connection = null;
    if ($data){
        return true;
    }
    else{
        return false;
    }
}

function sumVisitMovie($id){
    $connection = new connection();
    $query = $connection->prepare("UPDATE films SET visits = visits + 1 WHERE id = ".$id);
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function sumVisitGenre($id){
    $connection = new connection();
    $query = $connection->prepare("UPDATE genres SET visits = visits + 1 WHERE id = ".$id);
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function getLimitMovies($nlimit,$noffset,$order = "title",$dir = "ASC"){ //Get limited data from Films by offset
    $connection = new connection();
    $query = $connection->prepare('SELECT *,(SELECT COUNT(*) FROM user_favorites_movies WHERE id_movie=f.id) as favs FROM films f ORDER BY '.$order.' '.$dir.' LIMIT :a OFFSET :b');
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

function countAllMovies(){
    $connection = new connection();
    $query = $connection->prepare('SELECT count(*) as total FROM films');
    $query->execute();             
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function getMoviesFiltersGenres($nlimit,$noffset,$genres,$order = "title",$dir = "ASC"){
    $connection = new connection();
    $query = $connection->prepare('SELECT distinct f.*,(SELECT COUNT(*) FROM user_favorites_movies WHERE id_movie=f.id) as favs from films_genres r inner join films f on r.id_film = f.id and r.id_genre in ('.$genres.') ORDER BY '.$order.' '.$dir.' LIMIT :a OFFSET :b');
    $query->bindValue(':a', (int) $nlimit, PDO::PARAM_INT);
    $query->bindValue(':b', (int) $noffset, PDO::PARAM_INT);
    $query->execute();             
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function getMoviesFiltersGenresCount($genres){
    $connection = new connection();
    $query = $connection->prepare('SELECT count(*) as total from films_genres r inner join films f on r.id_film = f.id and r.id_genre in ('.$genres.')');
    $query->execute();             
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
}

function getMoviesByTitle($nlimit,$noffset,$titleMovie,$order = "title",$dir = "ASC"){
    $connection = new connection();
    $query = $connection->prepare('SELECT *,(SELECT COUNT(*) FROM user_favorites_movies WHERE id_movie=f.id) as favs FROM films f WHERE title like "%'.$titleMovie.'%"  ORDER BY '.$order.' '.$dir.' LIMIT :a OFFSET :b');
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
    $query = $connection->prepare('SELECT f.*,g.id_genre,(SELECT COUNT(*) FROM user_favorites_movies WHERE id_movie=f.id) as favs from films f inner join films_genres g on f.id = g.id_film where g.id_genre in ('.$genreToString.') LIMIT :a OFFSET :b');
    $query->bindValue(':a', (int) $nlimit, PDO::PARAM_INT);
    $query->bindValue(':b', (int) $noffset, PDO::PARAM_INT);
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
    
}