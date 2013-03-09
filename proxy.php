<?php
include("config.php");
$key = (isset($_GET['key']) ? $_GET['key'] : '');
$type = (isset($_GET['type']) ? $_GET['type'] : '');
$chunk = (isset($_GET['chunk']) ? $_GET['chunk'] : '');
header('Content-Type: application/json; charset=utf-8');


//returns subfolders of given folderkey
If ($type == 'fo') {
   $folders = $mflib->folderGetContent($key,$sessionToken); 
    //echo json_encode($folders);
    echo $_GET['callback'] . ' (' . json_encode($folders) . ');'; 
    
}
//returns files of given folderkey
If ($type == 'fi') {
   $files = $mflib->folderGetContent($key,$sessionToken, 'files',null,null,$chunk);
    //echo json_encode($files['files']);   
    echo $_GET['callback'] . '(' . json_encode($files) . ');'; 
}



?>