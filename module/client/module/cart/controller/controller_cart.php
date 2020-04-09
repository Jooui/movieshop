<?php
session_start();
$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/cart/model/dao_cart.php");


switch($_GET['op']){
    case 'getItemCart';
        
        $item = getItemCart($_GET['id']);
        echo json_encode($item);
        exit;
    break;

    case 'saveItemsCart';
        $items = $_POST['items'];
        deleteOldItemsUser($_POST['idUser']);
        for ($x=0; $x < count($items); $x++) { 
            newItemCart($_POST['idUser'],$items[$x]["id"],$items[$x]["cant"]);
        }
        
        echo json_encode("yes");
        exit;
    break;

    case 'getArrayItemsBD';
        $items = getArrayItemsCartBD($_GET['id_user']);

        echo json_encode($items);
        exit;
    break;
}