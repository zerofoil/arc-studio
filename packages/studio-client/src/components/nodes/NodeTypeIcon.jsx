import React from 'react';
import { SquareFunction, Workflow } from 'lucide-react';
import { nodeDefinitions } from '../../../../studio-server/src/engine/nodes';
const icons = Object.fromEntries(
  nodeDefinitions
    .filter(node => node.icon)
    .map((node) => [node.type, node.icon])
);

export function NodeTypeIcon({ type, color, size = 14, strokeWidth = 1.8, className }) {
  const Icon = icons[type] || (type?.startsWith('math_') ? SquareFunction : Workflow);
  return <Icon className={className} size={size} strokeWidth={strokeWidth} style={color ? { color } : undefined} aria-hidden="true" />;
}

function CalculatorIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2M8 18h2m4 0h2" />
  </svg>;
}
