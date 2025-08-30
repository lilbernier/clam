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
        this.primaryColorInput = this.addColorPicker()
        this.primaryColorInput.value = ClamApp.DefaultPrimaryColor
        this.primaryColorInput.addEventListener('change', ()=>{ClamApp.GlobalDispatcher.emit('PRIMARY_COLOR_UPDATE', this.primaryColorInput.value)})
        this.new.addEventListener("click", ()=>{ClamApp.GlobalDispatcher.emit('NEW_CANVAS_CLICK')});
    }


    addColorPicker()
    {
        let newBtn = document.createElement('input');
        newBtn.type = 'color';
        newBtn.classList.add('colorPicker')
        this.toolbarHost.appendChild(newBtn);
        return newBtn;
    }

}