import Dispatcher from "../../../framework/scripts/dispatcher.js";

export default class PSXConverter
{
    static GlobalDispatcher = null

    constructor()
    {

        this.dispatcher = new Dispatcher()
        PSXConverter.GlobalDispatcher = this.dispatcher;

        this.targetWidth = 128;
        this.targetHeight = 128;
        this.zoomAmount = 90;

        this.dragndrop = document.getElementById('drag_n_drop')
        this.dragndrop.ondrop = (_ev)=>{
            this.onDrop(_ev)}
        this.dragndrop.ondragover = (_ev)=>{
            this.onDragOver(_ev)}


        this.convertButton = document.getElementById('convert_button')
        this.convertButton.onclick = ()=>{this.convertImages()}

        this.imageViewingArea = document.createElement('div');
        this.imageViewingArea.classList.add('image_display_container');
        this.imageViewingArea.style.width = '100%'
        document.body.appendChild(this.imageViewingArea);


        this.inputContainer = document.createElement('div');
        //this.clamCanvas.id = 'clamvas';
        this.inputContainer.classList.add('image_display_container');
        this.imageViewingArea.appendChild(this.inputContainer);

        this.outputContainer = document.createElement('div');
        this.outputContainer.classList.add('image_display_container');
        this.imageViewingArea.appendChild(this.outputContainer);
        
        this.arrInputImages = []
        this.arrOutputImages = []


        this.modal = document.getElementById("image_modal");
        this.modalImg = document.getElementById("full_image");
        this.closeBtn = document.getElementById("close_btn");

        this.zoomIn = document.getElementById("zoom_in");
        this.zoomOut = document.getElementById("zoom_out");

        this.zoomIn.onclick = () => this.onFullImageZoom(5) 
        this.zoomOut.onclick = () => this.onFullImageZoom(-5) 

        this.saveButton = document.getElementById("save_button");
        this.saveButton.onclick = () => this.saveImages();

        this.closeBtn.onclick = () => this.modal.style.display = "none";
        window.onclick = (event) => {
            if (event.target === this.modal) this.modal.style.display = "none";
        };


        this.widthInputText = document.getElementById("width_input");
        this.heightInputText = document.getElementById("height_input");


    }

    onFullImageZoom(_zoomAdd)
    {
        this.zoomAmount += _zoomAdd
        this.modalImg.style.height = this.zoomAmount + '%'
    }


    openModal(imgSrc) 
    {
        this.modal.style.display = "flex";
        this.modalImg.src = imgSrc;
        this.zoomAmount = 90;
        this.modalImg.style.height = '90%'
    }


    onDragOver (ev) {
        ev.preventDefault();
    }
    onDrop(_ev){
        _ev.preventDefault();
        if (_ev.dataTransfer.files) 
        {
            let files = _ev.dataTransfer.files;
            for (let index = 0; index < files.length; index++) 
            {
                const file = _ev.dataTransfer.files[index];
                if (file.type.startsWith('image/')) 
                {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = document.createElement('img');
                        img.classList.add('image_display')
                        img.src = e.target.result; // The base64 data
                        this.arrInputImages.push(img)
                        this.inputContainer.appendChild(img);
                        img.onclick = ()=>{
                            this.openModal(img.src)
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
        }

        //const data = ev.dataTransfer.getData("text");
        // _ev.target.appendChild(document.getElementById(data));
    }


    convertImages()
    {
        this.arrOutputImages = []
        this.outputContainer.replaceChildren();
        this.targetWidth = parseInt(this.widthInputText.value)
        this.targetHeight = parseInt(this.heightInputText.value)


        for (let index = 0; index < this.arrInputImages.length; index++) 
        {
            const img = this.arrInputImages[index];
            let processedImage = this.processImage(img, this.targetWidth, this.targetHeight);
            this.arrOutputImages.push(processedImage)
        }

        for (let index = 0; index < this.arrOutputImages.length; index++) 
        {
            const img = document.createElement('img');
            img.classList.add('image_display')
            img.src = this.arrOutputImages[index];
            this.outputContainer.appendChild(img);
            img.onclick = ()=>{
                this.openModal(img.src)
            }
        }

    }


    processImage(_image, _targetWidth, _targetHeight)
    {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = _targetWidth;
        canvas.height = _targetHeight;

        ctx.imageSmoothingEnabled = true;
        ctx.webkitImageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true; 
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(_image, 0, 0, _targetWidth, _targetHeight);

        return canvas.toDataURL('image/png');
    }



    // onSaveCanvas()
    // {
    //     let canvasToDownload = this.clamCanvas.canvas;
    //     let imageDataURL = canvasToDownload.toDataURL('image/png'); // Or 'image/jpeg'
    //     let downloadLink = document.createElement('a');

    //     downloadLink.href = imageDataURL;
    //     downloadLink.download = 'canvas_image.png'; // Specify your desired 
    //     downloadLink.click();
    //     downloadLink.remove();
    // }

    saveImages()
    {
        for (let index = 0; index < this.arrOutputImages.length; index++) {
            this.saveImage(this.arrOutputImages[index], index + '.png')
        }
    }

    saveImage(_imgSrc, _name)
    {
        let downloadLink = document.createElement('a');
        downloadLink.href = _imgSrc;
        downloadLink.download = _name;
        downloadLink.click();
        downloadLink.remove();
    }

}