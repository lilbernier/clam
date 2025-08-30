// JavaScript source code

export default class Popup
{
    constructor()
    {
         this.createPopupBase();
    }


    

    createPopupBase()
    {
        this.popupBase = document.createElement('div');

        this.popupBase.id = 'popup';
        this.popupBase.classList.add('popup');
        
        document.body.appendChild(this.popupBase);


        this.closeButtonDiv = document.createElement('div');
        this.closeButtonDiv.id = 'closeButtonDiv';
        this.closeButtonDiv.classList.add('closeButtonDiv');
        this.popupBase.appendChild(this.closeButtonDiv);

        this.showPopup(false);
    }


    addCloseButton(_closeButtonName)
    {
        let closeButton = document.createElement('button');
        closeButton.id = 'closeButton';
        closeButton.classList.add('closeButton');
        closeButton.append(_closeButtonName);
        this.closeButtonDiv.appendChild(closeButton);
        
        closeButton.addEventListener("click", this.closePopup.bind(this));
        
        return closeButton;
    }

    closePopup()
    {
        this.showPopup(false)
    }

    showPopup(_bool)
    {
        let display = _bool ? 'block' : 'none';
        this.popupBase.style.display = display;
    }
}