const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
const path = require('path');
const url = require('url');
let PantallaPrincipal;


function muestraPantallPrincipal () {
	PantallaPrincipal = new BrowserWindow({width:620, height:825});
	PantallaPrincipal.loadURL(url.format({
		pathname : path.join(__dirname, 'index.html'),
		protocol : 'file',
		slashes : true
	}));
	PantallaPrincipal.webContents.openDevTools();
	PantallaPrincipal.show();
}

app.on('ready', muestraPantallPrincipal);