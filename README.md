# lunahooker

lunahooker is a web-based interface for the [LunaTranslator](https://github.com/HIllya51/LunaTranslator) hook service. It connects over WebSocket to stream text in real time and offers rich controls and metrics for session management.

**Hosted at:** [lunahooker.netlify.app](https://lunahooker.netlify.app)

**Disclaimer:** This project is not affiliated with or endorsed by the LunaTranslator developers.

## Features

- Real-time message streaming via the LunaTranslator WebSocket hook
- Session timer, total character count, and characters-per-hour metrics
- Inline and focus-mode editing of captured messages
- Focus mode for distraction-free reading
- Persistent, customizable settings (e.g., stats toggles, max lines, font sizes, focus options)

## Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm (or npm)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open http://localhost:5173 in your browser to use LunaWeb.

### Build

```bash
pnpm build
```

## Configuration & Settings

Click the **Settings** (gear) icon in the status bar to configure:

- Toggle display of timer, character count, and speed
- Reverse line order and limit displayed lines
- Adjust font sizes for normal and focus modes
- Enable or disable focus mode and in-focus editing
- Customize the WebSocket endpoint URL

All preferences are saved to `localStorage` automatically.

## License

This project is licensed under the MIT License.
