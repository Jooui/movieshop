<?php
session_start();
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

    case 'logout';
        unset($_SESSION['id']);
        unset($_SESSION['type']);
        echo json_encode('logout');
        exit;
    break;

    case 'regenerateSessionID';
        try {
            session_start();
            $old_id = session_id();
            session_regenerate_id();
            $new_id = session_id();
            echo json_encode('ok');
            exit;
        } catch ( Exception $e ) {
            echo json_encode('error');
            exit;
        }
        
    break;

    case 'checkSession';
        if (isset( $_SESSION['id']) && isset( $_SESSION['type'])){
            $LS_id = $_POST['id'];  //VARs in Local Storage
            $LS_type = $_POST['type'];
            $id_session = $_SESSION['id'];
            $type_session = $_SESSION['type'];
    
            if ($LS_id == $id_session && $LS_type == $type_session){
                echo json_encode('true');
                exit;
            }else{
                unset($_SESSION['id']);
                unset($_SESSION['type']);
                echo json_encode('false');
                exit;
            }
        }else{
            unset($_SESSION['id']);
            unset($_SESSION['type']);
            echo json_encode('false');
            exit;
        }
        
    break;
}

function saveSessionUser($data){
    $_SESSION['id'] = $data['id'];
    $_SESSION['type'] = $data['type'];
}

function validateLoginUser(){
    //comprobar que el email exista en la bbdd
    if (findByEmail($_POST['email-user'])==false){
        return $return=array('result'=>false,'errorEmail'=>'The account don\'t exists or incorrect password');
    }

    if (verifyPasswd($_POST['passwd-user'],$_POST['email-user'])==false){
        return $return=array('result'=>false,'errorPassword'=>'Incorrect password');
    }
    $info = userInfoSession($_POST['email-user']);
    $result = array(

        'email' => $info[0]->email,

        'username' => $info[0]->username,

        'id' => $info[0]->id,

        'type' => $info[0]->type,
        
        'avatar' => $info[0]->avatar,

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