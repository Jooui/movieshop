<?php

$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
include ($path."module/login/model/dao_login.php");


switch($_GET['op']){
    case 'createUser';
        $result = validateUser();
        $return = array(
            'result' => true,
        );
        if ($result['result']){
            newUser($result['data']);
            echo json_encode($return);
            exit;
        }else{
            echo json_encode($result);
            exit;
        }
    break;

    case 'loginUser';
        $result = validateLoginUser();
        
        if ($result['result']){
            
            saveSessionUser($result['data']);

            echo json_encode($result);
            exit;
        }else{
            echo json_encode($result);
            exit;
        }
    break;
}

function saveSessionUser(){
    
}

function validateLoginUser(){
    //comprobar que el email exista en la bbdd
    if (findByEmail($_POST['email-user'])==false){
        return $return=array('result'=>false,'errorEmail'=>'The account don\'t exists or incorrect password');
    }

    if (verifyPasswd($_POST['passwd-user'],$_POST['email-user'])==false){
        return $return=array('result'=>false,'errorPassword'=>'Incorrect password');
    }

    $result = array(

        'email' => $_POST['email-user'],

        'password' => $_POST['passwd-user'],

    );
    return $return=array('result'=>true,'data'=>$result);
}

function validateUser(){
    if (findByUsername($_POST['username'])){
        return $return=array('result'=>false,'errorUsername'=>'The username already exists');
    }

    if (findByEmail($_POST['email-user-sign'])){
        return $return=array('result'=>false,'errorEmail'=>'The email already exists');
    }
    $result = array(
        'username' => $_POST['username'],

        'email' => $_POST['email-user-sign'],

        'password' => $_POST['passwd-user'],

    );
    return $return=array('result'=>true,'data'=>$result);
}