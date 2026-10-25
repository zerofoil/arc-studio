import { Dices } from "lucide-react";
export const registry = {
  "description": "Returns a random number between the connected minimum and maximum",
  "type": "math_random",
  "category": "Math",
  "label": "Random Number",
  "color": "#38bdf8",
  icon: Dices,
  "inputs": [
    {
      "id": "min",
      "label": "Minimum",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "max",
      "label": "Maximum",
      "type": "number",
      "defaultValue": 1
    }
  ],
  "outputs": [
    {
      "id": "result",
      "label": "Result",
      "type": "number"
    }
  ],
  ui
};

function ui({
  node,
  isConnected,
  update,
  numericNodeInputValue,
  NodeNumberInput,
  FallbackField
}) {
  return <div className="node-config node-config-stack">
    {!isConnected('min') && <FallbackField label="Minimum"><NodeNumberInput allowEmpty step="any" value={node.data?.min ?? 0} onChange={(event) => update('min', numericNodeInputValue(event.target.value, { allowEmpty: true }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Random number minimum" />
    </FallbackField>}
    {!isConnected('max') && <FallbackField label="Maximum"><NodeNumberInput allowEmpty step="any" value={node.data?.max ?? 1} onChange={(event) => update('max', numericNodeInputValue(event.target.value, { allowEmpty: true }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Random number maximum" /></FallbackField>}
  </div>;
}
