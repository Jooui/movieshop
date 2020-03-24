<?php 
if (isset($_GET['page'])){
	switch($_GET['page']){
		case "shop":
			include("module/shop/view/inc/top_page_shop.php");
		break;
		case "contact":
			include("module/contact/view/inc/top_page_contact.php");
		break;
		case "login":
			include("module/login/view/inc/top_page_login.php");
		break;
	}
}else{
	include("module/home/view/inc/top_page.php");
}

?>
<!-- <body>  -->
		<header>
			<?php 
			if (isset($_SESSION['id'])){
				
				if (!isset($_GET['page'])){
					include("module/client/module/home/view/inc/header_home_user.html"); 
				}else{
					include("module/client/view/inc/header_user.html");
				}
			}else{
				if (!isset($_GET['page'])){
					include("module/client/module/home/view/inc/header_home.html"); 
				}else{
					include("module/client/view/inc/header_pages.html"); 
				}
			}
			?>
		</header>

		<main>
			<div class="container-wrapper">
				<?php include("view/inc/pages.php"); ?>

			</div>
		</main>

		<footer>
			<?php include("view/inc/footer.php"); ?>
		</footer>
<!-- </body>  -->

<?php include("view/inc/bottom_page.php"); ?>