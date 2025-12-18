// Removed problematic vite/client reference to fix "Cannot find type definition file" error.
// Minimal ImportMeta definitions are provided below to satisfy Vite's requirements.

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}

/**
 * Fixed the "Cannot redeclare block-scoped variable 'process'" error by using 'var' instead of 'const'.
 * This allows the declaration to merge or overlap with existing global definitions 
 * provided by other type libraries (like @types/node).
 */
declare var process: {
  env: NodeJS.ProcessEnv;
};
