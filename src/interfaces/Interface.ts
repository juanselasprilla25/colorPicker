export interface HexColors {
    id: string,
    colorName: string,
    hexFormat: string,
    optProp?: string
}

export interface CardProps {
    colorInfo: {
        hexFormat: string,
        colorName: string,
    }
}