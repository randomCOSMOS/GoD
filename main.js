// importing stuff
const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');

// variables
let mainWindow;
let addWindow

// menus
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Reload',
                accelerator: process.platform === 'darwin' ? 'command+R' : 'ctrl+R',
                click() {
                    mainWindow.reload();
                }
            },
            {
                label: "Dev Tool",
                accelerator: 'f12',
                click() {
                    addWindow.webContents.openDevTools();
                }
            },
            {type: 'separator'},
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'command+Q' : 'ctrl+Q',
                click() {
                    app.exit();
                }
            },
            {
                label: 'test',
                click(){
                    createWindow()
                }
            }
        ]
    }
];

const ctxMenu = [
    {label: "New Folder"},
    {label: "Select All"}
];

// main stuff
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.setFullScreen(true);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    })).then();

    const context = Menu.buildFromTemplate(ctxMenu);
    const mainMenu = Menu.buildFromTemplate(menuTemplate);

    Menu.setApplicationMenu(mainMenu);
    mainWindow.webContents.on('context-menu', (e, params) => {
        context.popup(mainWindow, params.x, params.y);
    });
});

function createWindow() {
    addWindow = new BrowserWindow({
        width: 3000,
        height: 1000,
        title: 'Get a GIF'
    });

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/gag.html'),
        protocol: 'file:',
        slashes: true
    })).then();
}