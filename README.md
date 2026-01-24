# IsoBoard - Tactical Basketball Whiteboard

IsoBoard is a standalone, client-side tactical basketball whiteboard application designed specifically for basketball coaches. It provides an intuitive interface to visualize plays, positioning, and strategy through an interactive SVG canvas, helping coaches communicate tactics effectively with their teams.

## 🏀 For Coaches

IsoBoard is built with coaches in mind, offering:
- **Quick Play Design**: Create and visualize basketball plays in seconds
- **Touch-Friendly Interface**: Optimized for tablets and mobile devices for sideline use
- **Professional Quality**: Export high-resolution diagrams for playbooks and presentations
- **No Internet Required**: Works offline once loaded - perfect for gym environments
- **Simple & Intuitive**: Minimal learning curve, focus on coaching not technology

## 🚀 Features

- **Interactive SVG Canvas**: Full-court basketball diagram with real-time drawing capabilities
- **Standard Basketball Court**: High-quality court rendering with proper dimensions and markings
- **Tactical Elements**:
  - Offensive players (circles with numbers 1-5)
  - Defensive players (with defensive icon)
  - Basketball, cones, coach markers
  - Movement lines (solid, dashed, dribbling, screening)
  - Shooting arrows and handoff markers
  - Highlight areas with customizable shapes
- **Drawing Tools**: Free-hand drawing, curved paths, and multiple line types
- **Export & Share**:
  - **Save**: Download current board as PNG image
  - **Copy to Clipboard**: One-click copy of the board for pasting into documents
- **Professional UI**: Clean toolbar with intuitive icons and keyboard shortcuts

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript with jQuery
- **Styling**: CSS3 (Vanilla)
- **Graphics Library**: [Snap.svg](http://snapsvg.io/) for SVG manipulation
- **Canvas Export**: canvg for converting SVG to PNG
- **File Management**: FileSaver.js and JSZip for downloads
- **Architecture**: Standalone client-side application (no server required)

## � How to Use

### Toolbar Buttons

**Player Tools:**
- **O** - Add offensive player (numbered 1-5)
- **D** - Add defensive player (with defensive marker)
- **B** - Add basketball
- **N** - Add cone
- **C** - Add coach marker

**Drawing Tools:**
- **M** - Movement line (solid arrow)
- **P** - Passing line (dashed arrow)
- **R** - Dribbling line (wavy arrow)
- **S** - Screen line (solid with end bar)
- **T** - Shooting arrow
- **L** - Simple line (no arrow)
- **H** - Handoff marker
- **A** - Highlight area (ellipse)
- **W** - Add text box

**Actions:**
- **Pointer** - Select and move objects
- **X** - Delete selected object
- **Undo/Redo** - Navigate through drawing history
- **Clear** - Remove all tactical elements
- **Half Court** - Toggle half-court view
- **Save** - Download board as PNG image
- **Copy to Clipboard** - Copy image for pasting elsewhere

### Keyboard Shortcuts
Most tools have keyboard shortcuts shown in their tooltips (hover over buttons).

## 🌍 GitHub Pages Deployment

To host this project on GitHub Pages:

1. **Upload to GitHub**: Push all files to a repository (include `index.html`, `js/`, `images/`)
2. **Settings**: Go to the **Settings** tab
3. **Pages**: Select **Deploy from a branch**
4. **Branch**: Choose `main` and `/ (root)` folder
5. **Save**: Your site will be live at `https://<username>.github.io/<repo-name>/`
6. **HTTPS**: Ensure "Enforce HTTPS" is enabled (required for clipboard functionality)

## 💻 Local Development / Debugging

Since the application uses ES Modules and the Clipboard API, it requires an HTTP server to run locally (it will not work correctly if you just open `index.html` as a file).

### Option 1: Using Python (Recommended)
If you have Python installed, run this command in the project directory:

```bash
# Python 3
python3 -m http.server
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Using Node.js (npx)
If you have Node.js installed:

```bash
npx http-server -c-1 .
```

The `-c-1` flag disables caching, which is important for seeing your changes immediately.
Then open the URL shown in the terminal (usually [http://localhost:8080](http://localhost:8080)).

## � Project Structure

```
IsoBoard/
├── index.html                      # Main application file
├── images/
│   └── playground.jpg              # Basketball court background texture
├── js/
│   ├── jquery.js                   # jQuery library
│   ├── snap.svg.js                 # Snap.svg library
│   ├── canvg.js                    # SVG to Canvas converter
│   ├── rgbcolor.js                 # Color utilities
│   ├── StackBlur.js                # Blur effects
│   ├── pathseg.js                  # SVG path utilities
│   ├── jszip.js                    # ZIP file creation
│   ├── FileSaver.js                # File download utility
│   ├── graphics.js                 # Graphics utilities
│   ├── fibaGraphic.js              # Core graphic data structures
│   ├── fibaDrawingSvg.js           # SVG drawing implementation
│   ├── fibaDrawingCanvas.js        # Canvas export functionality
│   ├── fibaDrawingCurvedPath.js    # Curved path calculations
│   ├── fibaDrawingController.js    # Drawing controller logic
│   ├── fibaDrawingTool.js          # Tool management and UI
│   └── styles.css                  # Application styles
├── README.md                       # This file
├── LICENSE                         # MIT License
├── AI_CONTEXT.md                   # AI development guide
└── ARCHITECTURE.md                 # Architecture documentation
```

## 🔒 Security & Privacy

- **No Server Required**: Fully client-side application - no data sent to servers
- **No Analytics**: Google Analytics removed - your drawings stay private
- **Clipboard API**: Uses secure `navigator.clipboard` API (requires HTTPS or localhost)
- **Local Storage**: All work is session-based (not saved between page refreshes)

## � Bug Reports & Feature Requests

Found a bug or have a feature suggestion? We'd love to hear from you!

**Please report issues on GitHub:**
1. Go to the [Issues page](https://github.com/yourusername/IsoBoard/issues)
2. Click "New Issue"
3. Describe the problem or feature request with:
   - Steps to reproduce (for bugs)
   - Expected behavior
   - Screenshots if helpful
   - Browser and device information

Your feedback helps make IsoBoard better for the entire coaching community!

## �🔧 Technical Notes

- **SVG-based**: Uses Snap.svg for high-quality vector graphics
- **Export Quality**: PNG exports maintain full resolution and quality
- **Browser Compatibility**: Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- **Responsive**: Canvas maintains aspect ratio across different screen sizes

## 📄 License

This project is licensed under the **MIT License**.

**What this means:**
- ✅ Free to use for personal and commercial purposes
- ✅ Modify and distribute as you wish
- ✅ Use in your coaching business without restrictions
- ✅ No warranty - use at your own risk

See the [LICENSE](LICENSE) file for full details.

## 📚 Documentation

- **AI_CONTEXT.md**: Comprehensive guide for AI-assisted development
- **ARCHITECTURE.md**: Production roadmap and architecture decisions

---

**IsoBoard** - Professional basketball tactical drawing tool for coaches.
Created with 🏀 for the basketball coaching community.

**MIT Licensed** - Free to use, modify, and distribute.
