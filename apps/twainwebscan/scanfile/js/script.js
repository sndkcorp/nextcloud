Dynamsoft.WebTwainEnv.AutoLoad = false;
Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', Dynamsoft_OnReady); // Register OnWebTwainReady event. This event fires as soon as Dynamic Web TWAIN is initialized and ready to be used

var DWObject, blankField = "",
    extrFieldsCount = 0, upload_returnSth = true,
    strHTTPServer = location.hostname, strActionPage, strFullActionPagePath, ObjString,
    CurrentPathName = unescape(location.pathname),
    CurrentPath = CurrentPathName.substring(0, CurrentPathName.lastIndexOf("/") + 1);

window.onload = function () {
    if (Dynamsoft) {
        Dynamsoft.WebTwainEnv.Load();
    }
};

function Dynamsoft_OnReady() {
    //blankField = document.getElementsByClassName('div-fields-item')[0].cloneNode(true);
    DWObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    if (DWObject) {
        DWObject.Width = 505;
        DWObject.Height = 600;
		
        if (DWObject.ErrorCode == 0) {
            DWObject.LogLevel = 1;
            DWObject.IfAllowLocalCache = true;
            DWObject.BufferMemory = 800;
            DWObject.RegisterEvent("OnPostAllTransfers", UploadImage);
        }
		
		getSelectionSource();
    }
}

function getSelectionSource() {
	var SourceCount = DWObject.SourceCount;
	//console.log(SourceCount);
	var devicelist = document.getElementById('devicelist');
	for(var d=0; d < SourceCount; d++)
	{
		
		if(d == 0)
			devicelist.options.add( new Option(DWObject.SourceNameItems(d),d, true, true) );
		else
			devicelist.options.add( new Option(DWObject.SourceNameItems(d),d) );
	}
}

function AcquireImage() {
	
    if (DWObject) {
		
		var txt = document.getElementById('txtscanfile');
        if (txt.value.trim() == '') {
            alert('Enter the File Name!!', 'warning');
			txt.focus();
            return false;
        }
        
        var filter = /^[a-zA-Z0-9 _]+$/;
        var test_bool = filter.test(txt.value);
        if (test_bool == false) {
            alert('Please Enter Only Alphabets and Number', 'warning');
            txt.focus();
            return false;
        }
		
		DWObject.RemoveAllImages();
		DWObject.CloseSource();
		var d = DWObject.OpenSource();
        if (d == true) {
			DWObject.IfShowUI = false;
			
			if (document.getElementById("devicelist").value != "") { DWObject.SelectSourceByIndex( + document.getElementById("devicelist").value); }
			if (document.getElementById("RdbBW").checked == true) { DWObject.PixelType = 0; }
			if (document.getElementById("Rdbgrayscale").checked == true) { DWObject.PixelType = 1; }
			if (document.getElementById("RdbColor").checked == true) { DWObject.PixelType = 2; }
			DWObject.Resolution = 150;
			if (DWObject.PixelType == 0) { DWObject.Resolution = 200; }
			DWObject.IfFeederEnabled = false;
			DWObject.IfDuplexEnabled = false;
			if (document.getElementById("RdbDup").checked == true) {
				//DWObject.IfDuplexEnabled = true;
			}
			
			objScanIfDisableSourceAfterAcquire = true;
			DWObject.AcquireImage();
		}
	}
	else
		console.log('Error:Code-404');
}

function OnHttpUploadSuccess() {
    console.log('successful');
}

function OnHttpServerReturnedSomething(errorCode, errorString, sHttpResponse) {
	console.log('info-1');
	console.log(errorCode);
    if (errorCode != 0 && errorCode != -2003)
        alert(errorString);
    else {
        //var textFromServer = sHttpResponse;
		//console.log('info');
        //_printUploadedFiles(textFromServer);
		console.log('info');
		var cdir = parent.getURLParameter('dir');
		parent.FileList.changeDirectory(cdir,true,true);
		var l = parent.$('#dialog-box');
		parent.$(l).ocdialog("close");
		
    }
}

