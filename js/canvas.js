export class CanvasManager {
    constructor(canvasId) {
        this.canvas = new fabric.Canvas(canvasId, {
            width: 800,
            height: 600,
            backgroundColor: '#d6a676' // Classic Hardwood floor color
        });
        this.drawCourt();
    }

    drawCourt() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const lineStyles = {
            stroke: 'white', // White lines are standard on hardwood
            strokeWidth: 3,
            fill: 'transparent',
            selectable: false,
            evented: false
        };

        // Court Background (Full floor)
        const boundary = new fabric.Rect({
            left: 0,
            top: 0,
            width: w,
            height: h,
            fill: '#d6a676',
            selectable: false,
            evented: false
        });

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

        // Small Center Circle (Jump ball spot)
        const smallCenterCircle = new fabric.Circle({
            left: w / 2 - 10,
            top: h / 2 - 10,
            radius: 10,
            fill: 'white',
            selectable: false,
            evented: false
        });

        // Paint Areas (Keys) - Often colored contrasting/team color or just wood.
        // Let's us a subtle overlay to distinguish the key area slightly, or standard Red/Blue.
        // Going with a classic "Red Paint" style but translucent to blend with wood.
        const leftKey = new fabric.Rect({
            left: 20,
            top: h / 2 - 80,
            width: 150,
            height: 160,
            fill: 'rgba(200, 30, 30, 0.4)',
            ...lineStyles
        });

        const rightKey = new fabric.Rect({
            left: w - 170,
            top: h / 2 - 80,
            width: 150,
            height: 160,
            fill: 'rgba(200, 30, 30, 0.4)',
            ...lineStyles
        });

        // Free Throw Semi-Circles
        // Top of key arc
        const leftFreeThrow = new fabric.Path(`M 170 ${h / 2 - 80} A 60 60 0 0 1 170 ${h / 2 + 80}`, {
            ...lineStyles
        });

        const rightFreeThrow = new fabric.Path(`M ${w - 170} ${h / 2 - 80} A 60 60 0 0 0 ${w - 170} ${h / 2 + 80}`, {
            ...lineStyles
        });

        // 3-Point Lines
        // Pro distance is further, but for a tactical board this approximation works well visually
        const left3Point = new fabric.Path(`M 20 ${h / 2 - 250} L 100 ${h / 2 - 250} Q 300 ${h / 2} 100 ${h / 2 + 250} L 20 ${h / 2 + 250}`, {
            ...lineStyles,
            fill: 'transparent'
        });

        const right3Point = new fabric.Path(`M ${w - 20} ${h / 2 - 250} L ${w - 100} ${h / 2 - 250} Q ${w - 300} ${h / 2} ${w - 100} ${h / 2 + 250} L ${w - 20} ${h / 2 + 250}`, {
            ...lineStyles,
            fill: 'transparent'
        });

        // Add objects (Order matters for layering)
        this.clearNonCourt(true); // Internal clear helper

        const courtItems = [
            boundary, border, centerLine, centerCircle, smallCenterCircle,
            leftKey, rightKey, leftFreeThrow, rightFreeThrow, left3Point, right3Point
        ];

        this.canvas.add(...courtItems);
        this.courtObjects = courtItems;

        // Lock background interaction
        this.courtObjects.forEach(obj => {
            this.canvas.sendToBack(obj);
        });
    }

    getCanvas() {
        return this.canvas;
    }

    clearNonCourt(force = false) {
        // If force is true, we are re-drawing court, so don't delete court objects yet (handled by rewrite)
        // But actually basic clear usage:
        const objects = this.canvas.getObjects();
        objects.forEach(obj => {
            if (!this.courtObjects.includes(obj)) {
                this.canvas.remove(obj);
            }
        });
    }
}
