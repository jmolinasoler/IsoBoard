export class ActionManager {
    constructor(canvasManager) {
        this.canvasManager = canvasManager;
        this.canvas = canvasManager.getCanvas();
    }

    exportAsPNG() {
        const dataURL = this.canvas.toDataURL({
            format: 'png',
            quality: 1
        });
        const link = document.createElement('a');
        link.download = 'isoboard-tactics.png';
        link.href = dataURL;
        link.click();
    }

    resetBoard() {
        this.canvasManager.clearNonCourt();
        this.canvas.renderAll();
    }

    async copyToClipboard() {
        try {
            // Get blob from canvas
            const blob = await new Promise(resolve => {
                this.canvas.getElement().toBlob(resolve, 'image/png');
            });

            if (!blob) {
                throw new Error('Failed to create blob from canvas');
            }

            // Write to clipboard
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);

            console.log('Canvas copied to clipboard successfully!');
            alert('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            alert('Failed to copy to clipboard. Ensure you are using HTTPS or localhost.');
        }
    }
}
