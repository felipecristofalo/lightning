var http = require('http');
var express = require('express');

var app = express();
app.use(express['static'](__dirname ));

app.listen(3000);
console.log('App Server running at port 3000');







var ZWave = require('/home/zwave/node_modules/openzwave-shared/lib/openzwave-shared.js');
var os = require('os');

var zwave = new ZWave({
	ConsoleOutput: false
});

zwave.on('driver failed', function() {
    console.log('failed to start driver');
    zwave.disconnect();
    process.exit();
});

zwave.on('scan complete', function() {
    if(process.argv[3] == 'true'){
    	zwave.setValue(process.argv[2],37,1,0,true);
    }else if(process.argv[3] == 'false'){
	zwave.setValue(process.argv[2],37,1,0,false);
    }else{
	console.log("no params");
    }
    
    zwave.disconnect();
});

zwavedriverpaths = {
	"darwin" : '/dev/cu.usbmodem1411',
	"linux"  : '/dev/ttyACM0'
}

//console.log("connecting to " + zwavedriverpaths[os.platform()]);
zwave.connect( zwavedriverpaths[os.platform()] );


