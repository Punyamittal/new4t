import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "0",
      screens: {
        "2xl": "100%",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 108, 53, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 108, 53, 0.8)" },
        },
        "float-bg": {
          "0%, 100%": {
            backgroundPosition: "0% 0%, 100% 100%, 50% 50%, 10% 90%, 90% 10%",
          },
          "33%": {
            backgroundPosition: "50% 50%, 50% 50%, 0% 100%, 90% 10%, 10% 90%",
          },
          "66%": {
            backgroundPosition: "100% 100%, 0% 0%, 100% 0%, 10% 90%, 90% 10%",
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-bg": {
          "0%, 100%": {
            backgroundImage: `
              radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.04) 0%, transparent 60%),
              radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.03) 0%, transparent 60%),
              radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.02) 0%, transparent 80%),
              radial-gradient(circle at 10% 90%, hsl(var(--primary) / 0.015) 0%, transparent 50%),
              radial-gradient(circle at 90% 10%, hsl(var(--primary) / 0.015) 0%, transparent 50%)
            `,
          },
          "50%": {
            backgroundImage: `
              radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.06) 0%, transparent 70%),
              radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.05) 0%, transparent 70%),
              radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.03) 0%, transparent 90%),
              radial-gradient(circle at 10% 90%, hsl(var(--primary) / 0.025) 0%, transparent 60%),
              radial-gradient(circle at 90% 10%, hsl(var(--primary) / 0.025) 0%, transparent 60%)
            `,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        "scale-in": "scale-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        "float-bg": "float-bg 25s ease-in-out infinite",
        "gradient-shift": "gradient-shift 25s ease-in-out infinite",
        "pulse-bg": "pulse-bg 8s ease-in-out infinite",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 8px 25px rgba(0, 0, 0, 0.15)",
        search: "0 16px 40px rgba(0, 0, 0, 0.12)",
        soft: "0 4px 12px rgba(0, 0, 0, 0.08)",
        "3d": "0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08)",
        "3d-hover":
          "0 12px 24px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)",
        "intense-3d":
          "0 16px 32px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
        "intense-3d-hover":
          "0 20px 50px rgba(0, 0, 0, 0.3), 0 10px 25px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
