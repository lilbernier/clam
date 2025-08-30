import ClamApp from "./clam_app.js";

export default class ClamCanvas
{
    constructor()
    {
        this.clamCanvas = document.createElement('div');
        this.clamCanvas.id = 'clamvas';
        this.clamCanvas.classList.add('clamvas');
        document.body.appendChild(this.clamCanvas);

        this.width = ClamApp.DefaultWidth;
        this.height = ClamApp.DefaultHeight;
        this.currentScale = 1;

        this.scaleSpeed = .5;
        this.scaleMinMax = [0.1, 50];

        this.currentColor = ClamApp.DefaultPrimaryColor;

        this.setCanvas('default', this.width , this.height)
        // this.drawCanvasTest();
        this.setInputs()
    }

    setInputs()
    {
        window.addEventListener('wheel', (event) => {
            // Access properties of the WheelEvent object
            const deltaY = event.deltaY; // Vertical scroll amount
            const deltaX = event.deltaX; // Horizontal scroll amount

            let scale = this.currentScale

            if (deltaY > 0) {
                scale -= this.scaleSpeed;

                console.log('Scrolling down');
            } else if (deltaY < 0) {
                scale += this.scaleSpeed;
                console.log('Scrolling up');
            }
            
            this.setScale(scale)
        });


        document.addEventListener('keydown', function(event) {
            // Check if the pressed key is the Escape key
            if (event.key === 'Escape') {
                this.setCanvas('default', 1000, 100);
            }
        }.bind(this));

    }


    setScale(_scale)
    {
        this.currentScale =  Math.min(Math.max(_scale, this.scaleMinMax[0]), this.scaleMinMax[1]);
        
        let scaledWidth = (this.width * this.currentScale) + 'px';
        let scaledHeight = (this.height * this.currentScale) + 'px';

        this.clamCanvas.style.width = scaledWidth;
        this.clamCanvas.style.height = scaledHeight;

        this.canvas.style.width = scaledWidth;
        this.canvas.style.height = scaledHeight;
    }


    onClick()
    {
        let rect = this.canvas.getBoundingClientRect();

        // Calculate unscaled mouse position relative to canvas
        let mouseXUnscaled = event.clientX - rect.left;
        let mouseYUnscaled = event.clientY - rect.top;

        // Calculate scaling factors
        let scaleX = this.canvas.width / rect.width;
        let scaleY = this.canvas.height / rect.height;

        // Apply scaling to get the position in canvas's internal pixel space
        let correctedX = mouseXUnscaled * scaleX;
        let correctedY = mouseYUnscaled * scaleY;

        console.log(`Scaled Mouse Position: X=${correctedX}, Y=${correctedY}`);

        this.drawAtPosition(correctedX, correctedY)
    }


    drawAtPosition(_x, _y)
    {
        let x = _x;
        let y = _y;

        
        x = Math.floor(x)
        y= Math.floor(y)

        let ctx = this.canvas.getContext("2d");

        // Example: Draw a circle at the scaled mouse position
        // ctx.beginPath();
        // ctx.arc(_x, _y, 2, 0, 2 * Math.PI);
        // ctx.fillStyle = this.currentColor;
        // ctx.fill();

        ctx.fillStyle = this.currentColor; // Set fill color
        ctx.fillRect(x, y, 1, 1); // Draw a filled rectangle (x, y, width, height)

    }

    deleteCanvas()
    {
        if(this.canvas != null)
        {
            this.clamCanvas.removeChild(this.canvas)
            this.canvas.remove()
        }
    }

    setCanvas(name, _width, _height)
    {
        this.deleteCanvas()

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'drawCanvas';
        this.canvas.classList.add('drawCanvas');

        this.width = _width
        this.height = _height

        this.canvas.width = _width;
        this.canvas.height = _height;

        this.canvas.style.border = '1px solid black';

        let ctx = this.canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        // Older browser compatibility (for older versions of Chrome and Firefox)
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;

        this.clamCanvas.appendChild(this.canvas);

        this.fitCanvasToScreen()

        //this.canvas.addEventListener('click', this.onClick.bind(this));

        let isDrawing = false;
        this.canvas.addEventListener('mousedown', (e) => 
        {
            isDrawing = true;
            this.onClick(e); // call immediately on click down if you want
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (isDrawing) 
            {
                this.onClick(e); // keep drawing while dragging
            }
        });

        this.canvas.addEventListener('mouseup', () => 
        {
            isDrawing = false; // stop drawing when mouse is released
        });

        // (optional) handle case when mouse leaves canvas
        this.canvas.addEventListener('mouseleave', () => 
        {
            isDrawing = false;
        });
    }


    fitCanvasToScreen()
    {
        let viewportWidth = window.innerWidth - 200;
        let viewportHeight = window.innerHeight - 100;

        let heightMultiplier = viewportHeight / this.height
        let widthMultiplier = viewportWidth / this.width
        
        this.setScale(Math.min(widthMultiplier, heightMultiplier));
    }
}