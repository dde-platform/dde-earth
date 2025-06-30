// Theme configuration for navigator plugin
export interface NavigatorTheme {
  // Compass styles
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
  // Zoom controller styles
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
  // Position and layout
  position: {
    bottom: string;
    compassRight: string;
    zoomControllerRight: string;
    // When right panel is open
    onRightPanel: {
      compassRight: string;
      zoomControllerRight: string;
    };
  };
  // Transitions
  transition: {
    all: string;
    transform: string;
  };
}

// Light theme (default)
export const lightTheme: NavigatorTheme = {
  compass: {
    size: 80,
    outerRing: {
      background: "rgba(255, 255, 255, 0.8)",
      fill: "#6b7280",
      fillOpacity: 0.8,
      hoverScale: 1.17,
    },
    innerGyro: {
      background: "transparent",
      activeColor: "oklch(0.646 0.222 41.116)",
      hoverColor: "oklch(0.646 0.222 41.116)",
    },
    rotationMarker: {
      background: "transparent",
      hoverScale: 1.17,
    },
  },
  zoomController: {
    background: "transparent",
    borderRadius: "4px",
    padding: "0",
    gap: "8px",
    button: {
      background: "rgba(255, 255, 255, 0.8)",
      hoverBackground: "oklch(0.646 0.222 41.116 / 0.8)",
      activeBackground: "oklch(0.646 0.222 41.116)",
      color: "#1f2937",
      activeColor: "#ffffff",
      fontSize: "20px",
    },
  },
  position: {
    bottom: "14px",
    compassRight: "14px",
    zoomControllerRight: "104px",
    onRightPanel: {
      compassRight: "314px",
      zoomControllerRight: "404px",
    },
  },
  transition: {
    all: "all 75ms ease-in-out",
    transform: "all ease 0.3s",
  },
};

// Dark theme
export const darkTheme: NavigatorTheme = {
  ...lightTheme,
  compass: {
    ...lightTheme.compass,
    outerRing: {
      ...lightTheme.compass.outerRing,
      background: "rgba(0, 0, 0, 0.8)",
      fill: "#9ca3af",
    },
    innerGyro: {
      ...lightTheme.compass.innerGyro,
      background: "transparent",
    },
  },
  zoomController: {
    ...lightTheme.zoomController,
    background: "transparent",
    button: {
      ...lightTheme.zoomController.button,
      background: "rgba(0, 0, 0, 0.8)",
      color: "#f3f4f6",
      hoverBackground: "oklch(0.646 0.222 41.116 / 0.8)",
      activeBackground: "oklch(0.646 0.222 41.116)",
      activeColor: "#ffffff",
    },
  },
};

// Theme manager class
export class ThemeManager {
  private currentTheme: NavigatorTheme = lightTheme;
  private listeners: Array<(theme: NavigatorTheme) => void> = [];

  setTheme(theme: NavigatorTheme | "light" | "dark") {
    if (typeof theme === "string") {
      this.currentTheme = theme === "dark" ? darkTheme : lightTheme;
    } else {
      this.currentTheme = theme;
    }
    this.notifyListeners();
  }

  getTheme(): NavigatorTheme {
    return this.currentTheme;
  }

  updateTheme(updates: Partial<NavigatorTheme>) {
    this.currentTheme = this.deepMerge(this.currentTheme, updates);
    this.notifyListeners();
  }

  onThemeChange(listener: (theme: NavigatorTheme) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentTheme));
  }

  private deepMerge(target: any, source: any): any {
    const result = { ...target };
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }
}

// Global theme manager instance
export const themeManager = new ThemeManager();
