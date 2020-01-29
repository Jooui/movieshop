<?php
//include_once("pages/DAO_Films.php");

	function validate_film_php($type){
		$error='';
		if ($type == "edit" && getTitleById($_GET['id'])!=$_POST['title']){
			
			if(findByTitle($_POST['title'])){
				$error='This film already exists';
				return $return=array('resultado'=>false,'error'=>$error);
			};
		}
		
		if(isset($_POST["genres"])){ 
			$str1  = "";
			foreach ($_POST['genres'] as $subject)  
				$str1 = $str1 . $subject . ":";

			//remove last character ":"
			$str = substr($str1, 0, -1);
		} 

		$resultado = array(
			'title' => $_POST['title'],

			'director' => $_POST['director'],

			'release_date' => $_POST['release_date'],

			'genres' => $str
		);
		return $return=array('resultado'=>true,'error'=>$error,'datos'=>$resultado);
    }
    
    function debug($array){
		echo "<pre>";
		print_r($array);
		echo "</pre><br>";
	}