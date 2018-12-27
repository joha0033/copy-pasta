const electron = require("electron");
const path = require("path");
const app = electron.app;
const { BrowserWindow, globalShortcut, clipboard, Menu, Tray } = electron;

const template = require("./menu");

const STACK_SIZE = 5;
const ITEM_MAX_LENGTH = 18;

const formatItem = (item) =>  item && item.length > ITEM_MAX_LENGTH 
	? item.substr(0, ITEM_MAX_LENGTH) + "..."
	: item;

const formatContextMenuStack = (clipboard, stack) => 
	stack.map((item, index) => ({
		label: `Copy: ${formatItem(item)}`,
		click: _ => clipboard.writeText(item),
		accelerator: `Cmd+Alt+${index + 1}`
	}));
			
const addToStack = (item, stack) => 
	[item].concat(
		stack.length >= STACK_SIZE 
			? stack.slice(0, stack.length -1 ) 
			: stack
	);
    
const checkClipboard = (clipboard, onChange) => {
	let cache = clipboard.readText();
	let latest;
	setInterval(() =>{
		latest = clipboard.readText();
		if(latest !== cache){
			cache = latest;
			onChange(cache);
		}
	}, 2000);
};

const registerShortcuts = (globalShortcut, clipboard, stack) => {
	globalShortcut.unregisterAll();
	for(let i = 0; i < STACK_SIZE; ++i){
		globalShortcut.register(`Cmd+Alt+${i + 1}`, _ => {
			clipboard.writeText(stack[i]);
		});
	}
};

app.on("ready", () => {
	new BrowserWindow();

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
    
	
	let tray = new Tray(path.join("src", "trayIcon.png"));
	tray.setContextMenu(Menu.buildFromTemplate([{
		label: "<Empty>",
		enabled: false
	}]));
    
	let stack = [];
	checkClipboard(clipboard, text => {
		stack = addToStack(text, stack);
		tray.setContextMenu(Menu.buildFromTemplate(formatContextMenuStack(clipboard, stack)));
		registerShortcuts(globalShortcut, clipboard, stack);
	});
});

app.on("will-quit", _ => {
	globalShortcut.unregisterAll();
});
