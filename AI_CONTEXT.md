# IsoBoard - AI Project Context

This document provides a summary of the IsoBoard project architecture and logic for AI coding agents.

## Project Vision
A modular, vanilla JS tactical whiteboard using Fabric.js, optimized for maintainability and premium UI/UX.

## File Structure

```text
IsoBoard/
├── index.html          # UI Shell (Sidebar + Canvas Container)
├── styles.css          # Premium Dark Theme & Glassmorphism
├── js/
│   ├── app.js          # Entry Point: Entry point, UI wiring, and Manager orchestration.
│   ├── canvas.js       # CanvasManager: Fabric.js init + Programmatic court drawing.
│   ├── tools.js        # ToolManager: Sidebar Drag & Drop + Tactical element logic.
│   └── actions.js      # ActionManager: Clipboard, Export, and Reset logic.
└── README.md           # User Documentation
```

## Key Components

### 1. CanvasManager (`js/canvas.js`)
- Initializes `fabric.Canvas` with white background (`#ffffff`).
- `drawCourt()`: Uses `Rect`, `Circle`, `Line`, and `Path` to render a schematic basketball court with black lines.
- `clearNonCourt()`: Removes tactical elements while preserving the court background.

### 2. ToolManager (`js/tools.js`)
- Populates sidebar with Attackers (1-5) and Defenders (A-E).
- Implements Native Drag & Drop mapped to Fabric.js coordinate space via `getPointer()` and event wrapper handling.
- `addObjectToCanvas()`: Factory for creating Fabric Groups (circles + labels). Includes `requestRenderAll()` to ensure immediate visibility.
- Manages `isDrawingMode` for freehand tactics.

### 3. ActionManager (`js/actions.js`)
- `exportAsPNG()`: Triggers browser download of canvas data.
- `copyToClipboard()`: **CRITICAL LOGIC**. Converts canvas to `Blob` using `toBlob()` and writes to clipboard using `navigator.clipboard.write([new ClipboardItem(...)])`. Requires HTTPS.

## coding conventions
- **Vanilla JS**: No frameworks.
- **ES Modules**: Explicit imports/exports.
- **Separation of Concerns**: Logic divided into Managers.
- **CSS Variables**: Centralized design tokens in `:root`.

## Integration Notes
- Fabric.js is global (from CDN).
- Canvas dimensions are fixed at 800x600px.
- Icons use standard Fabric groups and basic shapes for performance.
