import { ToggleLeft } from "lucide-react";
export const registry = {
  "description": "Provides a true or false constant",
  "type": "value_boolean",
  "category": "Values & Data",
  "label": "Boolean",
  "color": "#ef4444",
  icon: ToggleLeft,
  "inputs": [
    {
      "id": "value",
      "label": "Value",
      "type": "boolean",
      "defaultValue": true
    }
  ],
  "outputs": [
    {
      "id": "value",
      "label": "Boolean",
      "type": "boolean"
    }
  ],
  ui
};

function ui({
  node,
  AnimatedCheckbox,
  update
}) {
  return <div className="node-config node-config-inline"><div className="node-checkbox-label"><AnimatedCheckbox checked={node.data?.value ?? true} onChange={(checked) => update('value', checked)} onPointerDown={(event) => event.stopPropagation()} label="Boolean value" /> <span>True</span></div></div>;
}
