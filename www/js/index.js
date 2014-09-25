
var ihc = {};

ihc.app = {
	
    initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
    	FastClick.attach(document.body);

    	navigator.notification.alert(
		        'Cordova is ready!',       // message
		        function() {},//do something,  // callback
		        'Congratulations',            // title
		        'Done'                      // buttonName
		        );

        // db.transaction
        // db.openDatabase
        // db.executeSql
        var db = window.sqlitePlugin.openDatabase({name: "ihc.db"});
        console.log ("IHC: banco aberto")

        db.transaction(function (tx){
                    tx.executeSql('DROP TABLE IF EXISTS test_table');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key auto_increment, data text, data_num integer)');

                    tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], 
                        function(tx, res) {
                            console.log("insertId: " + res.insertId + " -- probably 1");
                            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                        });


        },function (e){console.log("ERRORIHCindex.js: "+e.message)});

    },

};

/*function success(tx,res){
   console.log("Row/table inserted/created correctly");
   navigator.vibrate(250);
}

function error(err)
{
    console.log("ERROR IHC: "+err.message);
    navigator.vibrate(1000);
}

*/
