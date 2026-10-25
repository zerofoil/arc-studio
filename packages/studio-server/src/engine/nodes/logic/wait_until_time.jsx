export const registry = {
  "description": "Waits until an ISO date/time or Unix timestamp in milliseconds. Maximum wait is 7 days.",
  "type": "wait_until_time",
  "category": "Logic & Flow",
  "label": "Wait Until Time",
  "color": "#8b5cf6",
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "time",
      "label": "Time (ISO or ms)",
      "type": "string",
      "defaultValue": ""
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
  node,
  update,
  FallbackField
}) {
  return <div className="node-config node-config-stack">
    {!isConnected('time') && <FallbackField label="Time (ISO or timestamp)"><input value={node.data?.time ?? ''} onChange={(event) => update('time', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="2026-10-17T12:00:00Z" aria-label="Time to continue" /></FallbackField>}
  </div>;
}
