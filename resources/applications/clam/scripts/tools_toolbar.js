import Toolbar from "../../../framework/scripts/toolbar.js";
import ClamApp from "./clam_app.js";

export default class ToolsToolbar extends Toolbar
{ 
    constructor()
    {
        super()

        this.save = this.addToolBarButton('Save')
        this.load = this.addToolBarButton('Load')
        this.new = this.addToolBarButton('New')

        this.brush = this.addToolBarButton('Brush')

        this.toolbarHost.classList.add('left');


        this.new.addEventListener("click", ()=>{ClamApp.GlobalDispatcher.emit('NEW_CANVAS_CLICK')});
    }

}