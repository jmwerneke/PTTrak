<?php
include_once 'doc_root/db.php';


$db = new db();

$r= $db->query("insert into reviews (resource_id, resource_type,rating ,body)  values(1,'location',3, 'this is a test')");
echo "result for insert: $r";

print_r($db->query('select * from reviews') );
