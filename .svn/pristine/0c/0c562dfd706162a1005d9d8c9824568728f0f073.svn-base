// a phantomjs example
var page = require('webpage').create();
phantom.outputEncoding="gbk";
page.open("http://new.dss.way-s.cn/home", function(status) {
  if ( status === "success" ) {
    console.log(page.content); 
  } else {
    console.log("Page failed to load."); 
  }
  phantom.exit(0);
 });