import { CanvasManager } from './canvas.js';
import { ToolManager } from './tools.js';
import { ActionManager } from './actions.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Managers
    const canvasMgr = new CanvasManager('main-canvas');
    
    // Configure Extras BEFORE creating ToolManager so they get event listeners
    const ballTool = document.getElementById('tool-ball');
    const coneTool = document.getElementById('tool-cone');

    [ballTool, coneTool].forEach(tool => {
        tool.draggable = true;
        tool.dataset.type = tool.id.replace('tool-', '');
        // Ensure they have the tool-item class for drag and drop
        tool.classList.add('tool-item');
    });
    
    // Now create ToolManager (it will pick up all .tool-item elements including extras)
    const toolMgr = new ToolManager(canvasMgr.getCanvas(), 'attackers-tools', 'defenders-tools');
    const actionMgr = new ActionManager(canvasMgr);

    // Event Listeners for UI Buttons
    const btnDraw = document.getElementById('btn-draw');
    btnDraw.addEventListener('click', () => {
        const isActive = toolMgr.toggleDrawingMode();
        btnDraw.classList.toggle('active', isActive);
        btnDraw.textContent = isActive ? 'Exit Drawing' : 'Toggle Drawing';
    });

    const btnReset = document.getElementById('btn-reset');
    btnReset.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the board?')) {
            actionMgr.resetBoard();
        }
    });

    const btnExport = document.getElementById('btn-export');
    btnExport.addEventListener('click', () => {
        actionMgr.exportAsPNG();
    });

    const btnClipboard = document.getElementById('btn-clipboard');
    btnClipboard.addEventListener('click', () => {
        actionMgr.copyToClipboard();
    });

    console.log('IsoBoard initialized successfully.');
});
