declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    backgroundGreen: PaletteColorOptions;
    primaryNavy: PaletteColorOptions;
    primaryGreen: PaletteColorOptions;
    secondaryGreen1: PaletteColorOptions;
    secondaryGreen2: PaletteColorOptions;
    secondaryMint1: PaletteColorOptions;
    secondaryMint2: PaletteColorOptions;
    secondaryNavy1: PaletteColorOptions;
    secondaryNavy2: PaletteColorOptions;
    backgroundMint: PaletteColorOptions;
    backgroundGray: PaletteColorOptions;
    accentRed: PaletteColorOptions;
    yellow: PaletteColorOptions;
    distinctiveGray: PaletteColorOptions;
    backgroundRed: PaletteColorOptions;
  }
}

export interface Theme {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  mixins: Mixins;
  overrides?: Overrides;
  palette: PaletteOptions;
  props?: ComponentsProps;
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  borders: any;
}
