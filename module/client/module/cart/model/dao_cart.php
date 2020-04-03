<?php
    $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/';
    include_once($path."model/connection.php");
    include_once($path."model/Browser.class.php");

    function getItemCart($id){
        $connection = new connection();
        $query = $connection->prepare('SELECT * FROM films WHERE id = (:id)');
        $query->bindValue(':id', (int) $id, PDO::PARAM_INT);
        $query->execute();             
        $connection = null;
        return $query->fetchAll(PDO::FETCH_OBJ);

    }