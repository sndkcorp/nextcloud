/*
scan document
*/
/** Images scanned so far. */

function scan() {
	
	var iframe = document.createElement('iframe');
		iframe.setAttribute('width', '100%');
		iframe.setAttribute('height', '240');
		iframe.setAttribute('id', 'scandoc');
		//iframe.setAttribute('onload', 'callback(this)'); //onload="callback(this)"
		//iframe.setAttribute('src', 'https://drive.tasktower.com/scanfile/scan.html');
		iframe.setAttribute('src', OC.generateUrl('apps/twainwebscan/scanapp'));
	
	$(document.createElement('div'))
		.prop('id', 'dialog-box')
		.prop('title', 'Selection for Scan')
		.css('background', 'url(' + OC.imagePath('core','loading.gif') + ') center center no-repeat')
		.append(iframe)
		.appendTo($('body'))
		.ocdialog({
			width: 500,
			height: 310,
			closeOnEscape: false,
			modal: true,
			open: function () {
				$(this).parents(".oc-dialog:first").addClass("oc-scan-setting");
			}
			/*,
			close: function() {
				var _self = this;
				setTimeout(function() {
				  $(_self).ocdialog('destroy').remove();
				}, 3000);
			}*/
		});
}


function scan12() {
	var tbl = '<div id="dialog-form" title="Selection for Scan"><iframe id="scandoc" width="100%" height="240" src="https://drive.tasktower.com/scanfile/scan.html"></iframe></div>';
	$("body").append(tbl)
	var	l = $('#dialog-form');
	
	l.ocdialog({
		width: 500,
		modal: true,
		resizable: false,
		draggable: false,
		open: function () {
			$(this).parents(".oc-dialog:first").addClass("oc-scan-setting");
		}
	});
	
	
};
function doscan()
{
	var scanbox = document.getElementById('scandoc').contentWindow;
	var txt = scanbox.document.getElementById('txtscanfile');
	if (txt.value.trim() == '') {
		alert('Enter the File Name!!', 'warning');
		txt.focus();
		return false;
	}
	
	var filter = /^[a-zA-Z0-9 ]+$/;
	var test_bool = filter.test(txt.value);
	if (test_bool == false) {
		alert('Please Enter Only Alphabets and Number', 'warning');
		txt.focus();
		return false;
	}
	//
	document.getElementById('scandoc').contentWindow.Dynamsoft.WebTwainEnv.Load();
	var DWObject = document.getElementById('scandoc').contentWindow.Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
	if (DWObject) {
		console.log('OK');
	}
	else
		console.log('Error:Code-404');
	
	console.log('Scan');
	var	l = $('#dialog-form');
	$(l).ocdialog("close");
};

$(document).ready(function() {
	
	$("ul#appmenu li").click(function() {
		
		var cdir = parent.getURLParameter('dir');
		if(cdir !=="")
		{
			var id = $(this).data('id');
			//console.log(id);
			if(id == 'twainwebscan')
			{
				scan();
				return false;
			}
		}
		else{
			console.warn('Warning : Working only inside Files');
			return false;
		}
		
	});
	
	$("#scanImage").on('click', function(){
		console.log('123')
	});
	
});