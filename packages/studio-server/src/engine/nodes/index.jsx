const nodeModules = import.meta.glob('./**/*.{js,jsx}', { eager: true });

export const nodeDefinitions = Object.values(nodeModules)
  .map((module) => module.register)
  .filter(Boolean);