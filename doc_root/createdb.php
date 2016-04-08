<?php
// creates a database from a json file

$data= readFile('db.json');

$data = json_decode($data);
$sql='';
foreach($data->resources as $table){
	$sql .= createTable($table);
}
die($sql); //========================================>

function createTable($data){
	$typesTranslation= ['string'=>'VARCHAR(250)', 'date'=>'DATETIME','float'=>'FLOAT'];
	$typesByFieldName= ['description'=> 'TEXT', 'id'=>'CHAR(23) NOT NULL'];
	$fields=[];
	
	$sql= "CREATE TABLE IF NOT EXISTS `$data->name` (\n";
	foreach($data->schema->fields as $field){
		if(isset($field->values))
			$type= "ENUM('". implode("','",$field->values) ."')";		
		else 
			$type= isset($typesByFieldName[$field->name]) ? $typesByFieldName[$field->name] : $typesTranslation[$field->type];
		
		$sql .= "`$field->name` $type ,\n";
	}
	if(isset($data->schema->primaryKey)){
		$pk= $data->schema->primaryKey;
		$sql.= "PRIMARY KEY (`$pk`),\n";	
	}
	if(isset($data->schema->foreignKeys)){
		$fkeys= $data->schema->foreignKeys;
		foreach($fkeys as $fkey){
			$otherTable= 
		
			$sql.= "CONSTRAINT  (`$fkey->fields`) REFERENCES  ()  ON DELETE CASCADE ON UPDATE CASCADE,\n";
		}
	}
	/*
	 * CONSTRAINT `fk_content_x_category_1`
    FOREIGN KEY (`content_id`)
    REFERENCES `nav4`.`content` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	 */
	$sql= trim($sql,"\n");
	$sql= trim($sql,",");
	
	
	$sql .= "\n) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8; \n\n"; 
	return $sql;
}