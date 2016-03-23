<?php
// save.php     save comments, or any other file for that matter

$postdata = file_get_contents("php://input");
$params = json_decode($postdata);

//var_dump($request);

//if(empty($_POST))
//	die ('empty');

$fname= '../hresources.sqlite';
if(!file_exists($fname))
	die("cant find $fname");
$db = new SQLite3($fname);

/*	
	$results = $db->query('SELECT * FROM kitchens');
	while ($row = $results->fetchArray()) {
		var_dump($row);
	}
*/	

$ret;


if($params->table == 'comments')
	$ret= saveComment($db, $params);

	
$error= $db->lastErrorMsg();
$db->close();

if($ret==false){
	die($error);
}

die("ok");
	
		
function saveComment($db,$params){		
	
	$resource_id = intval($params->resource_id);
	$type = $params->resource_type;
	$body = $params->body;
	$rating= intval($params->rating);
	if(empty($resource_id) || empty($type))
		die ('missing resource_id type');
	
	return $db->query("INSERT INTO comments (resource_id, resource_type, body, rating ) 
			VALUES($resource_id, '$type', '$body', $rating)");
	
	
}		
		