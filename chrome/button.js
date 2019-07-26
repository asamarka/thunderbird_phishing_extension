var whitelist_loaded=false;
var phishtank_loaded=false;

 var white_list=[];
 var phishtank_list=[];

var counterWhite    = 0;
var counterBlack    = 0;
var counterDomain   = 0;
var counterDomain2  = 0;
var counterNotDomain= 0;
var counterGetMessageBody=0;
var counterTotal =0;
var counterToolCant = 0;
var counterWhiteList=0;
var counterNotWhiteList=0;
var counterisIP=0;
var counterNumbDots=0;
var couter00002=0;

// let res = Services.io.getProtocolHandler("resource").QueryInterface(Ci.nsIResProtocolHandler);
// res.setSubstitution("rawr", Services.io.newURI('http://www.bing.com/',null,null));
     

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    myExtension.init();
},false);

var check = false;
var check2 = false;

var f=[];
var t=[];

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
 	console.log("........................................");

    var doc = aEvent.originalTarget; // doc is document that triggered "onload" event


 //   aEvent.originalTarget.defaultView.addEventListener("unload", function(event){ 
  //    myExtension.onPageUnload(event); 
   // }, true);
  loadwhitelist();
 //loadphishtank();
 
  //getMessageBody1();
  MassegeContent ();



  }


};


var MyApp = {};
    
var full_link=[];

function MassegeContent (){ 
//	console.log("kkkkkk");
var finalresult;
//alert("inside MassegeContent");
var msgHdr = gFolderDisplay.selectedMessage;
var messageid = msgHdr.messageId;
//console.log("messageid: ",messageid);
MsgHdrToMimeMessage(msgHdr, null, function(aMsgHdr, aMimeMsg){ 
var bodytext=aMimeMsg.coerceBodyToPlaintext(aMsgHdr.folder);
var host=[];
//console.log(bodytext);
//MyApp.bodytext=bodytext;
//alert(me);
//var reg  = /(https?:\/\/[^\s]+)/g; //find links 
//var reg2 =   /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/;
//dkim_parse_result();
//var theresult= reg.exec(bodytext); // we have links 
//var theresult2= reg2.exec(bodytext);
//console.log("the result",theresult2);
 var  re      = /(https?:\/\/[^\s]+)/g,
      match,
      results = [];

while (match = re.exec(bodytext)) {  //find links
      results.push(+match[1]);        //push it to result
      var   filter1 =  /^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/;
            
      host.push(filter1.exec(match));
      //console.log("match",match);
      //console.log("result",results);
     // console.log("Muath : ",filter1.exec(match));


}
//////////////////////////////////////////////////////////
 Domain(); 
 // if (match!=null){
 //  var checkBlacklist=blacklist(match);
 // }

 console.log(host.length);
  if (host.length ==0){


  getMessageBody1();


  }else {





  var checkDomain   =IsPhishing(host);
  // if (checkBlacklist){
  //   finalresult ="Phishing: It's on the Blacklsit";
  // } 
  // else { 

  if (checkDomain==1) {
  finalresult ="Not phishing: one link is the same sender domain" ;
  counterDomain += 1;
  counterTotal  += 1;
 // var finalresult= "it's phisihng";
 // MyApp.finalresult = finalresult;
 /////////////////////////////////////////////////////////////
}
 if (checkDomain==0) { 
  
        if (whitelist (host)){
      
        counterWhiteList += 1;
        counterTotal  += 1;

        finalresult= "Not phishing: One link at least im white list";


        }else {
          
        finalresult ="Phishing: Diffrent domains and not in whitelist" ;
      
        counterNotWhiteList += 1;
        counterTotal  += 1;

        }
}
////////////////////////////////////////////////////////////
 
    console.log("matching domain  :",counterDomain); 
    console.log("In white List    :",counterWhiteList); 
    console.log("Not in white list or matching domain:",counterNotWhiteList); 
    console.log("There isn't      :",counterToolCant);
    console.log("counterisIP      :",counterisIP);
    console.log("counterNumbDots      :",counterNumbDots);
    console.log("Total            :",counterTotal);

// }

//////////////////////////////////////////////////////////
  
var node   = document.createElement("row");                 // Create a <row> node
var child1 = document.createElement("label");
var child2 = document.createElement("mail-headerfield");

child1.setAttribute("class", "headerName");
child2.setAttribute("class", "headerValue");
var child1_text = document.createTextNode("Phish Result:");
child1.appendChild(child1_text);
var child2_text = document.createTextNode( finalresult );         // Create a text node
child2.appendChild(child2_text);

node.appendChild(child1);
node.appendChild(child2);


var elm = document.getElementById("expandedHeader2Rows");

if(check2 == false){
elm.appendChild(node);
//alert("false");
check2 = true;
}else{
elm.removeChild(elm.lastChild);
elm.appendChild(node);
}
 }

});


 
}

