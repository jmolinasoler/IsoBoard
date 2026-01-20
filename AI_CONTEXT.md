# IsoBoard - AI Development Context & Instructions

This document provides comprehensive guidance for AI coding agents working on the IsoBoard project.

## Project Vision
A modular, vanilla JS tactical basketball whiteboard using Fabric.js, optimized for maintainability, premium UI/UX, and future scalability to production-ready multi-user platform.

## Current Architecture Status

### Technology Stack
- **Language**: Vanilla JavaScript (ES6 Modules) - *Migration to TypeScript planned*
- **Canvas Library**: Fabric.js 5.3.1 (CDN-loaded)
- **Styling**: Vanilla CSS3 with CSS Variables
- **Build System**: None (planned: Vite + TypeScript)
- **Testing**: None (planned: Vitest + Playwright)
- **Deployment**: Static hosting (GitHub Pages)

### File Structure

```text
IsoBoard/
├── index.html              # UI Shell (Sidebar + Canvas Container)
├── styles.css              # Premium Dark Theme & Glassmorphism
├── js/
│   ├── app.js              # Entry Point: UI wiring and Manager orchestration
│   ├── canvas.js           # CanvasManager: Fabric.js init + Court drawing
│   ├── tools.js            # ToolManager: Drag & Drop + Tactical elements
│   └── actions.js          # ActionManager: Clipboard, Export, Reset
├── README.md               # User-facing documentation
├── ARCHITECTURE.md         # Production readiness proposal (READ THIS FIRST)
├── AI_CONTEXT.md           # This file
└── LICENSE                 # MIT License
```

## Component Architecture

### 1. CanvasManager (`js/canvas.js`)
**Responsibility**: Canvas initialization and court rendering

**Key Methods**:
- `constructor(canvasId)` - Initializes Fabric.js canvas with white background
- `drawCourt()` - Renders basketball court using Fabric primitives (Rect, Circle, Line, Path)
- `getCanvas()` - Returns Fabric canvas instance
- `clearNonCourt()` - Removes all tactical objects while preserving court lines

**Implementation Details**:
- Canvas dimensions: 800x600px (fixed)
- Court elements stored in `this.courtObjects` array
- All court elements are `selectable: false, evented: false`
- Court objects always sent to back via `sendToBack()`

**Critical Notes**:
- Court objects must NEVER be deleted
- Always call `renderAll()` after modifications
- Court coordinates are hardcoded for 800x600 canvas

### 2. ToolManager (`js/tools.js`)
**Responsibility**: Sidebar tools and drag-and-drop functionality

**Key Methods**:
- `setupSidebarTools()` - Dynamically creates attacker (1-5) and defender (A-E) buttons
- `setupDragAndDrop()` - Implements HTML5 Drag and Drop API
- `addObjectToCanvas(type, label, x, y)` - Factory method for creating Fabric objects
- `toggleDrawingMode()` - Enables/disables free-hand drawing

