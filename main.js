// importing stuff
const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');

// variables
let mainWindow;

// menus
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {label: 'Add Item'},
            {label: 'Clear Items'},
            {
                label: 'Reload',
                accelerator: process.platform === 'darwin' ? 'command+R' : 'ctrl+R',
                click() {
                    mainWindow.reload();
                }
            },
            {type: 'separator'},
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'command+Q' : 'ctrl+Q',
                click() {
                    app.exit();
                }
            }
        ]
    }
];

// main stuff
app.on('ready', () => {
    mainWindow = new BrowserWindow({});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    })).then();

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});