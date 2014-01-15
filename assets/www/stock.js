var sfSmartstore = cordova.require("salesforce/plugin/smartstore");

function WellBeing ()
{
}

Stock.prototype.clearRecords = function ()
{
	if (debugMode) logToConsole ("In clearRecord");
/*
	sfSmartstore.removeSoup(wellbeingLocalRecords,
            function(param){}, 
            function(param){});
	sfSmartstore.removeSoup(wellbeingUploadQueue,
            function(param){}, 
            function(param){});
*/
}

/**
 * load records for the app
 **/
Stock.prototype.startChecks = function() 
{
	if (debugMode) logToConsole("Stock.prototype.startChecks");
	var $j = jQuery.noConflict();
//	var interval = setTimeout(function(){
//		        $j.mobile.loading('show', {
//		        	text: 'Loading WellBeing Checks',
//		        	textVisible: true,
//		        	theme: 'a',
//		        	html: ""
//		        });
//		    },1);  
//
//	var that = this;
//	sfSmartstore.soupExists(wellbeingLocalRecords,function(param){
//		if(Util.checkConnection()){
//			that.loadRecordsFromSalesforce(error);
//		}
//		else {
//			that.loadRecordsFromSmartstore(that.onNoRecords);
//		}
//	},error);
}

Stock.prototype.onNoRecords = function () 
{
	alert ('Not online and no local Stock Checks found');
	var $j = jQuery.noConflict();
	var interval = setTimeout(function(){
		$j.mobile.loading('hide');
	},1);      
}

/**
 * Store Records
 **/
Stock.prototype.storeRecords = function(records,error)
{
	if (debugMode) logToConsole('Stock.prototype.storeRecords ' + records.length + ' records');
//	sfSmartstore.upsertSoupEntries(wellbeingLocalRecords,records, function()
//	{
//		if (debugMode) logToConsole("Soup Upsert Success");        
//	}, error);

}



/**
 * load records from salesforce
 **/
Stock.prototype.loadRecordsFromSalesforce = function(error) 
{
	if (debugMode) logToConsole("Stock.prototype.loadRecordsFromSalesforce");
	var that = this;
	//check if we're online
	if(Util.checkConnection())
	{
		if (debugMode) logToConsole('We are online...');

        // PUSH QUEUE TO SFDC
		OfflineQueue.UploadQueue(wellbeingUploadQueue, function()
		{
			that.clearRecords(); // clear out the old records
			
			if (debugMode) logToConsole('We are online... querying SFDC');
            // QUERY FROM SALESFORCE USING FORCETK
//	        var nextHourStarts;
//	        var nextHourEnds;
//	        var timeNow = new Date();
//	        if (timeNow.getMinutes() > (60 - User_check_minutes_before_hour)) nextHourStarts = new Date (timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), timeNow.getHours()+1, 0, 0, 0);
//	        else nextHourStarts = new Date (timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), timeNow.getHours(), 0, 0, 0);
//	        nextHourEnds = new Date (timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), timeNow.getHours(), timeNow.getMinutes() + Show_user_checks_in_future_minutes, 0, 0);
//
//	        forcetkClient.query("SELECT Id, SortKey__c, Name, Room__c, Service_User_Name__c, Time_of_Check__c, Wellbeing_Status__c FROM Wellbeing_Check__c where Building__c = '" + building + "' and Time_of_Check__c >= " + nextHourStarts.toJSON() + " and Time_of_Check__c <= " + nextHourEnds.toJSON() + " order by SortKey__c limit 200", function(response){  
//                that.registerWellBeingSoup(function(){
//					that.storeRecords(response.records,error);
//				},error);
//				that.onSuccessSfdcWellbeingChecks(response.records);
//			}, error); 
		},error);
	}
	else 
	{
		if (debugMode) logToConsole('ERROR: Not online');
	}
}

/**
 * Load records from Smartstore
 **/
Stock.prototype.loadRecordsFromSmartstore = function(error)
{
	if (debugMode) logToConsole("Stock.prototype.loadRecordsFromSmartstore");
//	var that=this;
//
//    var querySpec = sfSmartstore.buildAllQuerySpec("SortKey__c", "ascending", 2000);
//        
//    sfSmartstore.querySoup(wellbeingLocalRecords,querySpec,
//                                  function(cursor) { that.onSuccessQuerySoup(cursor); },
//                                  error);
}

