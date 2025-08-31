// JavaScript source code
import Application from "../../../framework/scripts/application.js";
import Dispatcher from "../../../framework/scripts/dispatcher.js";
import Popup from "../../../framework/scripts/popup.js";
import Toolbar from "../../../framework/scripts/toolbar.js";
import ClamCanvas from "./clam_canvas.js";
import LayerToolbar from "./layer_toolbar.js";
import CanvasPopup from "./popups/canvas_popup.js";
import ToolsToolbar from "./tools_toolbar.js";

export default class ClamApp extends Application
{
    static GlobalDispatcher = null
    static DefaultWidth = 50
    static DefaultHeight = 50
    static DefaultPrimaryColor = '#ffffff'


    constructor()
    {
        super()

        this.clamDispatcher = new Dispatcher()
        ClamApp.GlobalDispatcher = this.clamDispatcher;

        this.clamCanvas = new ClamCanvas()
        this.layerToolbar = new LayerToolbar()
        this.toolsToolbar = new ToolsToolbar()


        let popupTest = new CanvasPopup()
        ClamApp.GlobalDispatcher.on('PRIMARY_COLOR_UPDATE', (_newColor)=>{this.clamCanvas.currentColor = _newColor});

        ClamApp.GlobalDispatcher.on('SAVE_CANVAS', this.onSaveCanvas.bind(this));
        
        ClamApp.GlobalDispatcher.on('NEW_CANVAS', (_width, _height)=>{this.clamCanvas.setCanvas('default', _width, _height)});
    }



    onSaveCanvas()
    {
        
        let canvasToDownload = this.clamCanvas.canvas;
        let imageDataURL = canvasToDownload.toDataURL('image/png'); // Or 'image/jpeg'
        let downloadLink = document.createElement('a');

        downloadLink.href = imageDataURL;
        downloadLink.download = 'canvas_image.png'; // Specify your desired 
        downloadLink.click();
        downloadLink.remove();
    }

}