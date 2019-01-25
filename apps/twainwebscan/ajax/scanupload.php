<?php
require_once(__DIR__ . '/Flow/Autoloader.php');
Flow\Autoloader::register();

$fileTempName = $_FILES['RemoteFile']['tmp_name'];
$fileSize = $_FILES['RemoteFile']['size'];

$userhome = OC_User::getHome(OC_User::getUser());
$path = $_POST['filepath'].'/';
//$fileName = $_FILES['RemoteFile']['name'];
$fileName = $_POST['filename'];
$fileName = iconv("UTF-8", "gb2312", $fileName);

/*
$count = count($_POST);
if ($count > 0) {
    $_fieldsTXT = fopen(substr($fileName, 0, strlen($fileName) - 4) . "_1.txt", "w");
    $_fields = "";
    foreach ($_POST as $key => $value) {
        $_fields = "FieldsTrue:";
        fwrite($_fieldsTXT, $key . " :  " . $value . PHP_EOL);
    }
}

if (file_exists($fileName)) {
    $fWriteHandle = fopen($fileName, 'w');
} else {
    $fWriteHandle = fopen($fileName, 'w');
}

$fReadHandle = fopen($fileTempName, 'rb');
$fileContent = fread($fReadHandle, $fileSize);
$strFileSize = (string) intval($fileSize / 1024) . "KB";
fwrite($fWriteHandle, $fileContent);
fclose($fWriteHandle);

echo $_fields . "DWTUploadFileName:" . $_FILES['RemoteFile']['name'] . "UploadedFileSize:" . $strFileSize;
exit;
*/
$temp = $userhome.'/.scantmp/';
$config = new \Flow\Config();
$config->setTempDir($temp);
	
if (\OC\Files\Filesystem::isValidPath($fileName)) 
{
	if(!file_exists($temp)) {
		mkdir($temp);
	}
	
	$dir = dirname($path.$fileName);
	if(!\OC\Files\Filesystem::file_exists($dir)) {
		\OC\Files\Filesystem::mkdir($dir);
	}
	if(move_uploaded_file($fileTempName, $userhome . "/files/" . $path . $fileName))
	{
		\OC\Files\Filesystem::touch($path.$fileName);
	}
	\Flow\Uploader::pruneChunks($temp);
}
$log = json_encode(array('result'=>0,'_FILES'=>$_FILES,'_POST'=>$_POST));
$myfile = file_put_contents('demoapp.txt', $log.PHP_EOL , FILE_APPEND | LOCK_EX);
//exec("php console.php files:scan $path -v 2>&1", $out, $result);
echo json_encode(array('status' => 'success','error' => 0,'message' => 'Request completed', 'data'=>array()));

?>
