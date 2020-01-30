<?php

include_once("model/connection.php");

function getUsertype(){ //Get actual user
    $connection = new connection();
    $query = $connection->prepare('SELECT usertype FROM auth where id=1');
    $query->execute();
    $connection = null;
    return $query->fetchAll(PDO::FETCH_OBJ); 
}

$usertypeAry = getUsertype();
$usertype = $usertypeAry[0]->{'usertype'};


if ($usertype == "admin"){
    include("module/admin/index.php"); 
}else if ($usertype == "client"){
    include("module/client/index.php"); 
}
