<?php
$_POST= ['resource_id'=>4,'type'=>'kitchen','body'=>'very nice people','rating'=>3];
if(empty($_POST))
	die ('empty');

	$fname= '../hresources.sqlite';
	if(!file_exists($fname))
		die("cant find $fname");
	$db = new SQLite3($fname);
		

	$table = $_POST['table'];
	if($table=='comment')
		$ret= getComments($db);


	$error= $db->lastErrorMsg();
	$db->close();

	$retArray= ['succes'=>1]
	if($ret==false){
		die($error);
	}

	die("ok");
			
			
function getComments($db, $resource_id, $type)
{
	$records;
	$id= intval($resource_id);
	$results = $db->query("SELECT * FROM comments where resource_id = $id  AND resource_type = '$type' ");
	while ($row = $results->fetchArray()) {
		$records[] = $row;
	}
	 return $records;
}