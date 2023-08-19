// importing stuff
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron');
const url = require('url');
const path = require('path');

// variables
let mainWindow;
let giphyWindow;

// menus
const menuTemplate = [{
    label: 'File',
    submenu: [{
            label: 'Quit',
            accelerator: process.platform === 'darwin' ? 'command+Q' : 'ctrl+Q',
            click() {
                app.exit();
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'reload',
            accelerator: 'ctrl+R',
            click() {
                mainWindow.reload()
            }
        },
    ]
}];

// context menu
const ctxMenu = [{
        label: "New Folder"
    },
    {
        label: "Select All"
    }
];

// main stuff
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
        
    // mainWindow.webContents.openDevTools();
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

// giphy app
const openGiphy = () => {
    giphyWindow = new BrowserWindow({
        width: 3000,
        height: 1000,
        title: 'Get a GIF'
    });

    giphyWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/app/giphy/gag.html'),
        protocol: 'file:',
        slashes: true
    })).then();
}

const openNotepad = () => {
    giphyWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        title: 'NOTEPAD'
    });

    giphyWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/app/notepad/np.html'),
        protocol: 'file:',
        slashes: true
    })).then();
}

// opening apps
ipcMain.on('open', (event, arg) => {
    if (arg == 'giphy') {
        openGiphy();
        console.log('giphy opened')
    } else if (arg == 'notepad') {
        openNotepad();
        console.log('Notepad opened')
    }
})