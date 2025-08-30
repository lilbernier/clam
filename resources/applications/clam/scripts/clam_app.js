// JavaScript source code
import Application from "../../../framework/scripts/application.js";
import ClamCanvas from "./clam_canvas.js";
import LayerToolbar from "./layer_toolbar.js";
import ToolsToolbar from "./tools_toolbar.js";

export default class ClamApp extends Application
{
    constructor()
    {
        super()

        this.clamCanvas = new ClamCanvas()

        this.layerToolbar = new LayerToolbar()
        this.toolsToolbar = new ToolsToolbar()

    }



}