function IsPhishing (host){
    var x=-1;
if (typeof host !== 'undefined'){
     
x=0;

     //.log("the sender domain :",MyApp.domain);
     //console.log("the sender domain :",MyApp.dadomain);
 
   //console.log("xxxxX length Xxxx",host.length);
for (var j =0 , len1 = host.length; j< len1 ;j++){
for (var i =0 , len = host[j].length; i< len ;i++) {
      var host1 =host[i];
      //var reg3 = /^https?:\/\/www(.*)/;
      //var reg4 = /^https?:\/\/www\./; //work only of there is both http and www
      var reg5 = /^https?:\/\/w?w?w?\.?/;
      //after = host[i].replace(reg3, ''); 
      //console.log("test for host",host1);

      var linkDomain;
      linkDomain  = host1[i].replace(reg5, '');
      var parsee  = tldjs.parse(host1[i]);
      dadomain = parsee.domain;
      //tt = tldjs.getPublicSuffix(linkDomain);
      //console.log("the link domain dadomain   :",dadomain);
      //console.log("the link domain linkDomain :",linkDomain);


      //counterDomain2 +=1;
      // if (tt=="country"||tt=="stream"||tt=="gdn"||tt=="download"||tt=="racing"||tt=="xin"||tt=="men"||tt=="kim"||tt=="science"||tt=="bid"){
      // console.log("shady TLD");
      // } 
      // console.log("The link TLD",tt);
     
      MyApp.link = linkDomain; 



       if (dadomain == MyApp.domain || MyApp.domain== linkDomain || MyApp.dadomain==dadomain||MyApp.dadomain==linkDomain) {
          x=1;
          break;
   }
 }
}

      //f();
    
      //alert("before domain");
      //alert("if");
   //     if (isIP(host)==1){
   //       console.log("######################there is an ip link###########################################");
   //       counterisIP += 1; 
   //    }
 		// if (numbDots(host)==1){
   //       console.log("##################numbDots  is greater than 5 #######################################");
   //       counterNumbDots +=1; 
   //    }
      
      // else{
      //   console.log("boho");
      // }
     // if( whitelist(host)){
     //  counterWhite +=1;
     //   //console.log("All links is in the whitelist");
     // }
     // else{
     //   //console.log("all of the links or at least one is not in the whitelist");
     // }
      }
    
    // if (typeof full_link !== 'undefined'){
    // if ( blacklist(full_link)){
    //    //console.log("it's on the blacklist");
    //  }
    //  else{
    //    //console.log("it's not on the blacklist");
    //  }

    //  }


return x;
}

  var tt;

