declare global {
  interface Window {
    require: {
      config: (settings: { paths: Record<string, string> }) => void;
    } & ((deps: string[], callback: (module: any) => void) => void);
  }
}

export {};
