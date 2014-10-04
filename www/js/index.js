
var ihc = {};

ihc.app = {
	
    initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
    
        function loadEv(event,ui){
            $('ul').listview().listview('refresh');
        }
        
        $( "#program_day_detail" ).pagecontainer({
            load: loadEv
        });
        $( "#program_day_detail" ).on("pagecontainerload",loadEv );
    },
    

    // where the magic happens at the beggining of the app
    onDeviceReady: function() {
    	FastClick.attach(document.body);

        function dbcopy()
        {
            window.plugins.sqlDB.copy("ihc.db",copysuccess,copyerror);
        }

        function copysuccess()
        {
            console.log("Database successfully copied.");
            var storage = window.localStorage;
            storage.setItem("isCopied","true");
            //lastUpdated pra eu saber depois no copy qual foi a ultima atualização (pra pegar dados novos se)

        }

        function copyerror (e)
        {
            //db already exists or problem in copying the db file. Check the Log.
            // if exists..
            // (am I installing a new version?)
            // (am I just reopening the app?)

            console.log("Error = "+JSON.stringify(e.message));
        }

        // copies database
       var storage = window.localStorage;
            var isCopied = storage.getItem("isCopied");
        if (!isCopied){
            dbcopy();
        }else{
            // preciso achar um jeito de atualizar simplesmente o banco. 
            // atualiza lastUpdated SE lastUpdated for menor;)
            
        }




        /*      navigator.notification.alert(
                'Cordova is ready!',       // message
                function() {},//do something,  // callback
                'Congratulations',            // title
                'Done'                      // buttonName
                );*/

    },

};

// IHC app pega na inicialização atualização de dados e insere no banco. 
// pegar via JSON e passar pro banco
    //pedir dados do banco (como?)

    /*function httpGet(theUrl)
    {
        var xmlHttp = null;
        var theUrl = "http://10.0.0.4:8000/ihcapp/getData/index.lua";
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        try{
            xmlHttp.send();
        }catch (err){
            console.log(err.message);
        }
        console.log(xmlHttp.responseText);
        return xmlHttp.responseText;
    }*/

    /* var response = httpGet();*/

/*  var obj = JSON.parse(response);*/
/*  console.log(obj.name);*/
    /*navigator.vibrate(240);*/

    /*$.ajax({
      type: "GET",
      dataType: "json",
      url: "http://10.0.0.4:8000/ihcapp/getData/index.lua",
      success: onSuccess,
      error: deuError
    });*/


/*  jQuery.getJSON("http://192.168.0.102:8000/ihcapp/getData/index.lua?callback=?",onSuccess);*/
    function onSuccess (data,textStatus){
        
        try{
            obj = JSON.parse(JSON.stringify(data));
        }catch(err){
            console.log("error on json parsing: "+err.message);
        }

        /*navigator.vibrate(240);*/
        
        console.log(obj.name);
        navigator.notification.alert(
            obj.name,
            function() {//por exemplo jogar no banco de dados o resultado ;)
            }, //do something 
            'Funcionou JSON',          // title
            'Beleza'       // buttonName
            );
    }

    function deuError (jqXHR, textStatus, errorThrown) {
        console.log("deu ruim o ajax: "+textStatus+" "+errorThrown);
    }

function showAlert() {
    var db = window.sqlitePlugin.openDatabase({name: "ihc.db"},function(tx,res){ console.log("deu BOM no banco");},function(tx,res){ console.log("deu RUIM no banco");});

        /*db.transaction(function (tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id INT, txt VARCHAR(50))',function(tx,res){ console.log("deu BOM no insert");},function(err){ console.log("deu RUIM no insert: "+err.message);});
        });*/
    db.transaction(function (tx){
    /*tx.executeSql("SELECT name FROM sqlite_master WHERE type = 'table'",[],*/
        tx.executeSql('SELECT * FROM event', [], 
            function (tx, results) {
                len = results.rows.length;
                navigator.vibrate(250);     
                navigator.notification.alert(
                            len,           // message
                            function() {}, //do something 
                            'N resultados',          // title
                            'Beleza'       // buttonName
                            );

                    /*  for (i = 0; i < len; i++) {
                          var res =results.rows.item(i).text;
                      }*/
    },
    function (tx,err){console.log("ERRORIHC: "+err.message);}
    );

        },function (tx,err){console.log("ERRORIHC2: "+e.message)});

    }
