import { Activity } from "lucide-react";

export const registry = {
  "description": "Sets the bot profile status text",
  "type": "action_set_custom_status",
  "category": "Discord Actions",
  "label": "Set Custom Status",
  "color": "#10b981",
  icon: Activity,
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "status_text",
      "label": "Status Text",
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
  ui: ui
};

function ui({
  isConnected,
  node,
  FallbackField,
  update
}) {
  return <div className="node-config node-config-stack">
    {!isConnected('status_text') && <FallbackField label="Status text"><input value={node.data?.status_text ?? ""} maxLength={128} onChange={(event) => update('status_text', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="ARC Studio" aria-label="Custom status text" /></FallbackField>}
    <span className="node-config-hint">Unicode emoji and pasted Discord custom emoji are supported in the text.</span>
  </div>;
}
