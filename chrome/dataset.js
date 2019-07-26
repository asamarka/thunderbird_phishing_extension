window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    myExtension.init();
},false);

var myExtension = {
  init: function() {
    var appcontent = document.getElementById("appcontent");   // browser
    if(appcontent){
      appcontent.addEventListener("DOMContentLoaded", myExtension.onPageLoad, true);
    }
    var messagepane = document.getElementById("messagepane"); // mail
    if(messagepane){
      messagepane.addEventListener("load", function(event) { myExtension.onPageLoad(event); }, true);
    }
  },
 

  onPageLoad: function(aEvent) {
    var doc = aEvent.originalTarget; // doc is document that triggered "onload" event
      aEvent.originalTarget.defaultView.addEventListener("unload", function(event){ myExtension.onPageUnload(event); }, true);
   	//getMessageBody();
    //warning();
	//readLabel();
	//readFiles();
  }
};




var f=[];
var t=[];

function warning (){

var node =   document.createElement("row");                 // Create a <row> node
var child1 = document.createElement("label");
var elm =    document.getElementById("expandedHeader2Rows");

child1.setAttribute("class", "headerName");


}


function sendMail() {
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'YOUR API KEY HERE',
        'message': {
          'from_email': 'YOUR@EMAIL.HERE',
          'to': [
              {
                'email': 'RECIPIENT@EMAIL.HERE',
                'name': 'RECIPIENT NAME (OPTIONAL)',
                'type': 'to'
              }
            ],
          'autotext': 'true',
          'subject': 'YOUR SUBJECT HERE!',
          'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
        }
      }
     }).done(function(response) {
       console.log(response); // if you're into that sorta thing
     });
}

function readLabel()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "chrome://custombutton/content/SPAMTrain.label", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var lines = allText.split('\n');
					for(var line = 0; line < lines.length; line++){
     				var res   = lines[line].substring(0, 1);
     			  	//console.log(lines[line]);
                	//console.log(res);
     				if (res=="0"){
     					var	fe;
     					fe= lines[line].substring(2,17);
     					f.push(fe);
     					//console.log("the 0 zero array of f",f);
     				}
     				else if (res=="1"){
     					var	te;
     					te= lines[line].substring(2,17);
     					t.push(te);
     					//console.log("the 1 one array of t",t);
     				}
    			}
				// console.log("f",f);
				//console.log("t",t);                
            }
        }
    }
    rawFile.send(null);
    //return f,t; 
}

function readFiles(){


var f = new FileUtils.File(mypath);



var url = "chrome://custombutton/content/TRAINING/top-1m.csv";
      // Load the csv file
      d3.csv(url, function (error, data) {
      //alert("000");
      // Output the first observation to the logfor (var i=0;i<data.length;i++){
	});
  }
 


function getMessageBody()  
{  
var aMessageHeader = gFolderDisplay.selectedMessage;

let messenger = Components.classes["@mozilla.org/messenger;1"]  
                            .createInstance(Components.interfaces.nsIMessenger);  
let listener = Components.classes["@mozilla.org/network/sync-stream-listener;1"]  
                           .createInstance(Components.interfaces.nsISyncStreamListener);  
let uri = aMessageHeader.folder.getUriForMsg(aMessageHeader);  
  messenger.messageServiceFromURI(uri)  
           .streamMessage(uri, listener, null, null, false, "");  
let folder = aMessageHeader.folder; 
  
var fullBody =folder.getMsgTextFromStream(listener.inputStream,  
                                     aMessageHeader.Charset,  
                                     65536,  
                                     32768,  
                                     false,  //false and false make it original 
                                     false,  
                                     { });


//var found = null;
var test1= eval("(" + fullBody+ ")");


var e = test1.getElementsByTagName('a');


var arms = $("a[href]");

//var e1 = document.getElementsByTagName('a')[0];
//var e2 = document.getElementsByTagName('a')[0].innerHTML;
//var e3 = document.getElementsByTagName('a').innerHTML;

// for (var i=0; i < e.length; i++) {
//     found = e[i];
//     alert(found);
// }

// var reg6 = /href="(.*?)"/g;
// var href = fullBody.match(reg6);
//console.log(arms);
//console.log(e2);
//console.log(e.namedItem());
//console.log(e.item());
//console.log(arms);
console.log(fullBody);

// let messageBody = document.getElementsByTagName("a");

// // //b = document.getElementsByTagName('a').innerHTML;
// //console.log(messageBody.text);
// // //console.log(messageBody);

// var urls = [],
// des  =[];
// for (i =0, k=messageBody.length; i <k; i++){
//    urls[i] = messageBody[i].text;
//    des[i]  = messageBody[i].href;
//    console.log(urls[i]);
//    console.log(des[i]);
// }

}