<?php
session_start();
$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/cart/model/dao_cart.php");


switch($_GET['op']){
    case 'getItemCart';
        
        $films = getItemCart($_GET['id']);
        echo json_encode($films);
        exit;
    break;
}