function IsPhishingOld (host){
  //alert("inside IsPhishing");
 // alert("IsPhishing");
  var x=0;
  counterDomain +=1;
  console.log("is phisihng",host);
  //console.log("is phisihng 0",host[0]);
  //var xxx = tldjs.parse('mail.google.co.uk');
   console.log("xxxxX length Xxxx",host.length);
for (var j =0 , len1 = host.length; j< len1 ;j++){
for (var i =0 , len = host[j].length; i< len ;i++) {
      var host1 =host[i];
      //var reg3 = /^https?:\/\/www(.*)/;
      //var reg4 = /^https?:\/\/www\./; //work only of there is both http and www
      var reg5 = /^https?:\/\/w?w?w?\.?/;
      //after = host[i].replace(reg3, ''); 
      //console.log("test for host",host1);

      var linkDomain;
      linkDomain  = host1[i].replace(reg5, '');
      var parsee  = tldjs.parse(host1[i]);
      dadomain = parsee.domain;
      //tt = tldjs.getPublicSuffix(linkDomain);
      console.log("the link domain dadomain",dadomain);
      //console.log("the link domain linkDomain",linkDomain);
      //counterDomain2 +=1;
      // if (tt=="country"||tt=="stream"||tt=="gdn"||tt=="download"||tt=="racing"||tt=="xin"||tt=="men"||tt=="kim"||tt=="science"||tt=="bid"){
      // console.log("shady TLD");
      // } 
      // console.log("The link TLD",tt);
      x=0;
      MyApp.link = linkDomain; 
       if (dadomain ==MyApp.domain) {
          x=1;
          break;
   }
 }
}
 return x;
}

function loadwhitelist() {

var url = "chrome://custombutton/content/top-5000.csv";
      // Load the csv file
      d3.csv(url, function (error, data) {
      //alert("000");
      // Output the first observation to the log
for (var i=0;i<data.length;i++){
  white_list.push(data[i].domain);
}
     whitelist_loaded=true;
 });
}

var myObj;
var phisharray=[];
var testTLD= [];

function loadphishtank() {  

var xmlhttp = new XMLHttpRequest();
var counter1=0; 
var counter2=0;

xmlhttp.open("GET", "http://data.phishtank.com/data/398fe7b5e7adfb22cc373399ebfbb4c78f2cfa7169d18100d99e4fd8276305be/online-valid.json", true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
        for (var i=0;i<myObj.length;i++){ 
        //console.log(myObj[i].url);
        counter2 +=1;
        //if (testTLD=="country"||testTLD=="stream"||testTLD=="gdn"||testTLD=="download"||testTLD=="racing"||testTLD=="xin"||testTLD=="men"||testTLD=="kim"||testTLD=="science"||testTLD=="bid"|| testTLD=="study"|| testTLD=="click"|| testTLD=="stream"|| testTLD=="accountant"|| testTLD=="party"|| testTLD=="link"|| testTLD=="bid"|| testTLD=="top"|| testTLD=="trade"|| testTLD== "zip"|| testTLD=="review" || testTLD== "kim"|| testTLD== "cricket"|| testTLD== "work"|| testTLD== "gp"|| testTLD=="link"){
        // console.log(myObj[i].url);
        // counter1 +=1;
        // console.log("shady TLD");
        // }
        testTLD=tldjs.getPublicSuffix(myObj[i].url);

      // var reg5 = /^http[s]?:\/\/((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
      // var linkDomain;
      // linkDomain= reg5.test(myObj[i].url);
      // if (linkDomain == true){
      //   couter00002 +=1;
      // }      
 //    var ddd= myObj[i].url;
	// var dot_count= ddd.split(".").length-1;
 //    if (dot_count >= 6){
 //        couter00002 +=1;
 //      }  


        phisharray.push(testTLD);
        //console.log("................phisharray[i]",phisharray[i]);
       

        
        //console.log("testttttttttttttt",array[i]);
    }

    // console.log("cunt Dots....................................",couter00002);

    // console.log("total....................................",counter2);
    phishtank_loaded=true;
};
        var csvContent = "data:text/csv;charset=utf-8,";
        phisharray.forEach(function(infoArray, index){

          dataString = phisharray.join(",");
          csvContent += "hi";//index < phisharray.length ? dataString+ "\n" : dataString;
          });
        
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        //document.body.appendChild(link); // Required for FF
        var child1 = document.createElement("label");
        child1.appendChild(link);
        link.click(); // This will download the data file named "my_data.csv".

}
}

