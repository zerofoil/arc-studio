import { RefreshCw, AlertTriangle } from "lucide-react";

export const registry = {
  "description": "Acknowledge a button or select interaction now and update its message later. Connect Reply to Interaction after this node.",
  "type": "action_defer_update",
  "category": "Discord Actions",
  "label": "Defer Update",
  "color": "#10b981",
  icon: RefreshCw,
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "interaction_id",
      "label": "Interaction ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "interaction_token",
      "label": "Interaction Token",
      "type": "string",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "interaction_token",
      "label": "Interaction Token",
      "type": "string"
    }
  ],
  ui
};

function ui({
  isConnected,
  node
}) {
  const missingToken = !isConnected('interaction_token') && !node.data?.interaction_token;
  const missingInteractionId = !isConnected('interaction_id') && !node.data?.interaction_id;
  if (missingToken || missingInteractionId) {
    return <div className="node-config node-config-stack">
      {missingToken && <span className="node-config-warning" role="status"><AlertTriangle size={12} /> Connect an interaction token to acknowledge</span>}
      {missingInteractionId && <span className="node-config-warning" role="status"><AlertTriangle size={12} /> Connect an Interaction ID</span>}
    </div>;
  }
}