function _printUploadedFiles(info) {	//notinuse
    //console.log(info);
    if (info.indexOf('DWTUploadFileName') != -1) {
        var url, _strPort;
        DWObject.IfSSL = Dynamsoft.Lib.detect.ssl;
        _strPort = location.port == "" ? 80 : location.port;
        url = 'http://' + location.hostname + ':' + location.port;
        if (Dynamsoft.Lib.detect.ssl == true) {
            _strPort = location.port == "" ? 443 : location.port;
            url = 'https://' + location.hostname + ':' + location.port;
        }
        var savedIntoToDB = false, imgIndexInDB = "-1";
        if (info.indexOf("DWTUploadFileIndex:") != -1) {
            savedIntoToDB = true;
            imgIndexInDB = info.substring(info.indexOf('DWTUploadFileIndex') + 19, info.indexOf('DWTUploadFileName'));
            //console.log(imgIndexInDB);
        }
        var fileName = info.substring(info.indexOf('DWTUploadFileName') + 18, info.indexOf('UploadedFileSize'));
        var fileSize = info.substr(info.indexOf('UploadedFileSize') + 17);
        if (savedIntoToDB) {
            if (info.indexOf('CSHARP') != -1) {
                url += CurrentPath + 'action/csharp-db.aspx?imgID=' + imgIndexInDB;
            }
            else if (info.indexOf('VBNET') != -1) {
                url += CurrentPath + 'action/vbnet-db.aspx?imgID=' + imgIndexInDB;
            }
            else if (info.indexOf('PHP') != -1) {
                url += CurrentPath + 'action/php-mysql.php?imgID=' + imgIndexInDB;
            }
            else if (info.indexOf('JSP') != -1) {
                url += CurrentPath + 'action/jsp-oracle.jsp?imgID=' + imgIndexInDB;
            }
        }
        else {
            url += CurrentPath + 'action/Dynamsoft_Upload/' + encodeURI(fileName);
        }
        var newTR = document.createElement('tr');
        _str = "<td class='tc'><a class='bluelink'" + ' href="' + url + '" target="_blank">' + fileName + "</a></td>" + "<td class='tc'>" + fileSize + '</td>';
        if (info.indexOf("FieldsTrue:") != -1)
            _str += "<td class='tc'><a class='bluelink'" + '" href="' + url.substring(0, url.length - 4) + '_1.txt' + '" target="_blank">Fields</td>';
        else {
            _str += "<td class='tc'>No Fields</td>";
        }
        newTR.innerHTML = _str;
        document.getElementById('div-uploadedFile').appendChild(newTR);
		
		var cdir = parent.getURLParameter('dir');
		parent.FileList.changeDirectory(cdir,true,true);
		var l = parent.$('#dialog-box');
		parent.$(l).ocdialog("close");
		
    }
}

function upload_preparation(_name) {
    DWObject.IfShowCancelDialogWhenImageTransfer = false;
    DWObject.IfSSL = Dynamsoft.Lib.detect.ssl;
    var _strPort = location.port; //== "" ? 80 : location.port;
	strActionPage = parent.OC.generateUrl('apps/twainwebscan/ajax/scanupload.php');
	//strActionPage += 'scanupload.php';
	//var strHostIP = 'http://drive.bnpmail.com';
	
	if (Dynamsoft.Lib.detect.ssl == true) {
        strFullActionPagePath = "https://" + strHTTPServer + strActionPage;
    } 
	else {
        strFullActionPagePath = "http://" + strHTTPServer + strActionPage;
    }
	
	console.log(strFullActionPagePath);
	//strFullActionPagePath =	strHostIP+'/'+strActionPage; //twainwebscan/ajax
	
	//strFullActionPagePath =	'http://drive.bnpmail.com/nc/index.php/apps/files/ajax/scanupload.php';
	//strFullActionPagePath =	'http://drive.bnpmail.com/index.php/apps/twainwebscan/ajax/scanupload.php';
	
    DWObject.HTTPPort = _strPort;
}

