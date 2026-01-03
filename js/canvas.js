export class CanvasManager {
    constructor(canvasId) {
        this.canvas = new fabric.Canvas(canvasId, {
            width: 800,
            height: 600,
            backgroundColor: '#ffffff' // White schematic background
        });
        this.drawCourt();
    }

    drawCourt() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const lineStyles = {
            stroke: 'black',
            strokeWidth: 2,
            fill: 'transparent',
            selectable: false,
            evented: false
        };

        // Playing Area Border
        const border = new fabric.Rect({
            left: 20,
            top: 20,
            width: w - 40,
            height: h - 40,
            ...lineStyles
        });

        // Center Line
        const centerLine = new fabric.Line([w / 2, 20, w / 2, h - 20], lineStyles);

        // Center Circle
        const centerCircle = new fabric.Circle({
            left: w / 2 - 60,
            top: h / 2 - 60,
            radius: 60,
            ...lineStyles
        });

        // Small Center Circle
        const smallCenterCircle = new fabric.Circle({
            left: w / 2 - 10,
            top: h / 2 - 10,
            radius: 10,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 1,
            selectable: false,
            evented: false
        });

        // Keys (Paint) - Transparent for schematic look
        const leftKey = new fabric.Rect({
            left: 20,
            top: h / 2 - 80,
            width: 150,
            height: 160,
            ...lineStyles
        });

        const rightKey = new fabric.Rect({
            left: w - 170,
            top: h / 2 - 80,
            width: 150,
            height: 160,
            ...lineStyles
        });

        // Free Throw Arcs
        const leftFreeThrow = new fabric.Path(`M 170 ${h / 2 - 80} A 60 60 0 0 1 170 ${h / 2 + 80}`, {
            ...lineStyles
        });

        const rightFreeThrow = new fabric.Path(`M ${w - 170} ${h / 2 - 80} A 60 60 0 0 0 ${w - 170} ${h / 2 + 80}`, {
            ...lineStyles
        });

        // 3-Point Lines
        const left3Point = new fabric.Path(`M 20 ${h / 2 - 250} L 100 ${h / 2 - 250} Q 300 ${h / 2} 100 ${h / 2 + 250} L 20 ${h / 2 + 250}`, {
            ...lineStyles
        });

        const right3Point = new fabric.Path(`M ${w - 20} ${h / 2 - 250} L ${w - 100} ${h / 2 - 250} Q ${w - 300} ${h / 2} ${w - 100} ${h / 2 + 250} L ${w - 20} ${h / 2 + 250}`, {
            ...lineStyles
        });

        // Initialize courtObjects array
        this.courtObjects = [];

        // Add objects
        const courtItems = [
            border, centerLine, centerCircle, smallCenterCircle,
            leftKey, rightKey, leftFreeThrow, rightFreeThrow, left3Point, right3Point
        ];

        this.canvas.add(...courtItems);
        this.courtObjects = courtItems;

        this.courtObjects.forEach(obj => {
            this.canvas.sendToBack(obj);
        });

        // Force render to ensure canvas displays correctly
        this.canvas.renderAll();
    }

    getCanvas() {
        return this.canvas;
    }

    clearNonCourt(force = false) {
        if (!this.courtObjects) {
            this.courtObjects = [];
        }
        const objects = this.canvas.getObjects();
        objects.forEach(obj => {
            if (!this.courtObjects.includes(obj)) {
                this.canvas.remove(obj);
            }
        });
    }
}
