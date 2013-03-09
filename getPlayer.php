<?php

include("config.php");

$key = $_GET['key'];

$mp3file = $mflib->fileGetLinks($key, 'direct_download',$sessionToken); //gets the file url and prepares for streaming
$mp3stream = $mp3file['links'][0]["direct_download"]; //direct mp3 streaming url. to be used for embededed players. 
$ext = substr($mp3stream, -4);

if ($ext == ".mp3"){
?>
<div id="player" >

<audio src="<?=$mp3stream?>" controls autoplay preload="none" style="width:380px;">
<object data="http://reader.googleusercontent.com/reader/ui/3523697345-audio-player.swf" type="application/x-shockwave-flash" width="380" height="27">
<param name="src" value="http://reader.googleusercontent.com/reader/ui/3523697345-audio-player.swf" />
<param name="FlashVars" value="audioUrl=<?=$mp3stream?>&autoPlay=true" /></object>
</audio>
    <p id="title"></p>
</div>

<?php
} else {
    echo "not a valid .mp3 file";
}


?>