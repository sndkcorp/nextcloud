<?php
//\OCP\Util::addScript('twainwebscan', 'scanner');
//\OCP\Util::addScript('twainwebscan', 'script1');
?>
<style>
img.scanned {
	height: 200px; /** Sets the display size */
	margin-right: 12px;
}

div#images {
	margin-top: 20px;
}
</style>
<script src="js/scanner.js" type="text/javascript"></script>
<div class="ct-lt clearfix" style="display:none">
	<div id="dwtcontrolContainer"></div>
</div>

<div id="dialog-form" class="oc-dialog-content">
	<div class="col-lg-12">
		<div class="input-group"> 
			<span class="input-group-addon text-maroon text-bold"> Enter the Name of File</span> 
			<input type="text" id="txtscanfile" class="form-control" value=""> 
		</div> 
		<div class="input-group">
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
		<div class="input-group"> 
			<label id="Label4">
				<input type="radio" name="scanside" id="RdbSingle" checked="checked" value="0"> Single Side
			</label>
			<label id="Label5"> 
				<input type="radio" name="scanside" id="RdbDup" value="1"> Duplex
			</label> 
		</div>
		<div class="input-group"> 
			<label id="Label6">
				<input type="radio" name="ImageType" id="pdf" checked="checked" value="pdf"> PDF
			</label>
			<label id="Label7"> 
				<input type="radio" name="ImageType" id="jpg" value="jpg"> JPG
			</label> 
		</div>
	</div>
	<input type="button" value="Scan" id="scanImage" class="btn mr20" />
</div>
<div id="div-uploadedFile"></div>