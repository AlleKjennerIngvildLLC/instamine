import path from 'path';
import url from 'url';
import {app, crashReporter, BrowserWindow, Menu} from 'electron';

const cp = require('child_process');
const os = require('os');

const isDevelopment = (process.env.NODE_ENV === 'development');

let mainWindow = null;
let forceQuit = false;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

let child;

// start server!
if (isDevelopment) {
  child = cp.spawn('exec\\server.exe', ['exec\\miner_process_xmr_cpu.exe']);
  
} else {
  child = cp.spawn('server.exe', ['miner_process_xmr_cpu.exe']);
}

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

console.log("process pid: " + child.pid);
crashReporter.start({
  productName: 'Instamine',
  companyName: 'Alle Kjenner Ingvild LLC',
  submitURL: 'https://crash.instamine.net/report',
  uploadToServer: false
});

app.on('window-all-closed', () => {

  console.log('killing  ' + child.pid);

  cp.exec('taskkill.exe /F /T /PID ' + child.pid);
  
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({ 
    width: 1000, 
    height: 800,
    minWidth: 640,
    minHeight: 480,
    resizable: false,
    show: false,
    frame: false
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      app.on('activate', () => {
        mainWindow.show();
      });
      
      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });

  // mainWindow.webContents.openDevTools();

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools();

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(props.x, props.y);
        }
      }]).popup(mainWindow);
    });
  }
});
