import { SlidersHorizontal } from "lucide-react";

export const registry = {
  "description": "Enables, disables, or updates buttons/select menus in an action row",
  "type": "modify_components",
  "category": "Values & Data",
  "label": "Modify Components",
  "color": "#f59e0b",
  icon: SlidersHorizontal,
  "inputs": [
    {
      "id": "components",
      "label": "Components",
      "type": "object"
    },
    {
      "id": "custom_id",
      "label": "Target Custom ID (\"all\" for all)",
      "type": "string",
      "defaultValue": "all"
    },
    {
      "id": "disabled",
      "label": "Disabled",
      "type": "boolean",
      "defaultValue": true
    },
    {
      "id": "label",
      "label": "New Label (Optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "style",
      "label": "New Style (Optional)",
      "type": "string",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "components",
      "label": "Components",
      "type": "object"
    }
  ],
  ui
};

function ui({
  node,
  isConnected,
  AnimatedCheckbox,
  update
}) {
  return <div className="node-config node-config-stack">
    {!isConnected('custom_id') && <label className="node-config-fallback"><span>Target Custom ID</span><input value={node.data?.custom_id ?? 'all'} onChange={(event) => update('custom_id', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="all or button_id" aria-label="Target Custom ID" /></label>}
    {!isConnected('disabled') && <div className="function-input-option"><span>Disabled</span><AnimatedCheckbox checked={node.data?.disabled ?? true} label="Disabled" onChange={(val) => update('disabled', val)} onPointerDown={(event) => event.stopPropagation()} /></div>}
  </div>;
}
