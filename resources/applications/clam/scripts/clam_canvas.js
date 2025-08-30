
export default class ClamCanvas
{
    constructor()
    {
        this.clamCanvas = document.createElement('div');
        this.clamCanvas.id = 'clamvas';
        this.clamCanvas.classList.add('clamvas');
        document.body.appendChild(this.clamCanvas);
    }

}