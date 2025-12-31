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
        document.querySelectorAll('.tool-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('tool-type', item.dataset.type);
                e.dataTransfer.setData('tool-label', item.dataset.label || item.textContent);
            });
        });

        const canvasEl = document.getElementById('main-canvas').parentElement;
        canvasEl.addEventListener('dragover', (e) => e.preventDefault());
        canvasEl.addEventListener('drop', (e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('tool-type');
            const label = e.dataTransfer.getData('tool-label');

            const pointer = this.canvas.getPointer(e);
            this.addObjectToCanvas(type, label, pointer.x, pointer.y);
        });
    }

    addObjectToCanvas(type, label, x, y) {
        let obj;
        const commonProps = {
            left: x,
            top: y,
            originX: 'center',
            originY: 'center',
            hasControls: false,
            hasBorders: false
        };

        if (type === 'attacker' || type === 'defender') {
            const color = type === 'attacker' ? '#ef4444' : '#3b82f6';
            const circle = new fabric.Circle({
                radius: 20,
                fill: color,
                stroke: 'white',
                strokeWidth: 2,
                shadow: '0 4px 6px rgba(0,0,0,0.3)'
            });
            const text = new fabric.Text(label, {
                fontSize: 18,
                fill: 'white',
                fontWeight: 'bold',
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
                ...commonProps
            });
            obj = circle;
        } else if (type === 'cone') {
            const triangle = new fabric.Triangle({
                width: 24,
                height: 24,
                fill: '#f97316',
                stroke: '#fff',
                strokeWidth: 1,
                ...commonProps
            });
            obj = triangle;
        }

        if (obj) {
            this.canvas.add(obj);
            this.canvas.setActiveObject(obj);
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
