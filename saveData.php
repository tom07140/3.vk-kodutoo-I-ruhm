<?php
  $file_title = "data.txt";

  //faili sisu
  $entries_from_file = file_get_contents($file_title);

  //string objektideks
  $entries = json_decode($entries_from_file);
  //?title=nimi&ingredients=koostis
  if(isset($_GET["description"]) && isset($_GET["test"])){
    //ei ole tühjad
    if(!empty($_GET["description"]) && !empty($_GET["test"])){
      $object = new StdClass();
      $object->description = $_GET["description"];
      $object->test = $_GET["test"];

      array_push($entries, $object);

      $json_string = json_encode($entries);

      file_put_contents($file_title, $json_string);
    }
  }
  echo(json_encode($entries));
 ?>
