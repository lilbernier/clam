// JavaScript source code

export default class Toolbar
{
    constructor()
    {
         this.createToolBarDiv();


    }


    createToolBarDiv()
    {
        this.toolbarHost = document.createElement('div');
        this.toolbarHost.id = 'toolbar';
        this.toolbarHost.classList.add('toolbar');
        document.body.appendChild(this.toolbarHost);
    }


    addToolBarButton(_text)
    {
        let newBtn = document.createElement('button');
        newBtn.append(_text)
        // newBtn.id = 'toolbar';
        // newBtn.classList.add('toolbar');

        this.toolbarHost.appendChild(newBtn);
    }

}