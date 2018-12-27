const electron = require("electron");
const app = electron.app;

module.exports =  [
	{
		label: "Edit",
		submenu: [
			{ role: "undo" },
			{ role: "redo" },
			{ type: "separator" },
			{ role: "cut" },
			{ role: "copy" },
			{ role: "paste" },
			{ role: "pasteandmatchstyle" },
			{ role: "delete" },
			{ role: "selectall" },
			{ type: "separator" },
			{
				label: "Quit",
				click: () => app.quit(),
				accelerator: "Cmd+q"
			}
		]
	},
	{
		label: "View",
		submenu: [
			{ role: "reload" },
			{ role: "toggledevtools" },
			{ type: "separator" },
			{ role: "resetzoom" },
			{ role: "zoomin" },
			{ role: "zoomout" },
			{ type: "separator" },
			{ role: "togglefullscreen" }
		]
	},
	{
		role: "window",
		submenu: [
			{ role: "minimize" },
			{ role: "close" }
		]
	},
	{
		role: "help",
		submenu: [
			{
				label: "Learn More",
				click () { require("electron").shell.openExternal("https://electronjs.org"); }
			}
		]
	}
];

  
