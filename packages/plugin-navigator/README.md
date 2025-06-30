# Navigator Plugin

A lightweight and customizable navigation plugin for DDE Earth, providing compass and zoom controls with full theme support.

## Features

- **🧭 Compass Navigation**: Interactive compass for camera rotation and orbit
- **🔍 Zoom Controls**: Zoom in/out and home reset buttons
- **🎨 Theme System**: Full theme customization with light/dark presets
- **🔧 Lightweight**: No external dependencies, CSS-in-JS based styling
- **⚡ Independent**: Self-contained plugin with no global style dependencies

## Installation

```bash
npm install @dde-earth/plugin-navigator
```

## Basic Usage

```typescript
import { Navigator } from "@dde-earth/plugin-navigator";
import { Earth } from "dde-earth";

const earth = new Earth(viewer);

// Method 1: Initialize with default settings
const navigator = new Navigator();
earth.use(navigator);

// Method 2: Constructor options (recommended)
const navigator = new Navigator({
  theme: "dark",
  compass: {
    tips: {
      outer: "Drag to rotate view",
      inner: "Drag for free orbit",
    },
  },
});
earth.use(navigator);

// Method 3: Init-time options
const navigator = new Navigator();
earth.use(navigator, {
  theme: "light",
  zoomControl: {
    tips: {
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      refresh: "Reset View",
    },
  },
});
```

## Configuration Options

The Navigator plugin supports two ways to configure options, following the standard DDE Earth plugin pattern:

### 1. Constructor Configuration (Recommended)

Pass options when creating the Navigator instance:

```typescript
const navigator = new Navigator({
  theme: "dark",
  compass: {
    container: document.getElementById("compass-container"),
    tips: {
      outer: "Custom outer tip",
      inner: "Custom inner tip",
    },
  },
  zoomControl: {
    tips: {
      zoomIn: "放大",
      zoomOut: "缩小",
      refresh: "重置视图",
    },
  },
});

earth.use(navigator);
```

### 2. Init-time Configuration

Pass options when using the plugin with Earth:

```typescript
const navigator = new Navigator();

earth.use(navigator, {
  theme: "light",
  compass: {
    tips: {
      outer: "Drag to rotate view",
      inner: "Drag for free orbit",
    },
  },
});
```

### Option Priority

When both constructor and init-time options are provided, **init-time options take precedence**:

```typescript
const navigator = new Navigator({
  theme: "dark", // This will be overridden
  compass: {
    tips: { outer: "Constructor tip" },
  },
});

earth.use(navigator, {
  theme: "light", // This takes precedence -> final theme is "light"
  compass: {
    tips: { inner: "Init tip" }, // This merges with constructor options
  },
});
```

## Theme Configuration

### Using Built-in Themes

```typescript
// Constructor approach (recommended)
const navigator = new Navigator({
  theme: "light", // or "dark"
});
earth.use(navigator);

// Init-time approach
const navigator = new Navigator();
earth.use(navigator, {
  theme: "dark",
});
```

### Custom Theme Configuration

```typescript
import { lightTheme } from "@dde-earth/plugin-navigator";

const customTheme = {
  ...lightTheme,
  compass: {
    ...lightTheme.compass,
    size: 100, // Larger compass
    outerRing: {
      ...lightTheme.compass.outerRing,
      background: "#2563eb", // Blue background
    },
  },
  zoomController: {
    ...lightTheme.zoomController,
    background: "#1f2937", // Dark background
    button: {
      ...lightTheme.zoomController.button,
      activeColor: "#f59e0b", // Orange active color
    },
  },
};

// Constructor approach (recommended)
const navigator = new Navigator({
  theme: customTheme,
});
earth.use(navigator);

// Init-time approach
const navigator = new Navigator();
earth.use(navigator, {
  theme: customTheme,
});
```

### Runtime Theme Management

```typescript
// Change theme after initialization
navigator.setTheme("dark");

// Update specific theme properties
navigator.updateTheme({
  compass: {
    size: 120,
    outerRing: {
      background: "#10b981",
    },
  },
});

// Get current theme
const currentTheme = navigator.getTheme();
```

### Global Theme Management

