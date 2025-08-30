// JavaScript source code

import Popup from "../../../../framework/scripts/popup.js";
import ClamApp from "../clam_app.js";

export default class CanvasPopup extends Popup
{
    constructor()
    {
        super();
        ClamApp.GlobalDispatcher.on('NEW_CANVAS_CLICK', this.showPopup.bind(this, true))

    }

    createPopupBase()
    {
        super.createPopupBase();
        
        let title = document.createElement('h1');
        title.append('Create Canvas')
        this.popupBase.appendChild(title);

        this.width = 500;
        this.height = 500;

        this.widthInput = this.addInput('width', this.width);
        this.heightInput = this.addInput('height', this.height)

        let applyButton = this.addCloseButton('Apply');
        let cancelButton = this.addCloseButton('Cancel');
    }


    addInput(_input, _defaultValue)
    {
        let input = document.createElement('input');
        input.placeholder = _defaultValue;

        this.popupBase.appendChild(input);
        return input;
    }

    closePopup()
    {
        this.width = this.widthInput.value ? this.widthInput.value : ClamApp.DefaultWidth
        this.height = this.heightInput.value ? this.heightInput.value : ClamApp.DefaultHeight
        
        super.closePopup()

        ClamApp.GlobalDispatcher.emit('CLOSE_CANVAS', this.width, this.height);

    }
}