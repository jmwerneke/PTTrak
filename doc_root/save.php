<?php
// save.php     save comments, or any other file for that matter

$postdata = file_get_contents("php://input");
$params = json_decode($postdata);

//var_dump($request);

//if(empty($_POST))
//	die ('empty');

include_once 'db.php';

$db = new db();

$ret;
if($params->table == 'comments')
	$ret= saveReview($db, $params);


if($ret==false){
	die($db->error);
}

die("ok");
	
		
function saveReview($db,$params){		
	
	$resource_id = intval($params->resource_id);
	$type = $params->resource_type;
	$body = $params->body;
	$rating= intval($params->rating);
	if(empty($resource_id) || empty($type))
		die ('missing resource_id type');
	
	return $db->query("INSERT INTO comments (resource_id, resource_type, body, rating ) 
			VALUES($resource_id, '$type', '$body', $rating)");
	
	
}		
		