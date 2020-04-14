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

    case 'getUserBalance';
        $balance = getUserBalance($_GET['id_user']);

        echo json_encode($balance);
        exit;
    break;

    case 'pushPurchase';
        $items = $_POST['arr_items'];
        $userID = $_POST['id_user'];
        $totalMoney = 0;
        $price = 0;
        $subtract = 0;

        $user_balance1 = getUserBalance($userID);
        $user_balance = $user_balance1[0]->saldo;


        for ($x=0; $x < count($items); $x++) { 
            $itemPrice1 = getItemPrice($items[$x]['id']);
            $itemPrice = $itemPrice1[0]->price;
            $quant = $items[$x]['cant'];
            $price = ((float)$itemPrice * (int)$quant);
            $totalMoney = ($totalMoney + $price);
        }
        $total = round($totalMoney,2);
        $subtract = ($user_balance - $total);

        if ($subtract < 0){ //COMPROBAR QUE EL USUARIO TENGA SALDO SUFICIENTE
            echo json_encode(false);
            exit;
        }else{
            subtractBalance($userID,$subtract);

            for ($x=0; $x < count($items); $x++) { 
                pushPurchase($userID,$items[$x]['id'],$items[$x]['cant']);
            }
    
            for ($x=0; $x < count($items); $x++) { 
                deleteFromCart($userID,$items[$x]['id']);
            }
        }
        
    break;
}