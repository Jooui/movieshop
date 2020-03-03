<?php
    $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/';
    include_once($path."model/connection.php");
    include_once($path."model/Browser.class.php");

    function getGenres(){ //Get all data from Films
        $connection = new connection();
        $query = $connection->prepare('SELECT * FROM genres');
        $query->execute();
        $connection = null;
        return $query->fetchAll(PDO::FETCH_OBJ);
        
    }