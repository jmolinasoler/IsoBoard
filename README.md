# IsoBoard - Tactical Basketball Whiteboard

IsoBoard is a premium, web-based tactical basketball whiteboard. It allows coaches and players to visualize plays, positioning, and strategy through an interactive canvas.

![IsoBoard Preview](https://via.placeholder.com/800x600?text=IsoBoard+Tactical+Whiteboard)

## 🚀 Features

- **Interactive Canvas**: 800x600px Fabric.js powered board.
- **Programmatic Court**: Standard basketball court background drawn with high-fidelity primitives.
- **Tactical Icons**: Draggable attackers (1-5), defenders (A-E), ball, and cones.
- **Drawing Mode**: Toggle free-hand drawing for tactical paths and movement lines.
- **Export & Share**:
    - Download as `.png`.
    - **Copy to Clipboard**: One-click copy of the board as an image blob.
- **Premium Design**: Dark-mode UI with glassmorphic sidebar and modern typography.

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES Modules)
- **Styling**: CSS3 (Vanilla)
- **Canvas Library**: [Fabric.js](http://fabricjs.com/) (loaded via CDN)
- **Architecture**: Modular "Manager" pattern (Canvas, Tools, Actions).

## 🌍 GitHub Pages Deployment

To host this project on GitHub Pages:

1. **Upload to GitHub**: Push all files (`index.html`, `styles.css`, `js/`, etc.) to a new repository.
2. **Settings**: Go to the **Settings** tab of your repository.
3. **Pages**: In the sidebar, click on **Pages**.
4. **Build and Deployment**: 
    - Source: **Deploy from a branch**.
    - Branch: Select `main` (or your primary branch) and the folder `/ (root)`.
5. **Save**: Click Save.
6. **HTTPS**: Ensure "Enforce HTTPS" is checked (required for the Clipboard API).

Your IsoBoard will be live at `https://<your-username>.github.io/<repo-name>/`.

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

## 🔒 Security Note

The **Copy to Clipboard** feature uses the `navigator.clipboard` API, which requires a **Secure Context (HTTPS)**. It will work on `localhost` and `GitHub Pages`, but may fail if opened via `file://`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Created with ❤️ for Basketball Coaches.
