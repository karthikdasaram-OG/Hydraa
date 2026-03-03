# 🎮 Meme Flappy Pro

A browser-based arcade game inspired by Flappy Bird with meme-style characters, background music, crash animations, and persistent high score tracking.

## 🚀 Quick Start

1. Open `index.html` in your browser
2. Click "Start Game"
3. Press SPACE or TAP to jump
4. Avoid the pipes!

## 📁 Project Structure

```
meme-flappy-pro/
├── index.html          # Main game page
├── css/
│   └── style.css      # Game styling
├── js/
│   └── game.js        # Game logic
└── assets/
    ├── audio/         # Add background.mp3 & crash.mp3
    └── images/        # Add character images & crash.gif
```

## 🎯 Features

- ✅ Smooth 60 FPS gameplay
- ✅ Gravity & jump physics
- ✅ Pipe obstacle system
- ✅ Score tracking
- ✅ localStorage best score
- ✅ Mobile & desktop support
- ⏳ Background music (add audio files)
- ⏳ Crash sound effects (add audio files)
- ⏳ Crash GIF animation (add GIF file)

## 🎨 Customization

### Add Audio
Place audio files in `assets/audio/`:
- `background.mp3` - Background music
- `crash.mp3` - Crash sound effect

Uncomment audio setup in `game.js`:
```javascript
bgMusic = new Audio('assets/audio/background.mp3');
crashSound = new Audio('assets/audio/crash.mp3');
```

### Add Crash GIF
Replace the emoji in `gameOver()` function:
```javascript
crashGif.innerHTML = '<img src="assets/images/crash.gif" alt="Crash">';
```

### Customize Character
Update `.player` and `.character-preview` styles in `style.css`

## 🎮 Controls

- **Desktop**: SPACEBAR to jump
- **Mobile**: TAP screen to jump

## 📊 Game Mechanics

- Gravity: 0.5 pixels/frame
- Jump strength: -10 pixels
- Pipe speed: 3 pixels/frame
- Pipe spawn: Every 2 seconds
- Gap size: 180 pixels

## 🔧 Todo

- [ ] Add actual audio files
- [ ] Add crash GIF animation
- [ ] Add character selection
- [ ] Implement difficulty progression
- [ ] Add social sharing
- [ ] Create online leaderboard

## 📱 Browser Support

- Chrome (Desktop & Mobile) ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## 📄 License

MIT License - Feel free to use and modify!