**Object Types**:
- `attacker`: Red circle (#ef4444) with white number (1-5)
- `defender`: Blue circle (#3b82f6) with white letter (A-E)
- `ball`: Orange circle (#f97316), radius 12px
- `cone`: Orange triangle (#f97316)

**Implementation Details**:
- All tactical objects are Fabric Groups (for consistent behavior)
- Objects have custom controls (borderColor: #2563eb, cornerSize: 8)
- Uses `getPointer(e)` to map DOM events to canvas coordinates
- Drawing mode uses PencilBrush (width: 3, color: white)

**Critical Notes**:
- ALWAYS wrap objects in Groups (even single shapes) for consistency
- MUST call `requestRenderAll()` after adding objects
- originX and originY must be 'center' for proper positioning

### 3. ActionManager (`js/actions.js`)
**Responsibility**: User actions (export, reset, clipboard)

**Key Methods**:
- `exportAsPNG()` - Downloads canvas as PNG file
- `resetBoard()` - Clears all non-court objects
- `copyToClipboard()` - Copies canvas image to system clipboard

**Implementation Details**:
- PNG export uses `canvas.toDataURL({ format: 'png', quality: 1 })`
- Clipboard uses modern Clipboard API: `navigator.clipboard.write([new ClipboardItem()])`
- Requires HTTPS or localhost (Secure Context requirement)

**Critical Notes**:
- Clipboard API may fail on HTTP (show error with guidance)
- toBlob() is async - must use Promise wrapper
- Always show user feedback (alerts/toasts) for actions

### 4. App Entry Point (`js/app.js`)
**Responsibility**: Initialization and event wiring

**Initialization Order** (CRITICAL):
1. Wait for `DOMContentLoaded`
2. Initialize CanvasManager
3. Initialize ToolManager (passes canvas instance)
4. Initialize ActionManager (passes CanvasManager)
5. Wire up UI event listeners

**Event Listeners**:
- Draw toggle button (toggles active class)
- Reset button (confirmation dialog required)
- Export button (downloads PNG)
- Clipboard button (copies to clipboard)

## Coding Conventions & Standards

### JavaScript Style
```javascript
// ✅ DO: Use ES6 modules
import { CanvasManager } from './canvas.js';
export class ToolManager { }

// ✅ DO: Use const/let (never var)
const canvas = new fabric.Canvas('id');
let isDrawing = false;

// ✅ DO: Use arrow functions for callbacks
button.addEventListener('click', () => { });

// ❌ DON'T: Use function declarations for classes
function ToolManager() { } // Wrong

// ✅ DO: Use classes for managers
class ToolManager { }
```

### Naming Conventions
- **Classes**: PascalCase (`CanvasManager`)
- **Instances**: camelCase with 'Mgr' suffix (`canvasMgr`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **DOM IDs**: kebab-case (`btn-export`, `tool-ball`)
- **CSS classes**: kebab-case (`tool-item`, `btn-primary`)

### CSS Conventions
```css
/* ✅ DO: Use CSS variables from :root */
background-color: var(--accent-primary);

/* ✅ DO: Follow BEM-like naming */
.tool-item { }
.tool-item.attacker { }

/* ❌ DON'T: Use inline styles in JS (use classes) */
element.style.color = 'red'; // Wrong
element.classList.add('active'); // Correct
```

### Error Handling
```javascript
// ✅ DO: Always catch async errors
async copyToClipboard() {
  try {
    await navigator.clipboard.write([item]);
    alert('Success!');
  } catch (err) {
    console.error('Failed:', err);
    alert('Failed with helpful message');
  }
}

// ✅ DO: Validate inputs
addObjectToCanvas(type, label, x, y) {
  if (!type || typeof x !== 'number') {
    throw new Error('Invalid arguments');
  }
  // ...
}
```

## Development Guidelines for AI Agents

### When Making Changes

#### 1. **Before Writing Code**
- [ ] Read ARCHITECTURE.md to understand production goals
- [ ] Identify which manager(s) are affected
- [ ] Check if change requires HTML/CSS updates
- [ ] Consider backward compatibility

#### 2. **Code Modification Rules**
- **MINIMIZE CHANGES**: Only modify what's necessary
- **PRESERVE EXISTING BEHAVIOR**: Don't break working features
- **MAINTAIN SEPARATION**: Keep managers independent
- **TEST MANUALLY**: No automated tests exist yet

#### 3. **Common Tasks & How to Handle**

##### Adding a New Tool
```javascript
// 1. Add HTML in index.html (if not dynamic)
<div class="tool-item X" id="tool-X">Icon</div>

// 2. Update ToolManager.setupDragAndDrop() to include new element

// 3. Add factory logic in addObjectToCanvas()
if (type === 'X') {
  obj = new fabric.Group([...], commonProps);
}

// 4. Update CSS with color scheme
.tool-item.X { background-color: var(--new-color); }
```

##### Adding a New Action
```javascript
// 1. Add button in index.html
<button id="btn-newaction" class="btn primary">Action</button>

// 2. Create method in ActionManager
newAction() {
  // Implementation
}

// 3. Wire in app.js
btnNewAction.addEventListener('click', () => {
  actionMgr.newAction();
});
```

##### Modifying Canvas Behavior
```javascript
// ⚠️ WARNING: Canvas modifications are sensitive!

// ✅ DO: Preserve court objects
const courtObjectIds = this.courtObjects.map(o => o.id);

// ✅ DO: Always render after changes
this.canvas.renderAll();

// ❌ DON'T: Modify canvas dimensions without updating court logic
// ❌ DON'T: Delete court objects
// ❌ DON'T: Change global Fabric.js settings
```

### Security Considerations

#### CDN Dependency
```html
<!-- ⚠️ CURRENT: No integrity check -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js"></script>

<!-- ✅ FUTURE: Add SRI hash -->
<script src="..." integrity="sha512-HASH" crossorigin="anonymous"></script>
```

#### Input Validation (Future)
```javascript
// When adding user input (not currently used):
function sanitizeInput(input) {
  return input.replace(/[<>]/g, ''); // Basic XSS prevention
}
```

#### Content Security Policy (Future)
```html
<!-- Add to index.html <head> -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
">
```

### Performance Considerations

#### Canvas Performance
- **Limit**: Fabric.js handles ~1000 objects before noticeable lag
- **Optimization**: Group static objects together
- **Avoid**: Excessive `renderAll()` calls (use `requestRenderAll()`)

```javascript
// ❌ BAD: Multiple renders
for (let i = 0; i < 10; i++) {
  canvas.add(obj);
  canvas.renderAll(); // 10 renders!
}

// ✅ GOOD: Single render
for (let i = 0; i < 10; i++) {
  canvas.add(obj);
}
canvas.renderAll(); // 1 render
```

### Testing Guidelines (When Tests Exist)

```javascript
// Example test structure (future)
describe('ToolManager', () => {
  it('should add attacker to canvas', () => {
    const canvas = createMockCanvas();
    const manager = new ToolManager(canvas);
    
    manager.addObjectToCanvas('attacker', '1', 100, 100);
    
    expect(canvas.getObjects()).toHaveLength(1);
    expect(canvas.getObjects()[0].type).toBe('group');
  });
});
```

## Common Pitfalls & Solutions

### Pitfall 1: Canvas Not Rendering
```javascript
// ❌ PROBLEM: Objects added but not visible
canvas.add(obj);

// ✅ SOLUTION: Call renderAll()
canvas.add(obj);
canvas.renderAll();

// ✅ BETTER: Use requestRenderAll() for performance
canvas.add(obj);
canvas.requestRenderAll();
```

### Pitfall 2: Drag-and-Drop Not Working
```javascript
// ❌ PROBLEM: Listening on canvas element
canvas.addEventListener('drop', handler);

// ✅ SOLUTION: Listen on wrapper div
document.querySelector('.canvas-container').addEventListener('drop', handler);
```

### Pitfall 3: Objects Not Draggable
```javascript
// ❌ PROBLEM: Forgot to set origin
const obj = new fabric.Circle({ left: 100, top: 100 });

// ✅ SOLUTION: Always set originX/Y to 'center'
const obj = new fabric.Circle({
  left: 100,
  top: 100,
  originX: 'center',
  originY: 'center'
});
```

### Pitfall 4: Court Objects Getting Deleted
```javascript
// ❌ PROBLEM: Clearing entire canvas
canvas.clear();

// ✅ SOLUTION: Use clearNonCourt()
canvasManager.clearNonCourt();
```

## Migration Path to Production

### Phase 1: TypeScript Migration (Recommended First Step)
```typescript
// Convert js/canvas.js to ts/CanvasManager.ts
export class CanvasManager {
  private canvas: fabric.Canvas;
  private courtObjects: fabric.Object[] = [];

  constructor(canvasId: string) {
    this.canvas = new fabric.Canvas(canvasId, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
    });
    this.drawCourt();
  }

  // ...
}
```

### Phase 2: State Management
```typescript
// Centralized state store
interface BoardState {
  objects: fabric.Object[];
  history: BoardState[];
  historyIndex: number;
  isDrawingMode: boolean;
}

class BoardStore {
  private state: BoardState;
  private listeners: Map<string, Function[]>;
  
  dispatch(action: Action) { }
  subscribe(key: string, callback: Function) { }
}
```

### Phase 3: Testing Infrastructure
```bash
npm install -D vitest @testing-library/dom
npm install -D @vitest/ui @vitest/coverage-v8
```

## Integration Notes

### Fabric.js Specifics
- **Global Variable**: `fabric` is globally available from CDN
- **Canvas Initialization**: Must happen after DOM ready
- **Coordinate System**: (0,0) is top-left, positive Y is down
- **Groups**: Use for compound objects (circle + text)
- **Selection**: Automatic with default controls
- **Serialization**: Use `canvas.toJSON()` for state saving (future)

### Browser Compatibility
- **Clipboard API**: Chrome 76+, Firefox 127+, Safari 13.1+
- **ES Modules**: Chrome 61+, Firefox 60+, Safari 11+
- **Fabric.js**: All modern browsers + IE11 (with polyfills)

### Required Polyfills (Future)
```javascript
// For older browsers
if (!window.ClipboardItem) {
  // Fallback to execCommand('copy')
}
```

## Quick Reference Commands

### Local Development
```bash
# Serve locally (requires HTTP server)
python3 -m http.server 8000
# OR
npx http-server -c-1

# Open browser
open http://localhost:8000
```

### Future Build Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Open test UI
npm run lint         # Lint code
npm run type-check   # TypeScript checks
```

## Resources

### Documentation
- [Fabric.js Docs](http://fabricjs.com/docs/)
- [Fabric.js Demos](http://fabricjs.com/demos/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

### Code Examples
```javascript
// Save board state (future feature)
const json = canvas.toJSON();
localStorage.setItem('board', JSON.stringify(json));

// Load board state
const json = JSON.parse(localStorage.getItem('board'));
canvas.loadFromJSON(json, () => {
  canvas.renderAll();
});

// Undo functionality (requires history tracking)
canvas.undo = function() {
  if (this._objects.length > 0) {
    this._objects.pop();
    this.renderAll();
  }
}
```

## Contact & Support

### For AI Agents
- **Primary Reference**: ARCHITECTURE.md for production roadmap
- **Code Questions**: Reference this file + inline comments
- **Breaking Changes**: Always document in commit messages
- **New Features**: Update both README.md and this file

### For Human Developers
- **Questions**: Create GitHub Issue
- **Bugs**: Include browser version + console errors
- **Features**: Discuss in Discussions tab first

## Change Log

### 2026-01-20
- Created comprehensive AI_CONTEXT.md
- Added ARCHITECTURE.md with production roadmap
- Documented all current components and conventions
- Added security assessment and migration guidelines

---

**Last Updated**: 2026-01-20  
**Version**: 1.0.0  
**Status**: MVP (Production roadmap defined)
