import Toolbar from "../../../framework/scripts/toolbar.js";

export default class ToolsToolbar extends Toolbar
{ 
    constructor()
    {
        super()

        this.addToolBarButton('Save')
        this.addToolBarButton('Load')
        this.addToolBarButton('Test')
        this.toolbarHost.classList.add('left');
    }

}