<?php
if (isset($_GET['page'])){
	switch($_GET['page']){
		case "homepage";
			include("module/admin/module/home/view/homepage.php");
			break;
		case "controller_films";
			include("module/admin/module/films/controller/".$_GET['page'].".php");
			break;
		case "services";
			include("module/admin/module/services/".$_GET['page'].".php");
			break;
		case "aboutus";
			include("module/admin/module/aboutus/".$_GET['page'].".php");
			break;
		case "contactus";
			include("module/admin/module/contact/".$_GET['page'].".php");
			break;
		case "404";
			include("module/admin/view/inc/error".$_GET['page'].".php");
			break;
		case "503";
			include("module/admin/view/inc/error".$_GET['page'].".php");
			break;
		default;
			include("module/admin/view/inc/error404.php");
			break;
	}
}else{
	include("module/admin/module/home/view/homepage.php");
}
	
?>