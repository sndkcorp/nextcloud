<?php
//\OCP\User::checkLoggedIn();
//\OCP\Util::addScript('twainwebscan/scanfile/Resources', 'dynamsoft.webtwain.config.js');
//\OCP\Util::addScript('twainwebscan/scanfile/Resources', 'dynamsoft.webtwain.initiate.js');
//\OCP\Util::addScript('twainwebscan', 'script1');

//\OCP\Util::addScript('files', 'upload');
//\OCP\Util::addScript('files', 'merged-index');
//echo OC::$WEBROOT;	/core/vendor/jquery/dist/jquery.min.js
?>
<script type="text/javascript" data-cfasync="false" src="<?php echo OC::$WEBROOT . '/core/vendor/jquery/dist/jquery.min.js'; ?>"></script>
<script type="text/javascript" data-cfasync="false" src="<?php echo OC::$WEBROOT . '/apps/twainwebscan/scanfile/Resources/dynamsoft.webtwain.config.js'; ?>"></script>
<script type="text/javascript" data-cfasync="false" src="<?php echo OC::$WEBROOT . '/apps/twainwebscan/scanfile/Resources/dynamsoft.webtwain.initiate.js'; ?>"></script>
<link rel="stylesheet" href="<?php echo OC::$WEBROOT . '/apps/twainwebscan/scanfile/css/webtwain.css' ?>">

<div id="load"></div>
<div id="main">
	<div class="container">
		<div class="ct-lt clearfix" style="display:none">
			<div id="dwtcontrolContainer"></div>
		</div>
		<div class="ct-rt">
			<div class="content clearfix">
				<div class="section">
					<div id="dialog-form" class="oc-dialog-content">
						<div class="col-lg-12">
							<div class="input-group mt10"> 
								<span class="input-group-addon text-maroon text-bold"> Select Device</span> 
								<select name="devicelist" id="devicelist"><option>Select</option></select>
							</div> 
							<div class="input-group mt10"> 
								<span class="input-group-addon text-maroon text-bold"> Name of File</span> 
								<input type="text" id="txtscanfile" class="form-control" value="<?php echo "scan_".time(); ?>" placeholder="Enter the Name of File"> 
							</div> 
							<div class="input-group mt10">
								<label id="Label1"> 
									<input type="radio" name="scantype" id="RdbBW" checked="checked" value="0"> BW 
								</label>
								<label id="Label2">
									<input type="radio" name="scantype" id="Rdbgrayscale" value="1"> GrayScale
								</label>  
								<label id="Label3"> 
									<input type="radio" name="scantype" id="RdbColor" value="2"> Color
								</label> 
							</div>
							<div class="input-group mt10"> 
								<label id="Label4">
									<input type="radio" name="scanside" id="RdbSingle" checked="checked" value="0"> Single Side
								</label>
								<label id="Label5"> 
									<input type="radio" name="scanside" id="RdbDup" value="1"> Duplex
								</label> 
							</div>
							<div class="input-group mt10 radioGroup">
								Upload file format:
								<label for="jpeg" style="margin-right: 12px;">
									<input type="radio" value="png" name="ImageType" id="jpeg" checked="checked" /> PNG
								</label>
								<label for="pdf">
									<input type="radio" value="pdf" name="ImageType" id="pdf" /> PDF
								</label>
								<!--<label for="tiff" style="margin-right: 12px;">
									<input type="radio" value="tif" name="ImageType" id="tiff" /> TIF
								</label> onclick="AcquireImage();" -->
							</div>
						</div>
					</div>
					<input type="button" value="Scan" id="cmdScan" class="btn mr20" />
				</div>
				
				
				<div class="section" style="width:100%; float:left;display:none">
					<div>Uploaded Files</div>
					<div id="resultWrap">
						<table id='div-uploadedFile'>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" data-cfasync="false" src="<?php echo OC::$WEBROOT . '/apps/twainwebscan/scanfile/js/script.js'; ?>"></script>