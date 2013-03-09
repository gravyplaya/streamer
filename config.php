<?php
/*
 * Required parameters
 */
$appId = "33304";
$apiKey = "cw55u1h2prb40q79ac81e1970qk4cquemot8arv5";
$email = "";
$password = "";

/*
 * Initilize a new instance of the class
 */
include("mflib.php");

$mflib = new mflib($appId, $apiKey);
$mflib->email = $email;
$mflib->password = $password;

$sessionToken = $mflib->userGetSessionToken();
?>
