<?php
$path = $_SERVER['DOCUMENT_ROOT'].'/movieshop/module/client/';
if (isset($_GET['page'])){
	switch($_GET['page']){
		case "homepage";
			include($path."module/home/view/homepage.html");
			break;
		case "controller_films";
			include($path."module/films/controller/".$_GET['page'].".php");
			break;
		case "services";
			include($path."module/services/".$_GET['page'].".php");
			break;
		case "aboutus";
			include($path."module/aboutus/".$_GET['page'].".php");
			break;
		case "contactus";
			include($path."module/contact/".$_GET['page'].".php");
			break;
		case "404";
			include($path."view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			include($path."view/inc/error".$_GET['page'].".php");
			break;
		default;
			include($path."module/home/view/homepage.html");
			break;
	}
}else{
	include($path."module/home/view/homepage.html");
}
	
?>