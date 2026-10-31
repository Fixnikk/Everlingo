const {app,BrowserWindow,Menu,shell}=require('electron');
const path=require('path');
const dir=process.env.PORTABLE_EXECUTABLE_DIR||path.dirname(app.getPath('exe'));
try{app.setPath('userData',path.join(dir,'JSON-Lingvo-data'))}catch(e){}
if(!app.requestSingleInstanceLock())app.quit();
function create(){
 Menu.setApplicationMenu(null);
 const w=new BrowserWindow({width:520,height:840,minWidth:360,minHeight:520,title:'JSON-Лингво',autoHideMenuBar:true,backgroundColor:'#131f24',webPreferences:{contextIsolation:true,sandbox:true}});
 w.loadFile('index.html');
 w.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return{action:'deny'}});
}
app.whenReady().then(create);
app.on('window-all-closed',()=>app.quit());
