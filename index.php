<?php 
include("config.php"); 

?>
﻿<!DOCTYPE html>

<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <title>Merlin's Mediafire Streamer</title>
    <link rel="stylesheet" href="css/screen.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">        
    <script>
    <?php echo "var sessionToken = '". $sessionToken . "';\n";?> 
    </script>   
    <style>
        div#playerContainer {
            position: fixed;
            top: 5px;
            right: 5px;
            display:none;
        }
    </style>     
    </head>
    <body>
    <h1>Mediafire Mp3 streamer</h1>
<div class="container-fluid">
  <div class="row-fluid">
    <div class="span2">
  <h2>Folders</h2>
        <div id="folders"></div>
        <!-- Template of the Folders View -->
        <script type="text/template" id="foldersTemplate">
            <% _.each(folders, function (folder) { %>
            <p><a data-id="<%=folder.folderkey%>" data-name="<%=folder.name%>"><%=folder.name%></a></p> 
           <!-- <p><a data-id="<%=folder.folderkey%>" data-name="<%=folder.name%>" href="#folder/<%=folder.folderkey%>"><%=folder.name%></a></p>-->
            <% }); %>
        </script>
    </div>
    <div class="span10">
        <h2>Files</h2>
        <div id="files"></div>
        <script id="filesTemplate" type="text/template">
            <% _.each(files, function (file) { %>
            <p><a data-id="<%=file.quickkey%>" data-filename="<%=file.filename%>"><%=file.filename%></a></p>
            <% }); %>            
            
            
        </script>
    </div>
  </div>
</div>
<div id="playerContainer"></div>

        <script src="js/jquery-1.7.1.min.js"></script>
<!--        <script src="js/json2.js"></script>-->
        <script src="js/underscore-min.js"></script>
        <script src="js/backbone-min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>