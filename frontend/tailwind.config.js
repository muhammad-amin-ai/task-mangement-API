/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F6F7F9",
        surface: "#FFFFFF",
        ink: "#12141C",
        muted: "#6B7280",
        subtle: "#9CA3AF",
        border: "#E4E6EB",
        accent: {
          DEFAULT: "#3552E0",
          ink: "#EEF1FF",
          hover: "#2A41C4",
        },
        priority: {
          low: "#0FA968",
          medium: "#E08A17",
          high: "#DC3A3A",
        },
        status: {
          pending: "#9CA3AF",
          progress: "#3552E0",
          completed: "#0FA968",
        },
        danger: {
          DEFAULT: "#DC3A3A",
          ink: "#FDEEEE",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18, 20, 28, 0.04), 0 1px 1px rgba(18, 20, 28, 0.03)",
        raised: "0 8px 24px rgba(18, 20, 28, 0.08)",
        focus: "0 0 0 3px rgba(53, 82, 224, 0.18)",
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};
