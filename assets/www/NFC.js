/*
* Author: Eamon Kelly, Enclude
* Purpose: NFC Handlers
* Called from: index.html
*/

var bNFCListenersRegistered = false;
function failure(reason) {
            navigator.notification.alert(reason, function() {}, "There was a problem");
}

function registerNFCHandlers() 
{
	if (bNFCListenersRegistered) return;
	
    nfc.addNdefListener(
            onNdef,
            function() {
                if (debugMode) logToConsole("NFC: Listening for NDEF tags.");
            },
            failure
        );
	nfc.addTagDiscoveredListener(
    	onNfc,
        function() 
        {
        	if (debugMode) logToConsole("NFC: Listening for non-NDEF tags.");
        },
        failure
     );
     bNFCListenersRegistered = true;
}

function onNfc (nfcEvent) 
{
	var tag = nfcEvent.tag;
    if (debugMode) logToConsole("NFC Tag: " + JSON.stringify(nfcEvent.tag));
    alert ("NFC Tag: " + JSON.stringify(nfcEvent.tag));
};

function onNdef (nfcEvent) 
{
	if (debugMode) logToConsole("NFC NDEF Tag: " + JSON.stringify(nfcEvent.tag));
	alert ("NFC NDEF Tag: " + JSON.stringify(nfcEvent.tag));
        var tag = nfcEvent.tag;

        // BB7 has different names, copy to Android names
        if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }

        tagContents.innerHTML = app.tagTemplate(tag);
};