function UploadImage() {
    if (DWObject.HowManyImagesInBuffer == 0)
        return;
	
	var txt = document.getElementById('txtscanfile');
			
    var i, aryIndices = [], Digital = new Date(),
        uploadfilename =  txt.value.trim();  //Digital.getMilliseconds();
    
	upload_preparation(uploadfilename);
	
	var cdir = parent.getURLParameter('dir');
	
    if (document.getElementsByName('ImageType')[0].checked) 
	{
        var count = DWObject.HowManyImagesInBuffer;
        aryIndices = [];
        for (i = 0; i < count; i++) aryIndices.push(i);
		
		//console.log("Count-"+(count - aryIndices.length))
		
        var uploadJPGsOneByOne = function (errorCode, errorString, sHttpResponse) {
            if (errorCode != 0 && errorCode != -2003) {
                alert(errorString);
                return;
            }

            if (upload_returnSth)
                _printUploadedFiles(sHttpResponse);
			
            if (aryIndices.length > 1) 
			{
                if (upload_returnSth)
				{
					DWObject.SetHTTPFormField("filename", uploadfilename + "-" + (count - aryIndices.length) + ".png");
					DWObject.SetHTTPFormField("filepath", cdir);
			
                    DWObject.HTTPUpload(strFullActionPagePath, aryIndices.splice(0, 1), EnumDWT_ImageType.IT_PNG, EnumDWT_UploadDataFormat.Binary, uploadfilename + "-" + (count - aryIndices.length) + ".png", OnHttpUploadSuccess, uploadJPGsOneByOne);
				}
                else
				{
					DWObject.SetHTTPFormField("filename", uploadfilename + "-" + (count - aryIndices.length) + ".png");
					DWObject.SetHTTPFormField("filepath", cdir);
			
                    DWObject.HTTPUpload(strFullActionPagePath, aryIndices.splice(0, 1), EnumDWT_ImageType.IT_PNG, EnumDWT_UploadDataFormat.Binary, uploadfilename + "-" + (count - aryIndices.length) + ".png", uploadJPGsOneByOne, OnHttpServerReturnedSomething);
				}
            }
        };
		
        if (upload_returnSth)
		{
			DWObject.SetHTTPFormField("filename", uploadfilename + "-" + (count - aryIndices.length) + ".png");
			DWObject.SetHTTPFormField("filepath", cdir);
		
            DWObject.HTTPUpload(strFullActionPagePath, aryIndices.splice(0, 1), EnumDWT_ImageType.IT_PNG, EnumDWT_UploadDataFormat.Binary, uploadfilename + "-" + (count - aryIndices.length) + ".png", OnHttpUploadSuccess, uploadJPGsOneByOne);
		}
        else
		{
			DWObject.SetHTTPFormField("filename", uploadfilename + "-" + (count - aryIndices.length) + ".png");
			DWObject.SetHTTPFormField("filepath", cdir);
			
            DWObject.HTTPUpload(strFullActionPagePath, aryIndices.splice(0, 1), EnumDWT_ImageType.IT_PNG, EnumDWT_UploadDataFormat.Binary, uploadfilename + "-" + (count - aryIndices.length) + ".png", uploadJPGsOneByOne, OnHttpServerReturnedSomething);
		}
    }
    else if (document.getElementsByName('ImageType')[1].checked) {
        aryIndices = [];
        for (i = 0; i < DWObject.HowManyImagesInBuffer; i++) aryIndices.push(i);
		
		DWObject.SetHTTPFormField("filename", uploadfilename + ".pdf");
		DWObject.SetHTTPFormField("filepath", cdir);
			
        DWObject.HTTPUpload(strFullActionPagePath, aryIndices, EnumDWT_ImageType.IT_PDF, EnumDWT_UploadDataFormat.Binary, uploadfilename + ".pdf", OnHttpUploadSuccess, OnHttpServerReturnedSomething);
		
    }
    else if (document.getElementsByName('ImageType')[2].checked) {
        aryIndices = [];
        for (i = 0; i < DWObject.HowManyImagesInBuffer; i++) aryIndices.push(i);
        DWObject.HTTPUpload(strFullActionPagePath, aryIndices, EnumDWT_ImageType.IT_TIF, EnumDWT_UploadDataFormat.Binary, uploadfilename + ".tif", OnHttpUploadSuccess, OnHttpServerReturnedSomething);
    }
	
	console.log('complete');
	console.log(DWObject.ErrorCode);
	if(DWObject.ErrorCode == 0)
	{
		document.getElementById('load').style.visibility="visible";
		setTimeout(function(){
			document.getElementById('load').style.visibility="hidden";
			//var cdir = parent.getURLParameter('dir');
			parent.FileList.changeDirectory(cdir,true,true);
			var l = parent.$('#dialog-box');
			parent.$(l).ocdialog("close");		
			//parent.$( "a.oc-dialog-close" ).trigger( "click" );
			
		}, 3000);
	}			
	//console.log(DWObject.ErrorCode);
}

/*******************/
/* Upload to Azure */

var Base64Binary = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    decode: function (input, arrayBuffer) {
        //get last chars to see if are valid
        var lkey1 = this._keyStr.indexOf(input.charAt(input.length - 1));
        var lkey2 = this._keyStr.indexOf(input.charAt(input.length - 2));
        var bytes = (input.length / 4) * 3;
        if (lkey1 == 64) bytes--; //padding chars, so skip
        if (lkey2 == 64) bytes--; //padding chars, so skip		
        var uarray;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        var j = 0;
        if (arrayBuffer)
            uarray = new Uint8Array(arrayBuffer);
        else
            uarray = new Uint8Array(bytes);
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        for (i = 0; i < bytes; i += 3) {
            //get the 3 octects in 4 ascii chars
            enc1 = this._keyStr.indexOf(input.charAt(j++));
            enc2 = this._keyStr.indexOf(input.charAt(j++));
            enc3 = this._keyStr.indexOf(input.charAt(j++));
            enc4 = this._keyStr.indexOf(input.charAt(j++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            uarray[i] = chr1;
            if (enc3 != 64) uarray[i + 1] = chr2;
            if (enc4 != 64) uarray[i + 2] = chr3;
        }
        return uarray;
    }
};

document.onreadystatechange = function () {
  parent.$('#dialog-box').css('background','#fff');
  var state = document.readyState
  if (state == 'complete') {
	  setTimeout(function(){
		  document.getElementById('interactive');
		 document.getElementById('load').style.visibility="hidden";
	  },1000);
  }
}

$(document).ready(function() {
	$("#cmdScan").on('click', function(){
		AcquireImage();
	});
});