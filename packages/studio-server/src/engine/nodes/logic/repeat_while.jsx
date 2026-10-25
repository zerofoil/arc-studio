export const registry = {
  "description": "While Condition is true, waits at least 100 ms, runs Body once, and checks again. It can run indefinitely. Route changes through shared graph variables or other live inputs to stop it.",
  "introducedAt": "2026-10-17T00:00:00.000Z",
  "type": "repeat_while",
  "category": "Logic & Flow",
  "label": "Repeat While",
  "color": "#8b5cf6",
  "defaultData": {
    "condition": true,
    "interval_ms": 500
  },
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "condition",
      "label": "Condition",
      "type": "boolean",
      "defaultValue": true
    },
    {
      "id": "interval_ms",
      "label": "Interval (ms)",
      "type": "number",
      "defaultValue": 500
    }
  ],
  "outputs": [
    {
      "id": "body_exec",
      "label": "Body",
      "type": "exec"
    },
    {
      "id": "completed_exec",
      "label": "Completed",
      "type": "exec"
    },
    {
      "id": "iteration",
      "label": "Iteration",
      "type": "number"
    }
  ],
  ui
};

function ui({
  isConnected,
  FallbackField,
  NodeNumberInput,
  numericNodeInputValue,
  update,
  node
}) {
  return <div className="node-config node-config-stack">
    {!isConnected('interval_ms') && <FallbackField label="Wait between passes (ms)"><NodeNumberInput min="100" max="604800000" step="100" value={node.data?.interval_ms ?? 500} onChange={(event) => update('interval_ms', numericNodeInputValue(event.target.value, { min: 100, max: 604800000, fallback: 500 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Repeat interval in milliseconds" /></FallbackField>}
    <span className="node-config-hint">At least 100 ms. Set Condition false to stop; an always-true condition keeps the task running.</span>
  </div>;
}
