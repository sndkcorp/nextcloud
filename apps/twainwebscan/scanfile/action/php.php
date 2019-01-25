<?php
$fileTempName = $_FILES['RemoteFile']['tmp_name'];
$fileSize = $_FILES['RemoteFile']['size'];
$fileName = "Dynamsoft_Upload\\" . $_FILES['RemoteFile']['name'];
$fileName = iconv("UTF-8", "gb2312", $fileName);
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
