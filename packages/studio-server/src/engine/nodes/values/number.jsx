import { Hash } from "lucide-react";

export const registry = {
  "description": "Provides a numeric constant",
  "type": "value_number",
  "category": "Values & Data",
  "label": "Number",
  "color": "#06b6d4",
  icon: Hash,
  "inputs": [
    {
      "id": "value",
      "label": "Value",
      "type": "number",
      "defaultValue": 0
    }
  ],
  "outputs": [
    {
      "id": "value",
      "label": "Number",
      "type": "number"
    }
  ],
  ui
};

function ui({
  node,
  NodeNumberInput,
  update
}) {
  return <div className="node-config"><NodeNumberInput value={node.data?.value ?? 0} onChange={(event) => update('value', numericNodeInputValue(event.target.value))} onPointerDown={(event) => event.stopPropagation()} aria-label="Number value" /></div>;
}
