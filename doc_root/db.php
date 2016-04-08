<?php
class db
{
	public $conn; // the connection , mysqli object
	public $errno;
	public $error;
	function __construct()
	{
		$this->conn = new mysqli('localhost', 'sacsos_user', 'ilike7', 'sacsos');
		// GRANT ALL PRIVILEGES ON *.* TO `sacsos_user`@`*` identified by 'ilike7';
		
	}

	function query($sql){
		$this->errno = $this->error='';
		
		$result = $this->conn->query($sql, $db);
		if($result==false){
			$this->errno = $this->conn->errno;
			$this->error = $this->conn->error;
		}
		return $result->fetch_all(MYSQLI_ASSOC);
	}
	
	
}


