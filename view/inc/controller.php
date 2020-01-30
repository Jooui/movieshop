<?php
session_start();

if (isset($_GET['type'])){

    if ($_GET['type']=='client'){
        include("module/client/index.php");
        
    }else if ($_GET['type']=='admin'){
        include("module/admin/index.php");
    }

}else{
    include("module/client/index.php");
}
