<?php
//$postdata = file_get_contents("php://input");
//$params = json_decode($postdata);

include_once 'db.php';
$params = (object) $_GET;

	$db = new db();
	
	$table = $params->table;
	if($params->table=='reviews')
		$ret= getReviews($db, $params);

	
    $result= ['total'=>count($ret) ];
    $result[$table]= $ret;
	die(json_encode($result));
//==============================================			
			
function getReviews($db, $params)
{
	$resource_id   = intval($params->resource_id);
	$resource_type = $params->resource_type;
		
	return $db->query("SELECT * FROM comments where resource_id = $resource_id  AND resource_type = '$resource_type' ");
}


