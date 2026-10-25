export const registry = {
  "description": "Checks a boolean condition until it becomes true. Times out through the Timed Out branch, polling is bounded.",
  "type": "wait_until_condition",
  "category": "Logic & Flow",
  "label": "Wait Until Condition",
  "color": "#8b5cf6",
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
      "defaultValue": false
    },
    {
      "id": "timeout_ms",
      "label": "Timeout (ms)",
      "type": "number",
      "defaultValue": 30000
    },
    {
      "id": "interval_ms",
      "label": "Check Every (ms)",
      "type": "number",
      "defaultValue": 250
    }
  ],
  "outputs": [
    {
      "id": "ready_exec",
      "label": "Ready",
      "type": "exec"
    },
    {
      "id": "timeout_exec",
      "label": "Timed Out",
      "type": "exec"
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
    {!isConnected('timeout_ms') && <FallbackField label="Timeout (ms)"><NodeNumberInput min="1" max="86400000" value={node.data?.timeout_ms ?? 30000} onChange={(event) => update('timeout_ms', numericNodeInputValue(event.target.value, { min: 1, max: 86400000, fallback: 1 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Condition wait timeout in milliseconds" /></FallbackField>}
    {!isConnected('interval_ms') && <FallbackField label="Check every (ms)"><NodeNumberInput min="50" max="10000" value={node.data?.interval_ms ?? 250} onChange={(event) => update('interval_ms', numericNodeInputValue(event.target.value, { min: 50, max: 10000, fallback: 50 }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Condition check interval in milliseconds" /></FallbackField>}
  </div>;
}
