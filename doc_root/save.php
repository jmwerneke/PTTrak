<?php
// save.php     save comments
$_POST= ['resource_id'=>4,'type'=>'kitchen','body'=>'very nice people','rating'=>3];
if(empty($_POST))
	die ('empty');

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
	
	$table = $_POST['table'];
	if($table=='comment')
		$ret= saveComment($db);
	
		
	$error= $db->lastErrorMsg();
	$db->close();
	
	if($ret==false){
		die($error);
	}
	
	die("ok");
	
		
function saveComment($db){		
	
	$resource_id= intval($_POST['resource_id']);
	$type = $_POST['type'];
	$body = $_POST['body'];
	$rating= intval($_POST['rating']);
	if(empty($resource_id) || empty($type))
		die ('missing resource_id type');
	
	return $db->query("INSERT INTO comments (resource_id, resource_type, body, rating ) 
			VALUES($resource_id, '$type', '$body', $rating)");
	
	
}		
		