function isIP (host){

for (var j =0 , len1 = host.length; j< len1 ;j++){
for (var i =0 , len = host[j].length; i< len ;i++) {
      var host1 =host[j];
      var reg5 = /^http[s]?:\/\/((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
      var linkDomain;
      linkDomain= reg5.test(host1[i]);
      if (linkDomain == true){
        return 1;
      }      
    }
 }
 return 0;
}

function numbDots (host){

for (var j =0 , len1 = host.length; j< len1 ;j++){
for (var i =0 , len = host[j].length; i< len ;i++) {
      var host1 =host[j];
	  var dot_count= host1[i].split(".").length-1;
      if (dot_count >= 3){
        return 1;
      }      
    }
 }
 return 0;
}

function blacklist (full_link){

for (var j =0 , len1 = full_link.length; j< len1 ;j++){
for (var i =0 , len = full_link[j].length; i< len ;i++) {
      var full_link1 =full_link[j];
      //var reg3 = /^https?:\/\/www(.*)/;
      //var reg4 = /^https?:\/\/www\./; //work only of there is both http and www
      var reg5;
      //after = host[i].replace(reg3, ''); 
      var linkDomain2;
      linkDomain2= full_link1[i].replace(reg5, '');
      console.log("blacklist check",linkDomain2);
      var r = (phishtank_list.indexOf(linkDomain2) != -1);// 
      if(r){
        return true;
      }
   }
 }
 return false;
 }

function whitelist (host){

for (var j =0 , len1 = host.length; j< len1 ;j++){
for (var i =0 , len = host[j].length; i< len ;i++) {
      var host1 =host[j];
      //var reg3 = /^https?:\/\/www(.*)/;
      //var reg4 = /^https?:\/\/www\./; //work only of there is both http and www
      var reg5 = /^https?:\/\/w?w?w?\.?/;
      //after = host[i].replace(reg3, ''); 
      var linkDomain;
      linkDomain  = host1[i].replace(reg5, '');

      var parsee  = tldjs.parse(host1[i]);
      var dadomain = parsee.domain;
      
  
      //var r = (white_list.indexOf(linkDomain) != -1);
      var t = (white_list.indexOf(dadomain)   != -1);
      if(t){
        return true;
      }
   }
 }
 return false;
 }

function TLD (host){

for (var j =0 , len1 = host.length; j< len1 ;j++){
for (var i =0 , len = host[j].length; i< len ;i++) {
      var host1 =host[j];
      var reg3 = /^https?:\/\/www(.*)/;
      var reg4 = /^https?:\/\/www\./; //work only of there is both http and www
      var reg5 = /^https?:\/\/w?w?w?\.?/;
      //after = host[i].replace(reg3, ''); 
      var linkDomain;
      linkDomain= host1[i].replace(reg5, '');
      console.log("the link domain",linkDomain);
      

      var r = (white_list.indexOf(linkDomain) != -1);// 
      if(!r){
      return false;
      }
   }
 }
 return true;
 }




 function Subject () {
 // alert("Just testing");
 // Cu.import("resource:///modules/gloda/mimemsg.js");

  var msgHdr = gFolderDisplay.selectedMessage;
  var sub = msgHdr.mime2DecodedSubject;

  var patt = /password/i;


  var result= patt.test(sub);
  if (result == true) {
  result = "This e-mail could be phisihng";
  } else {
    result = "This e-mail is probably a phisihng E-mail";
  }

var node = document.createElement("row");                 // Create a <row> node

var child1 = document.createElement("label");
var child2 = document.createElement("mail-headerfield");

child1.setAttribute("class", "headerName");
child2.setAttribute("class", "headerValue");
var child1_text = document.createTextNode("Phish detecting:");
child1.appendChild(child1_text);
var child2_text = document.createTextNode( result );         // Create a text node
child2.appendChild(child2_text);

node.appendChild(child1);
node.appendChild(child2);
// Append the text to <row>
var elm = document.getElementById("expandedHeader2Rows");

if(check == false){
elm.appendChild(node);
//alert("false");
check = true;
}else{
elm.removeChild(elm.lastChild);
elm.appendChild(node);
//alert("true");

  
  }
}

function getMessageBody1()  
{
console.log("inside getMessageBody1");
var finalresult;
counterGetMessageBody +=1;
//alert("Inside getMessageBody1");
var aMessageHeader = gFolderDisplay.selectedMessage;
//console.log("aMessageHeader",aMessageHeader);
let messenger = Components.classes["@mozilla.org/messenger;1"].createInstance(Components.interfaces.nsIMessenger);
//console.log("messenger",messenger);

let listener  = Components.classes["@mozilla.org/network/sync-stream-listener;1"].createInstance(Components.interfaces.nsISyncStreamListener);
//console.log("listener",listener);

let uri = aMessageHeader.folder.getUriForMsg(aMessageHeader);
                    messenger.messageServiceFromURI(uri).streamMessage(uri, listener, null, null, null, "");
//console.log("uri",uri);
 
let folder = aMessageHeader.folder; 
//console.log("folder",folder);


var fullBody =folder.getMsgTextFromStream(listener.inputStream,  
                                     aMessageHeader.Charset,  
                                     65536,  
                                     32768,  
                                     false,  //false and false make it original 
                                     false,  
                                     { });
MyApp.fullBody = fullBody;


//console.log("counterGetMessageBody",counterGetMessageBody);
var  re      = /(https?:\/\/[^\s]+)/g,
      match,
      results = [],
      host=[];
while (match = re.exec(fullBody)) {  //find links
      results.push(+match[1]);        //push it to result
      var   filter1 =  /^[\w-]+:\/{2,}\[?[\w\.:-]+\]?(?::[0-9]*)?/;
            
      host.push(filter1.exec(match));
      //console.log("match",match);
      //console.log("result",results);
     //console.log("Muath : ",filter1.exec(match));


}

 var checkDomain   =IsPhishing(host);
  // if (checkBlacklist){
  //   finalresult ="Phishing: It's on the Blacklsit";
  // } 
  // else { 

  if (host.length ==0) {
  finalresult ="Tool can't detect phishing or no links";
  counterToolCant += 1;
  counterTotal  += 1;
  //console.log(fullBody);

   } else {



  if (checkDomain==1) {
  finalresult ="Not phishing: one link is the same sender domain" ;
  counterDomain += 1;
  counterTotal  += 1;


 // var finalresult= "it's phisihng";
 // MyApp.finalresult = finalresult;
 /////////////////////////////////////////////////////////////
}
 if (checkDomain==0) { 
  
        if (whitelist (host)){
      
        counterWhiteList += 1;
        counterTotal  += 1;

        finalresult= "Not phishing: One link at least im white list";


        }else {
          
        finalresult ="Phishing: Diffrent domains and not in whitelist" ;
      
        counterNotWhiteList += 1;
        counterTotal  += 1;



        }
}
    console.log("matching domain  :",counterDomain); 
    console.log("In white List    :",counterWhiteList); 
    console.log("Not in white list or matching domain:",counterNotWhiteList); 
    console.log("There isn't      :",counterToolCant);
    console.log("counterisIP      :",counterisIP);
    console.log("counterNumbDots      :",counterNumbDots);
    console.log("Total            :",counterTotal);
}
////////////////////////////////////////////////////////////


  

//////////////////////////////////////////////////////////
  
var node   = document.createElement("row");                 // Create a <row> node
var child1 = document.createElement("label");
var child2 = document.createElement("mail-headerfield");

child1.setAttribute("class", "headerName");
child2.setAttribute("class", "headerValue");
var child1_text = document.createTextNode("Phish Result:");
child1.appendChild(child1_text);
var child2_text = document.createTextNode( finalresult );         // Create a text node
child2.appendChild(child2_text);

node.appendChild(child1);
node.appendChild(child2);


var elm = document.getElementById("expandedHeader2Rows");

if(check2 == false){
elm.appendChild(node);
//alert("false");
check2 = true;
}else{
elm.removeChild(elm.lastChild);
elm.appendChild(node);
}


}




//console.log(fullBody);

//console.log(fullBody);
// var msg_html=document.getElementById("messagepane");
// console.log(msg_html);
// console.log(msg_html._contentWindow);

// var childs = msg_html.children;
// console.log(childs);

// for (i = 0; i < childs.length; i++) {
//   console.log("window",childs[i].tagName);
      
//     }

// var element = document.evaluate( '//body//form/p/textarea' ,msg_html, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
// if (element != null) {
//   element.value = '...';
// }
// var dd = document.getElementsByTagName("HTML");
// console.log(dd,"dd");
//----------------------------------------------------------------------------------------------------
// var something =Components.utils.import("chrome://custombutton/content/thunderbird-stdlib-master/msgHdrUtils.js")

//  var msgHdr = gFolderDisplay.selectedMessage;
//  msgHdrsModifyRaw([msgHdr], function(input) {
//     // modify the raw input here.
//     var modified = input.modify();
//     console.log("modified",modified);
//     return modified
// });
///------------------------------------------------------------------
//var found = null;
//var test1= eval("(" + fullBody + ")");

//console.log(fullBody);
//var e = test1.getElementsByTagName('a');

//console.log(e);

//var arms = $("a[href]");

//var e1 = document.getElementsByTagName('a')[0];
//var e2 = document.getElementsByTagName('a')[0].innerHTML;
//var e3 = document.getElementsByTagName('a').innerHTML;

// for (var i=0; i < e.length; i++) {
//     found = e[i];
//     alert(found);
// }
// var reg  = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g;

// var href = fullBody.match(reg);
// var urls = [];
// for (i =0, k=href.length; i <k; i++){
// 	urls= href[i];
   
   
// }
// console.log(urls);

// show headers----------------------------------------------------------- shows header dkim
// show headers
// var msgHdr = gFolderDisplay.selectedMessage;
// var msgUri = msgHdr.folder.getUriForMsg(msgHdr);
// var messenger = Components.classes["@mozilla.org/messenger;1"].
//   createInstance(Components.interfaces.nsIMessenger);
// var msgService = messenger.messageServiceFromURI(msgUri);

// var scriptableInputStream = Components.classes["@mozilla.org/scriptableinputstream;1"].
//   createInstance(Components.interfaces.nsIScriptableInputStream);

// var syncStreamListener = Components.classes["@mozilla.org/network/sync-stream-listener;1"].
//   createInstance(Components.interfaces.nsISyncStreamListener);

// scriptableInputStream.init(syncStreamListener);

// var messageUri = msgService.streamHeaders(msgUri, syncStreamListener, null);
// var data = new String();
// var count = scriptableInputStream.available();
// while (count) {
//   data = data + scriptableInputStream.read(count);
//   count = scriptableInputStream.available();
// }
// scriptableInputStream.close();
//alert(data);



CustomButton = {

1: function () {
  window.open('mailto:asamarka@uccs.edu?subject=phishing &body=its phishing  '+MyApp.fullBody);

    counterDomain       =0;
    counterWhiteList    =0; 
    counterNotWhiteList =0;
    counterToolCant     =0;
    counterisIP         =0;
    counterNumbDots     =0;
    counterTotal        =0;
},

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
              var fe;
              fe= lines[line].substring(2,17);
              f.push(fe);
              //console.log("the 0 zero array of f",f);
            }
            else if (res=="1"){
              var te;
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

var rawFile = new XMLHttpRequest();

var newPathname = "";
for (i = 0,m =f.length; i<m; i++) {
  newPathname = "chrome://custombutton/content/2017/";
  newPathname += f[i];
  rawFile.open("GET", newPathname, true);
  rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                //console.log("t length",t.length);
                //console.log("f length",f.length);
                console.log("current file",newPathname);
                MassegeContent(allText);
                Domain(allText);

                console.log(allText);
              }
}
}
    rawFile.send(null);
}
}


function Domain (){

// var reg6 =  /.*@/;
// var reg  = /^From:.*$/;

// SenderDomain = reg.exec(message);
// console.log("...................................SenderDomain...........................",SenderDomain);
////////////////////////////////////////////////
 //works fine 
var msgHdr= gFolderDisplay.selectedMessage;
var sender = msgHdr.mime2DecodedAuthor;
var reg6 =  /.*@/;
var domain = sender.replace(reg6, "");
var domain2 = domain.replace('\>', "");


var parsee    = tldjs.parse(domain2);
var dadomain  = parsee.domain;

MyApp.domain    = domain2;
MyApp.dadomain  = dadomain;
////////////////////////////////////////////////


}
