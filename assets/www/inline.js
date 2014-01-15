/*
* Author: Eamon Kelly, Enclude
* Purpose: Top level menu
* Called from: index.html
*/
/* TODO
 *	
 * 
 */
var stockChecks;

function regLinkClickHandlers() 
{
    var $j = jQuery.noConflict();
    stockChecks = new Stock();
    
    $j('#link_stockcheck').click(function() 
    {
    	if (debugMode) logToConsole("regLinkClickHandlers: link_stockcheck clicked");
	    $j("#div_sfdc_stock_list").html("");
        stockChecks.startChecks ();
    });

    $j('#link_programtag').click(function() 
    {
    });

    $j('#link_reset').click(function() 
    {
    	stockChecks.clearRecords();
    });

    $j('#link_logout').click(function() 
    {
     	logout ();
    });
    
    $j(document).on('create', '#stockcheckpage' ,function()
    {
    	if (debugMode) logToConsole ("regLinkClickHandlers: Change to stockcheck page");
    	$j.mobile.changePage ($j('#stockcheckpage'));
    });
     
    $j(document).on('pageshow', '#stockcheckpage' ,function()
    {
    	if (debugMode) logToConsole ("regLinkClickHandlers: onPageShow stockcheckpage page");
    	$j.mobile.loading('hide');
    });

    if (debugMode) logToConsole ("regLinkClickHandlers: In regLinkClickHandlers User ID is " + userId);
 }

// because this is right at the start, if there is an error, logout and try again
function onFailQueryStock (jqXHR, textStatus, errorThrown)
{
	if (debugMode) 
	{
		logToConsole ('onFailQueryStock ' + JSON.stringify(jqXHR) + ' textStatus: ' + textStatus + ' errorThrown: ' + errorThrown);
		alert ('Error from Salesforce: ' + JSON.stringify(jqXHR));
	}
	logout ();
}

function logout ()
{
    var sfOAuthPlugin = cordova.require("salesforce/plugin/oauth");
    sfOAuthPlugin.logout();
}

function onErrorStockloadRecords (error)
{
	if (debugMode) logToConsole ('In onErrorStockloadRecords: ' + JSON.stringify(error));
	hideWaitingCursor ();
}

function hideWaitingCursor ()
{
	var $j = jQuery.noConflict();
	var interval = setTimeout(function(){
		$j.mobile.loading('hide');
	},1);      
}