<?php
$this->create('twainwebscan_index', '/')
	->actionInclude('twainwebscan/index.php');

$this->create('twainwebscan_ajax_scanupload', 'ajax/scanupload.php')
	->actionInclude('twainwebscan/ajax/scanupload.php');
	
$this->create('twainwebscan_scanapp', 'scanapp')
	->actionInclude('twainwebscan/scanapp.php');