```typescript
import { themeManager } from "@dde-earth/plugin-navigator";

// Set global theme (affects all navigator instances)
themeManager.setTheme("dark");

// Listen to theme changes
const unsubscribe = themeManager.onThemeChange((theme) => {
  console.log("Theme changed:", theme);
});

// Update global theme
themeManager.updateTheme({
  transition: {
    all: "all 300ms ease",
  },
});

// Clean up listener
unsubscribe();
```

## Advanced Configuration

### Individual Component Themes

```typescript
// Constructor approach (recommended)
const navigator = new Navigator({
  // Global navigator theme
  theme: "light",
  compass: {
    // Compass-specific theme override
    theme: "dark",
    tips: {
      outer: "Drag to rotate view",
      inner: "Drag for free orbit",
    },
  },
});
earth.use(navigator);

// Init-time approach
const navigator = new Navigator();
earth.use(navigator, {
  theme: "light",
  compass: {
    theme: "dark",
    tips: {
      outer: "Drag to rotate view",
      inner: "Drag for free orbit",
    },
  },
});
```

### Custom Positioning

```typescript
const customTheme = {
  ...lightTheme,
  position: {
    bottom: "20px",
    compassRight: "20px",
    zoomControllerRight: "120px",
    onRightPanel: {
      compassRight: "340px",
      zoomControllerRight: "440px",
    },
  },
};
```

### Component Options

```typescript
// Constructor approach (recommended)
const navigator = new Navigator({
  compass: {
    container: document.getElementById("compass-container"),
    tips: {
      outer: "Custom outer tip",
      inner: "Custom inner tip",
    },
  },
  zoomControl: {
    container: document.getElementById("zoom-container"),
    tips: {
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      refresh: "Reset View",
    },
  },
});
earth.use(navigator);

// Init-time approach
const navigator = new Navigator();
earth.use(navigator, {
  compass: {
    container: document.getElementById("compass-container"),
    tips: {
      outer: "Custom outer tip",
      inner: "Custom inner tip",
    },
  },
  zoomControl: {
    container: document.getElementById("zoom-container"),
    tips: {
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      refresh: "Reset View",
    },
  },
});
```

## Theme Interface

```typescript
interface NavigatorTheme {
  compass: {
    size: number;
    outerRing: {
      background: string;
      fill: string;
      fillOpacity: number;
      hoverScale: number;
    };
    innerGyro: {
      background: string;
      activeColor: string;
      hoverColor: string;
    };
    rotationMarker: {
      background: string;
      hoverScale: number;
    };
  };
  zoomController: {
    background: string;
    borderRadius: string;
    padding: string;
    gap: string;
    button: {
      background: string;
      hoverBackground: string;
      activeBackground: string;
      color: string;
      activeColor: string;
      fontSize: string;
    };
  };
  position: {
    bottom: string;
    compassRight: string;
    zoomControllerRight: string;
    onRightPanel: {
      compassRight: string;
      zoomControllerRight: string;
    };
  };
  transition: {
    all: string;
    transform: string;
  };
}
```

## Best Practices

1. **Prefer Constructor Configuration**: Use constructor options for most use cases as it follows the standard DDE Earth plugin pattern
2. **Use Built-in Themes**: Start with `'light'` or `'dark'` themes and customize as needed
3. **Minimal Customization**: Only override specific properties you want to change
4. **Global vs Local**: Use `themeManager` for app-wide themes, component options for instance-specific themes
5. **Option Priority**: Remember that init-time options override constructor options - use this for dynamic configuration
6. **Performance**: Theme changes are optimized and don't cause layout reflows
7. **Cleanup**: Always call `destroy()` to properly clean up resources

## Migration from SCSS

If you were previously using SCSS styles, the new system provides equivalent functionality:

```typescript
// Old SCSS approach (deprecated)
// @import "plugin-navigator/styles";

// New CSS-in-JS approach (recommended)
import { Navigator, darkTheme } from "@dde-earth/plugin-navigator";

const navigator = new Navigator({ theme: darkTheme });
earth.use(navigator);

// Alternative approach
const navigator = new Navigator();
earth.use(navigator, { theme: darkTheme });
```

## License

MIT
