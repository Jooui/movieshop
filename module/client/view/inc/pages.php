<?php
$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
if (isset($_GET['page'])){
	switch($_GET['page']){
		case "homepage";
			include($path."module/home/view/homepage.html");
			break;
		case "controller";
			include($path."module/home/controller/".$_GET['page'].'.php');
			break;
		case "controller_films";
			include($path."module/films/controller/".$_GET['page'].".php");
			break;
		case "404";
			include($path."view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			include($path."view/inc/error".$_GET['page'].".php");
			break;
		case "shop";
			include($path."module/shop/view/listFilms.html");
			//include($path."module/shop/controller/controller_shop.php");
			break;
		case "contact";
			include($path."module/contact/view/contact.html");
			break;
		default;
			include($path."module/home/view/homepage.html");
			break;
	}
}else{
	include($path."module/home/view/homepage.html");
}
	
?>