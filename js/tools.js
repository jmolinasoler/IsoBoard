export class ToolManager {
    constructor(canvas, attackersContainerId, defendersContainerId) {
        this.canvas = canvas;
        this.setupSidebarTools(attackersContainerId, defendersContainerId);
        this.setupDragAndDrop();
    }

    setupSidebarTools(attackersId, defendersId) {
        const attackersContainer = document.getElementById(attackersId);
        const defendersContainer = document.getElementById(defendersId);

        // Create Attackers 1-5
        for (let i = 1; i <= 5; i++) {
            const el = document.createElement('div');
            el.className = 'tool-item attacker';
            el.draggable = true;
            el.textContent = i;
            el.dataset.type = 'attacker';
            el.dataset.label = i;
            attackersContainer.appendChild(el);
        }

        // Create Defenders A-E
        const labels = ['A', 'B', 'C', 'D', 'E'];
        labels.forEach(label => {
            const el = document.createElement('div');
            el.className = 'tool-item defender';
            el.draggable = true;
            el.textContent = label;
            el.dataset.type = 'defender';
            el.dataset.label = label;
            defendersContainer.appendChild(el);
        });
    }

    setupDragAndDrop() {
        const items = document.querySelectorAll('.tool-item');
        console.log('Setting up drag and drop for', items.length, 'items');
        
        items.forEach(item => {
            console.log('Adding dragstart to:', item.dataset.type, item.dataset.label || item.textContent);
            item.addEventListener('dragstart', (e) => {
                console.log('DRAGSTART:', item.dataset.type, item.dataset.label);
                e.dataTransfer.setData('tool-type', item.dataset.type);
                e.dataTransfer.setData('tool-label', item.dataset.label || item.textContent);
                e.dataTransfer.effectAllowed = 'copy';
            });
        });

        const canvasWrapper = document.querySelector('.canvas-container');
        const canvasElement = this.canvas.upperCanvasEl; // The top canvas element that Fabric.js uses

        // Add dragover and drop listeners to both the wrapper and the canvas element
        let dragOverCount = 0;
        const handleDragOver = (e) => {
            if (dragOverCount % 50 === 0) { // Log every 50th event to avoid spam
                console.log('DRAGOVER event', dragOverCount);
            }
            dragOverCount++;
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            return false;
        };

        const handleDrop = (e) => {
            console.log('>>> DROP event triggered!', e.target);
            e.preventDefault();
            e.stopPropagation();

            const type = e.dataTransfer.getData('tool-type');
            const label = e.dataTransfer.getData('tool-label');
            console.log('>>> Dropped item:', { type, label });

            if (!type) {
                console.log('>>> No type found in dataTransfer');
                return;
            }

            // Get the pointer position relative to the canvas
            const pointer = this.canvas.getPointer(e);
            console.log('>>> Canvas pointer:', pointer);
            this.addObjectToCanvas(type, label, pointer.x, pointer.y);
        };

        // Listen on both wrapper and canvas element
        console.log('Adding event listeners to canvasWrapper and canvasElement');
        canvasWrapper.addEventListener('dragover', handleDragOver);
        canvasWrapper.addEventListener('drop', handleDrop);
        
        if (canvasElement) {
            console.log('Canvas element found, adding listeners');
            canvasElement.addEventListener('dragover', handleDragOver);
            canvasElement.addEventListener('drop', handleDrop);
        } else {
            console.warn('Canvas element (upperCanvasEl) not found!');
        }
    }

    addObjectToCanvas(type, label, x, y) {
        console.log('Adding object to canvas:', { type, label, x, y });
        let obj;
        const commonProps = {
            left: x,
            top: y,
            originX: 'center',
            originY: 'center',
            hasControls: true,
            hasBorders: true,
            borderColor: '#2563eb',
            cornerColor: '#2563eb',
            transparentCorners: false,
            cornerSize: 8
        };

        if (type === 'attacker' || type === 'defender') {
            const color = type === 'attacker' ? '#ef4444' : '#3b82f6';
            const circle = new fabric.Circle({
                radius: 20,
                fill: color,
                stroke: 'white',
                strokeWidth: 2,
                shadow: '0 4px 6px rgba(0,0,0,0.3)',
                originX: 'center',
                originY: 'center'
            });
            const text = new fabric.Text(String(label), {
                fontSize: 18,
                fill: 'white',
                fontWeight: 'bold',
                fontFamily: 'Inter, Arial, sans-serif',
                textBaseline: 'middle',
                originX: 'center',
                originY: 'center'
            });
            obj = new fabric.Group([circle, text], commonProps);
        } else if (type === 'ball') {
            const circle = new fabric.Circle({
                radius: 12,
                fill: '#f97316',
                stroke: '#000',
                strokeWidth: 1,
                originX: 'center',
                originY: 'center'
            });
            obj = new fabric.Group([circle], commonProps); // Wrap in group for consistent behavior
        } else if (type === 'cone') {
            const triangle = new fabric.Triangle({
                width: 24,
                height: 24,
                fill: '#f97316',
                stroke: '#fff',
                strokeWidth: 1,
                originX: 'center',
                originY: 'center'
            });
            obj = new fabric.Group([triangle], commonProps);
        }

        if (obj) {
            this.canvas.add(obj);
            this.canvas.setActiveObject(obj);
            this.canvas.requestRenderAll(); // Explicitly request display update
        }
    }

    toggleDrawingMode() {
        this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
        if (this.canvas.isDrawingMode) {
            this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
            this.canvas.freeDrawingBrush.width = 3;
            this.canvas.freeDrawingBrush.color = 'white';
        }
        return this.canvas.isDrawingMode;
    }
}
