export const theme = {
    colors: {
        bg: "#0b0b0b",
        text: "#e5e5e5",
        accent: "#e50914",
        card: "#141414",
    },
    radius: "8px",
} as const

export type ThemeType = typeof theme
