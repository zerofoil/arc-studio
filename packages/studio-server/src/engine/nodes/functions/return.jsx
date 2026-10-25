import { LogOut } from "lucide-react";
export const registry = {
  "description": "Returns the connected value from this function graph",
  "type": "function_return",
  "category": "Functions",
  "label": "Return Value",
  "color": "#a78bfa",
  icon: LogOut,
  "defaultData": {
    "valueType": "number"
  },
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "value",
      "label": "Value",
      "type": "number",
      "defaultValue": 0
    }
  ],
  "outputs": [],
  ui: ui
};

function ui({
  node,
  AnimatedDropdown,
  valueTypes,
  update
}) {
  const type = node.data?.valueType || 'number';
  return <div className="node-config node-config-stack function-node-config">
    <AnimatedDropdown value={type} options={valueTypes} onChange={(value) => update('valueType', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Function return type" className="node-select" />
  </div>;
}
