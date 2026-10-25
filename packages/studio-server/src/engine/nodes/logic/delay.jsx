import { Timer } from "lucide-react";

export const registry = {
  "description": "Awaits a short timer for this run. Other Discord events and graph runs continue while it waits.",
  "type": "delay",
  "category": "Logic & Flow",
  "label": "Wait (Async)",
  "color": "#8b5cf6",
  icon: Timer,
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "ms",
      "label": "Duration (ms)",
      "type": "number",
      "defaultValue": 1000
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    }
  ],
  ui
};

function ui({
  isConnected,
  NodeNumberInput,
  numericNodeInputValue,
  node,
  update,
  FallbackField
}) {
  return <div className="node-config node-config-stack">
    {!isConnected('ms') && <FallbackField label="Wait (ms)"><NodeNumberInput min="0" max="604800000" step="1000" value={node.data?.ms ?? 1000} onChange={(event) => update('ms', numericNodeInputValue(event.target.value, { min: 0, max: 604800000 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Wait duration in milliseconds" /></FallbackField>}
    <span className="node-config-hint">Maximum wait: 7 days per run.</span>
  </div>;
}
