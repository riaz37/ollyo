# Canvas Home - Smart Device Control System

A modern, interactive smart home device control application built with Next.js, React, and TypeScript. Control and manage your smart devices with an intuitive drag-and-drop interface, customizable presets, and real-time visual feedback.

## ✨ Features

- **🎯 Drag & Drop Interface** - Easily add devices to your canvas by dragging from the sidebar
- **💡 Smart Device Controls** - Control Light and Fan devices with intuitive controls
- **🎨 Visual Feedback** - Real-time visual effects including light glow and fan animations
- **💾 Preset Management** - Save and load device configurations as presets
- **🔄 State Persistence** - Your settings and presets are automatically saved
- **📱 Responsive Design** - Modern, clean UI built with Tailwind CSS
- **⚡ Type-Safe** - Full TypeScript support with organized type definitions
- **🧩 Reusable Architecture** - Modular, extensible codebase for easy device additions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ollyo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
app/
├── components/
│   ├── devices/          # Device components (Light, Fan, BaseDevice)
│   ├── layout/           # Layout components (Canvas, Sidebar)
│   └── ui/               # Reusable UI components
├── config/              # Device configuration and registry
├── hooks/               # Custom React hooks
├── types/                # TypeScript type definitions
├── store.ts             # Zustand state management
└── globals.css          # Global styles and CSS variables
```

## 🏗️ Architecture

### Component Organization

- **Device Components**: Modular device implementations using a base `BaseDevice` component
- **UI Components**: Reusable, type-safe UI components (Button, Modal, Slider, etc.)
- **Layout Components**: Main application layout (Canvas for device display, Sidebar for device selection)

### State Management

- **Zustand**: Lightweight state management with persistence
- **Device Settings**: Separate state for each device type (Light, Fan)
- **Presets**: Save and restore device configurations

### Type System

All TypeScript types are organized in dedicated files:
- `types/store.types.ts` - Store and data types
- `types/device.types.ts` - Device-related types
- `types/ui.types.ts` - UI component prop types
- `types/hooks.types.ts` - Custom hook option types

### Device Registry

The application uses a device registry system that makes adding new devices simple:
1. Create the device component
2. Add it to the registry
3. The UI automatically updates

## 🎮 Usage

### Adding a Device

1. Drag a device (Light or Fan) from the sidebar onto the canvas
2. The device will appear with its controls

### Controlling Devices

**Light Device:**
- Toggle power on/off
- Adjust brightness (0-100%)
- Select color temperature (Warm, Cool, Blue, Pink)

**Fan Device:**
- Toggle power on/off
- Adjust speed (0-100%)

### Saving Presets

1. Configure your device settings
2. Click "Save Preset" button
3. Enter a name for your preset
4. Access saved presets from the sidebar

### Loading Presets

1. Click on any saved preset in the sidebar
2. The device and its settings will be restored

### Clearing Canvas

Click the "Clear" button to remove the current device and reset to defaults.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: Custom SVG icons

## 📦 Key Dependencies

```json
{
  "next": "16.0.1",
  "react": "19.2.0",
  "zustand": "^5.0.8",
  "tailwindcss": "^4"
}
```

## 🎨 Customization

### Adding a New Device

1. Create a new device component in `app/components/devices/`
2. Use the `BaseDevice` component for consistent structure
3. Add the device to `app/config/deviceRegistry.tsx`
4. Add device settings type to `app/types/store.types.ts`
5. Update the store to handle the new device type

Example:
```typescript
// app/components/devices/NewDevice.tsx
export default function NewDevice() {
  // Your device implementation
  return (
    <BaseDevice
      power={power}
      onPowerToggle={handleToggle}
      visual={<YourVisual />}
      controls={<YourControls />}
    />
  );
}
```

### Styling

The project uses CSS variables defined in `app/globals.css` for theming. Modify these variables to customize colors and design tokens.

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Organization

- **Imports**: All imports use the `@/app/` alias for better maintainability
- **Types**: Centralized in `app/types/` directory
- **Hooks**: Reusable custom hooks in `app/hooks/`
- **Components**: Organized by feature and purpose

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the project maintainers.

---

Built with ❤️ using Next.js and React
