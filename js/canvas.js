export class CanvasManager {
    constructor(canvasId) {
        this.canvas = new fabric.Canvas(canvasId, {
            width: 800,
            height: 600,
            backgroundColor: '#15803d' // Darker green for a premium look
        });
        this.drawCourt();
    }

    drawCourt() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const lineStyles = {
            stroke: 'white',
            strokeWidth: 2,
            fill: 'transparent',
            selectable: false,
            evented: false
        };

        // Outer Boundary
        const boundary = new fabric.Rect({
            left: 10,
            top: 10,
            width: w - 20,
            height: h - 20,
            ...lineStyles
        });

        // Center Line
        const centerLine = new fabric.Line([w / 2, 10, w / 2, h - 10], lineStyles);

        // Center Circle
        const centerCircle = new fabric.Circle({
            left: w / 2 - 60,
            top: h / 2 - 60,
            radius: 60,
            ...lineStyles
        });

        // Small Center Circle
        const smallCenterCircle = new fabric.Circle({
            left: w / 2 - 5,
            top: h / 2 - 5,
            radius: 5,
            fill: 'white',
            strokeWidth: 0,
            selectable: false,
            evented: false
        });

        // Left Key (Paint)
        const leftKey = new fabric.Rect({
            left: 10,
            top: h / 2 - 80,
            width: 150,
            height: 160,
            ...lineStyles
        });

        // Right Key (Paint)
        const rightKey = new fabric.Rect({
            left: w - 160,
            top: h / 2 - 80,
            width: 150,
            height: 160,
            ...lineStyles
        });

        // Left 3-point Line (Approximation with Path)
        // Standard 3pt is 6.75m. In 800px, 15m is 580px? 1px approx 0.025m.
        // Let's just make it look good.
        const left3Point = new fabric.Path('M 10 70 Q 180 70 180 300 Q 180 530 10 530', {
            ...lineStyles
        });

        const right3Point = new fabric.Path(`M ${w - 10} 70 Q ${w - 180} 70 ${w - 180} 300 Q ${w - 180} 530 ${w - 10} 530`, {
            ...lineStyles
        });

        // Add to canvas
        this.canvas.add(boundary, centerLine, centerCircle, smallCenterCircle, leftKey, rightKey, left3Point, right3Point);
        this.canvas.sendToBack(boundary);
        this.courtObjects = [boundary, centerLine, centerCircle, smallCenterCircle, leftKey, rightKey, left3Point, right3Point];
    }

    getCanvas() {
        return this.canvas;
    }

    clearNonCourt() {
        const objects = this.canvas.getObjects();
        objects.forEach(obj => {
            if (!this.courtObjects.includes(obj)) {
                this.canvas.remove(obj);
            }
        });
    }
}
