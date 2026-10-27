const nodeModules = import.meta.glob('./**/*.{js,jsx}', { eager: true });

export const nodeDefinitions = Object.values(nodeModules)
  .map((module) => module.registry)
  .filter(Boolean)
  .sort((a, b) => a.type.localeCompare(b.type));
