<?php	
	$strImageID = $_GET["imgID"];
	
	// Interacting with MySQL
	$servername = "127.0.0.1";
	$username = "root";
	$password = "awesome";
	$dbname = "dwtsample";
	$tablename = "uploadedimages";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} else {
		// Check Database Existance
		$db_selected = mysqli_select_db($conn, $dbname);
		if(!$db_selected) {
			// Create database
			$sql_newDB = "CREATE DATABASE ".$dbname;
			if ($conn->query($sql_newDB) === TRUE) {
				// echo "Database created successfully";
			} else {
				die("Error creating database: " . $conn->error);
			}			
		}
		mysqli_select_db($conn, $dbname);
		
		// Check Table Existance
		$sql_showtable = "SHOW TABLES LIKE '".$tablename."'";
		$rowcount = mysqli_num_rows($conn->query($sql_showtable));
		if ($rowcount > 0) {
			// echo "the table exists";
		} else {
			// sql to create table
			$sql_newtable = "CREATE TABLE ".$tablename." (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			document_name VARCHAR(30) NOT NULL,
			document_data longblob NOT NULL,
			reg_date TIMESTAMP
			)";
			if ($conn->query($sql_newtable) === TRUE) {
				// echo "Table ".$tablename." created successfully";
			} else {
				die("Error creating table: " . $conn->error);
			}
		}			
		if($strImageID == "new"){		
			$fileTempName = $_FILES['RemoteFile']['tmp_name'];	
			$fileSize = $_FILES['RemoteFile']['size'];
			$fileName = $_FILES['RemoteFile']['name'];
			$strFileSize = (string)intval($fileSize/1024)."KB";
			$fReadHandle = fopen($fileTempName, 'rb');
			$fileContent = fread($fReadHandle, $fileSize);
			fclose($fReadHandle);
			$imgIndex = 0;
			$sql_insertdata = "INSERT INTO ".$tablename." (document_name,document_data) VALUES ('".$fileName."','".addslashes($fileContent)."')";
			if ($conn->query($sql_insertdata) === TRUE) {
				// echo "File saved in db successfully.";
				$sql_getIndex = "SELECT id FROM ".$tablename;
				$IDs = $conn->query($sql_getIndex);
				if ($IDs->num_rows > 0) {
					// output data of each row
					while($row = $IDs->fetch_assoc()) {
						$_temp = intval($row["id"]);
						if($_temp > $imgIndex)
							$imgIndex = $_temp;
					}
				}
			} else {
				die("Error saving file: " . $conn->error);
			}
			$conn->close();
			echo "PHP:"."DWTUploadFileIndex:".strval($imgIndex)."DWTUploadFileName:".$fileName."UploadedFileSize:".$strFileSize;
		}
		else {
			$sql_getData = "SELECT * FROM ".$tablename." WHERE id = ".$strImageID;
			$result = $conn->query($sql_getData);
			if ($result->num_rows > 0) {
				// output data of each row
				while($row = $result->fetch_assoc()) {
					$documentName = $row["document_name"];
					$strImageExtName = substr($documentName, strlen($documentName) - 3);
					$documentData = $row["document_data"];
				}
			}
			$conn->close();
			//Begin writing headers
			header("Content-Description: File Transfer");
			$header="Content-Disposition: attachment; filename=".$documentName.";";
			header($header);
			header("Content-Transfer-Encoding: binary");

			if($strImageExtName == "bmp"){
				header('Content-Type: image/bmp');
			}else if($strImageExtName == "jpg"){
				header('Content-Type: image/jpg');
			}else if($strImageExtName == "tif"){
				header('Content-Type: image/tiff');
			}else if($strImageExtName == "png"){
				header('Content-Type: image/png');
			}else if($strImageExtName == "pdf"){
				header('Content-Type: application/pdf');
			}
			echo $documentData;
		}
	}
?>
