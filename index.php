<?php
session_start();

include_once("model/connection.php");

// function getUsertype(){ //Get actual user
//     $connection = new connection();
//     $query = $connection->prepare('SELECT usertype FROM auth where id=1');
//     $query->execute();
//     $connection = null;
//     return $query->fetchAll(PDO::FETCH_OBJ); 
// }

// $usertypeAry = getUsertype();
// $usertype = $usertypeAry[0]->{'usertype'};
function getTypeUser(){
    if (isset($_SESSION['type'])){
        $type = $_SESSION['type'];
        if ($type == 'client'){
            return 'client';
        }else if($type == 'admin'){
            return 'admin';
        }
    }else{
        return 'client';
    }
}

$usertype = getTypeUser();
if ($usertype == "admin"){
    include("module/admin/index.php"); 
}else if ($usertype == "client"){
    include("module/client/index.php"); 
}else{
    include("module/client/index.php"); 
}
