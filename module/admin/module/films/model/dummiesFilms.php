<?php
function randomName(){
  $names = array("VICENT", "WALTER", "JOAN", "MARIA", "DANIEL", "JOSEP", "SARA", "PEPA", "FELIPE", "JAUME",
  "SERGIO", "PACO", "EMILIO", "NANDO", "ALFONS", "EDUARD", "ATALIA", "VERONICA", "FINA", "PEPE", "OSCAR",
  "LORELAY", "JIM", "LOLA", "LAIA", "ISMAEL", "JORDI", "RAMON", "JAVIER", "NURIA", "ELENA", "BELTRAN",
  "PABLO", "JUANJO");

 $name = $names[array_rand($names)];
 return $name;
}

function randomDate(){
  $dates = array("5/23/2002","11/21/2002","3/27/2004","2/17/2005","6/16/2005","12/20/2005","5/31/2006",
  "4/28/2007","3/27/2008","5/4/2008","6/1/2008","7/28/2008","12/7/2008","12/28/2008","10/8/2009","2/14/2011",
  "2/23/2011","9/27/2012","10/9/2012","3/12/2014","7/31/2014","4/19/2016","10/5/2017","12/22/2018","5/12/2019");

   $date = $dates[array_rand($dates)];
   return $date;
 }
 
 function randomTitle(){
  $titles1 = array("Lost", "Only", "Last", "First", "Third", "Sacred", "Bold", "Lovely", "Final", "Missing",
   "Shadowy", "Seventh", "Dwindling", "Missing", "Absent", "Vacant", "Cold", "Hot", "Burning", "Forgotten",
   "Weeping", "Dying", "Lonely", "Silent", "Laughing", "Whispering", "Forgotten", "Smooth", "Silken",
   "Rough", "Frozen", "Wild", "Trembling", "Fallen", "Ragged", "Broken", "Cracked", "Splintered",
   "Slithering", "Silky", "Wet", "Magnificent", "Luscious", "Swollen", "Erect", "Bare", "Naked",
   "Stripped", "Captured", "Stolen", "Sucking", "Licking", "Growing", "Kissing", "Green", "Red", "Blue",
   "Azure", "Rising", "Falling", "Elemental", "Bound", "Prized", "Obsessed", "Unwilling", "Hard", "Eager",
   "Ravaged", "Twinkling", "Dwindling", "Missing", "Absent", "Vacant", "Cold", "Hot", "Burning",
   "Forgotten", "Some", "No", "All", "Every", "Each", "Which", "What", "Playful", "Silent", "Weeping",
   "Dying", "Lonely", "Silent", "Laughing", "Whispering", "Forgotten", "Smooth", "Silken", "Rough",
   "Frozen", "Wild", "Trembling", "Fallen", "Ragged", "Broken", "Cracked", "Splintered");
 
   $titles2 = array("Sons", "Child", "Children", "Illusion", "Sliver", "Destruction", "Crying", "Weeping",
   "Gift", "Word", "Words", "Thought", "Thoughts", "Scent", "Ice", "Snow", "Night", "Silk", "Guardian",
   "Angel", "Angels", "Secret", "Secrets", "Search", "Eye", "Eyes", "Danger", "Game", "Fire", "Flame",
   "Flames", "Bride", "Husband", "Wife", "Time", "Flower", "Flowers", "Light", "Lights", "Door", "Doors",
   "Window", "Windows", "Bridge", "Bridges", "Ashes", "Memory", "Thorn", "Thorns", "Name", "Names",
   "Future", "Past", "History", "Something", "Nothing", "Someone", "Nobody", "Person", "Man", "Woman",
   "Boy", "Girl", "Way", "Mage", "Witch", "Witches", "Lover", "Tower", "Valley", "Abyss", "Hunter",
   "Truth", "Edge");
 
   $title1 = $titles1[array_rand($titles1)];   
   $title2 = $titles2[array_rand($titles2)];
   

   $title = ($title1 . " " . $title2);
   return $title;
 }

 function randomGen($min, $max, $quantity) {
  $numbers = range($min, $max);
  shuffle($numbers);
  return array_slice($numbers, 0, $quantity);
 }
  
function randomGenre(){
  $genres = array("Drama", "Comedy", "Thriller", "Action", "Horror", "Crime", "Adventure", "Mistery", "Family", "Fantasy",
  "Sci-Fi", "Animation", "Biography", "History", "Musical", "War", "Sport", "Western");

  $randomNums = randomGen(0,17,3);
  
  $str1  = "";
  foreach ($randomNums as $num)  
    $str1 = $str1 . $genres[$num] . ":";

  //remove last character ":"
  $str = substr($str1, 0, -1);
  return $str;
}

function generateDummies(){
  
    for ($i = 0; $i < 100; $i++){
      
        $data = [
            "title" => randomTitle(),
            "director" => randomName(),
            "release_date" => randomDate(),
            "genres" => randomGenre()
        ];
        $return=array('datos'=>$data);
        if (findByTitle($data['title']) == false){
          save($return);

          //$x = save($return);
          /*if ($x == null){
            $callback="index.php?page=503";
            Browser::redirect($callback);
          }*/
        }
        
    }
}
