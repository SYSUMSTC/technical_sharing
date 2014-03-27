<?php
$name = $_POST["name"];
$mode= $_POST["mode"];
if($mode == "read"){
	$count = read_file($name);
	echo $count;
}else if($mode == "write"){
	$count = read_file($name);
	$message = $count + 1;
	$result = write_file($name,$message);
	echo $result;
}
function read_file($name){
	if(!file_exists("${name}.txt")){
		return 0;
	}
	$file = fopen("${name}.txt","r");
	$filemsg = "";
	while (!feof($file)) {
		$line = fgets($file);
		$filemsg .= $line;
	}
	fclose($file);
	return $filemsg;
}
function write_file($name,$message){
	$file = fopen("${name}.txt","w+");
	$filemsg = "ok";
	if(!fwrite($file,$message)){
		$filemsg = "error";
	}
	fclose($file);
	return $filemsg;
}
?>