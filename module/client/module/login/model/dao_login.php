<?php
    $path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/';
    include_once($path."model/connection.php");
    include_once($path."model/Browser.class.php");

    function newUser($data){
        $hash_passwd = password_hash($data['password'], PASSWORD_DEFAULT);
        $connection = new connection();
        $query = $connection->prepare('INSERT INTO ' . 'users' . ' (username, password, email, avatar, type) VALUES (:username, :password, :email, "module/client/module/login/view/img/default_avatar.png", "client")');
        $query->bindParam(':username', $data['username']);
        $query->bindParam(':password', $hash_passwd);
        $query->bindParam(':email', $data['email']);
        // $query->bindParam(':genres', $data['datos']['genres']);
        $query->execute();
    }

    function findByEmail($email){
        $connection = new connection();
        $query = $connection->prepare('SELECT * FROM users WHERE email = :email');
        $query->bindParam(':email', $email);
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

    function findByUsername($username){
        $connection = new connection();
        $query = $connection->prepare('SELECT * FROM users WHERE username = :username');
        $query->bindParam(':username', $username);
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

    function verifyPasswd($password,$email){
        $connection = new connection();
        $query = $connection->prepare('SELECT password FROM users WHERE email = :email');
        $query->bindParam(':email', $email);
        $query->execute();
        $data = $query->fetch();
        $connection = null;

        if (password_verify($password, $data['password'])){
            return true;
        }
        else{
            return false;
        }
    }