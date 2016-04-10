<?php
//$postdata = file_get_contents("php://input");
//$params = json_decode($postdata);

include_once 'db.php';
$params = (object) $_GET;

	$db = new db();
	
	$table = $params->table;
	if($params->table=='reviews')
		$ret= getReviews($db, $params);
	elseif($params->table=='ratings')
		$ret= getRatings($db, $params);
    else 
    	throw new Exception("unknown table $table"); 
	
    $result= ['total'=>count($ret) ];
    $result[$table]= $ret;
	die(json_encode($result));
//==============================================			
			
function getReviews($db, $params)
{
	$resource_id   = $db->escape($params->resource_id);
	$resource_type = $db->escape($params->resource_type);
		
	return $db->query("SELECT * FROM reviews where resource_id = '$resource_id'  AND resource_type = '$resource_type' ");
}

function getRatings($db,$params){
	$idstr='';
	$ids= explode(",",$params->ids);
	$ids= array_unique($ids);
	foreach($ids as $id)
		$idstr .= "','".intval($id);
	$idstr= substr($idstr,3);
	$sql= "SELECT * FROM ratings where location_id IN ('$idstr') ";
	//die($sql);
	return $db->query($sql);
}
