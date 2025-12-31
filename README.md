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

## 🔒 Security Note

The **Copy to Clipboard** feature uses the `navigator.clipboard` API, which requires a **Secure Context (HTTPS)**. It will work on `localhost` and `GitHub Pages`, but may fail if opened via `file://`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Created with ❤️ for Basketball Coaches.
