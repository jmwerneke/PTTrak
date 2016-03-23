<?php
//$postdata = file_get_contents("php://input");
//$params = json_decode($postdata);
$params = (object) $_GET;

	$fname= '../hresources.sqlite';
	if(!file_exists($fname))
		die("cant find $fname");
	$db = new SQLite3($fname);
		

	$table = $params->table;
	if($params->table=='comments')
		$ret= getComments($db, $params);


	$error= $db->lastErrorMsg();
	$db->close();

	
    $result= ['total'=>count($ret) ];
    $result[$table]= $ret;
	die(json_encode($result));
			
			
function getComments($db, $params)
{
	$resource_id   = intval($params->resource_id);
	$resource_type = $params->resource_type;
	$records;
	
	$results = $db->query("SELECT * FROM comments where resource_id = $resource_id  AND resource_type = '$resource_type' ");
	while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
		$records[] = $row;
	}
	 return $records;
}