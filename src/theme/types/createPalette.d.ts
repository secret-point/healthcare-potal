declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    blue: PaletteColorOptions;
    backgroundGreen: PaletteColorOptions;
    border: PaletteColorOptions;
    inputColor: PaletteColorOptions;
    textColor: PaletteColorOptions;
    linkColor: PaletteColorOptions;
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
