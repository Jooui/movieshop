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

    function findItemInCart($id_user,$id_item){
        $connection = new connection();
        $query = $connection->prepare('SELECT * FROM cart_items WHERE id_item = :id_item AND id_user = :id_user');
        $query->bindParam(':id_item', $id_item);
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

    function deleteOldItemsUser($id_user){
        $connection = new connection();
        $query = $connection->prepare('DELETE FROM cart_items WHERE id_user = :id_user');
        $query->bindParam(':id_user', $id_user);
        $query->execute();
    }
    

    function newItemCart($id_user,$id_item,$quantity){
        $connection = new connection();
        $query = $connection->prepare('INSERT INTO cart_items(id_user,id_item,quantity) VALUES(:id_user,:id_item,:quantity)');
        $query->bindParam(':id_item', $id_item);
        $query->bindParam(':id_user', $id_user);
        $query->bindParam(':quantity', $quantity);
        $query->execute();
    }

    function getArrayItemsCartBD($id_user){
        $connection = new connection();
        $query = $connection->prepare('SELECT * FROM cart_items WHERE id_user = :id_user');
        $query->bindParam(':id_user', $id_user);
        $query->execute();
        $connection = null;
        return $query->fetchAll(PDO::FETCH_OBJ);
    }