/**
 * Load record with Id from Smartstore
 **/
Stock.prototype.loadRecordWithIdFromSmartstore = function(Id,callback,error)
{
	if (debugMode) logToConsole("WellBeing.prototype.loadRecordWithIdFromSmartstore id is: " + Id);
//	var that = this;
//	var querySpec = sfSmartstore.buildExactQuerySpec("Id", Id, 2000);
//	sfSmartstore.querySoup(wellbeingLocalRecords,querySpec,
//                                  function(cursor) { 
//                                      var records = [];
//                                      records = Util.LoadAllRecords(cursor,records);
//                                     callback(records);
//                                  },
//                                  error);
}

/**
 * Update an entry changed by the user
 **/
Stock.prototype.updateRecord = function(fieldData,error) 
{
	if (debugMode) logToConsole('Stock.prototype.updateRecord');
	var that=this;
	that.loadRecordWithIdFromSmartstore(fieldData.Id,function(records)
	{
		if (debugMode) logToConsole('Smartstore record loaded');
//		records[0].Wellbeing_Status__c = fieldData.Wellbeing_Status__c;
//		that.storeRecords(records,error);
//
//	    // SAVE TO SALESFORCE IF ONLINE
//		if(Util.checkConnection()) {
//			forcetkClient.update('Wellbeing_Check__c',fieldData.Id,{"Wellbeing_Status__c":fieldData.Wellbeing_Status__c},function(){
//				if (debugMode) logToConsole('SFDC Update Success!');
//			},error);
//		}
//		else
//		{
//			OfflineQueue.QueueRecords(wellbeingUploadQueue, records, error);
//		}
	},error);
}

/**
 * Register the Stock Check local records soup if it doesn't already exist
 **/
Stock.prototype.registerStockSoup = function(callback,error)
{
	if (debugMode) logToConsole('Stock.prototype.registerWellBeingSoup');
	//check if the Wellbeing_Check__c soup exists
//	sfSmartstore.soupExists(wellbeingLocalRecords,function(param){
//		if(!param){
//			//Wellbeing_Check__c soup doesn't exist, so let's register it
//			var indexSpec=[{"path":"Id","type":"string"},{"path":"SortKey__c","type":"string"}];
//			sfSmartstore.registerSoup(wellbeingLocalRecords,indexSpec,function(param){
//				callback();
//			},error);
//		}
//		else {
//			callback();
//		}
//	},error);
}



/**
 * Take an array of records, and populate the list view
 **/
WellBeing.prototype.onSuccessSfdcStockChecks = function(records)
{
	if (debugMode) logToConsole('Stock.prototype.onSuccessSfdcStockChecks');
	var that=this;
	var $j = jQuery.noConflict();
    if (records.length > 0)
    {
	    $j("#div_sfdc_stock_list").html("");
	    
	    $j.each(records, function(i, stock) {
	    	var oneCheck = that.displayOneCheck (i, stock);
	    	
	    	$j("#div_sfdc_stock_list").append ($j(oneCheck));
	        
	    	that.addClickHandlersToList (i, stock);
	      });
	    
	    $j("#div_sfdc_stock_list").trigger( "create" )
    }
    else
    {
    	$j("#div_sfdc_stock_list").html("No Stock Checks Available");
    	var interval = setTimeout(function(){
    		$j.mobile.loading('hide');
    	},1);
    	alert ("No Stock Checks Available");
    }
}

Stock.prototype.displayOneCheck = function (i, stock)
{
	var that=this;
	var newLi = '<li>Test</li>';
    return  newLi;
}

/**
 * Soup Successfully Queried
 **/
Stock.prototype.onSuccessQuerySoup = function(cursor) {
	if (debugMode) logToConsole('Stock.prototype.onSuccessQuerySoup');
	var that = this;
	var records = [];

	records = Util.LoadAllRecords(cursor,records);

	//close the query cursor
	sfSmartstore.closeCursor(cursor);
	that.onSuccessSfdcStockChecks(records);    
}

function onUpdateError(error) {
	if (debugMode) logToConsole("onUpdateError: " + JSON.stringify(error) );
    alert('Error updating Stock Check');
	var $j = jQuery.noConflict();
	var interval = setTimeout(function(){
		$j.mobile.loading('hide');
	},1);      
}