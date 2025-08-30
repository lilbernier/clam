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

        this.width = ClamApp.DefaultWidth;
        this.height = ClamApp.DefaultHeight;

        this.widthInput = this.addInput('width', this.width);
        this.heightInput = this.addInput('height', this.height)

        let applyButton = this.addCloseButton('Apply');
        applyButton.addEventListener('click', this.onApplyClick.bind(this))

        let cancelButton = this.addCloseButton('Cancel');
    }


    onApplyClick()
    {
        this.width = this.widthInput.value ? this.widthInput.value : ClamApp.DefaultWidth
        this.height = this.heightInput.value ? this.heightInput.value : ClamApp.DefaultHeight

        ClamApp.GlobalDispatcher.emit('NEW_CANVAS', this.width, this.height);
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
        super.closePopup()
    }
}