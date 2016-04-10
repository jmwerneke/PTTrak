<?php
// save.php     save reviews, or any other file for that matter
/*
$postdata = file_get_contents("php://input");
$params = json_decode($postdata);
*/

// debugging
$params= (object) ['table' => 'reviews', 'resource_id'=>31, 'resource_type'=>'location', 'rating'=>3, 'body'=>'test'];


include_once 'db.php';

$db = new db();

$ret;
if($params->table == 'reviews')
	$ret= saveReview($db, $params);
else
	throw new Exception("unknown table $table");

if($ret===false){
	die($db->error);
}

die("ok");
	
		
function saveReview($db,$params){		
	
	$resource_id = intval($params->resource_id);
	$type = $db->escape($params->resource_type);
	$body = $db->escape($params->body);
	$rating= intval($params->rating);
	if($rating == 0 )
		$rating = 'null';
	if(empty($resource_id) || empty($type))
		die ('missing resource_id type');
	
	$result= $db->query("INSERT INTO reviews (resource_id, resource_type, body, rating ) 
			VALUES($resource_id, '$type', '$body', $rating)");
	
	//calculate a new average
	$result = $db->query("select avg(rating) as avg, count(rating) as cnt from reviews group by resource_id having  resource_id =$resource_id");
	$result = $result[0];
	$avg = round($result['avg']);
		
	// add a ratings record
	$sql="INSERT INTO ratings (location_id, rating, num_ratings) VALUES('{$resource_id}', {$avg}, {$result['cnt']}) 
				ON DUPLICATE KEY UPDATE rating = {$avg}, num_ratings = {$result['cnt']}  ";
	//echo($sql."\n");
	$db->query($sql);
}		
		