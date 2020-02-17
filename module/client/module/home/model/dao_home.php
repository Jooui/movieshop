<?php
    $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/';
    include_once($path."model/connection.php");
    include_once($path."model/Browser.class.php");


function getTop10Films(){ //Get all data from Films
    $connection = new connection();
    $query = $connection->prepare('SELECT * FROM films ORDER BY score DESC LIMIT 10');
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
    
}

function getSixGenres(){ //Get all data from Films
    $connection = new connection();
    $query = $connection->prepare('SELECT * FROM genres LIMIT 6');
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ);
    
}

function getUsertype(){ //Get actual user
    $connection = new connection();
    $query = $connection->prepare('SELECT usertype FROM auth where id=1');
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ); 
}

function changeUsertype(){//(TITLE, DIRECTOR, DATE)
    $connection = new connection();
    $query = $connection->prepare('UPDATE auth SET usertype = "admin"  WHERE id = 1');
    $query->execute();
    $data = $query->fetch();
    $connection = null;
}