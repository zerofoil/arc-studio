import { CaseSensitive } from "lucide-react";

export const registry = {
  "description": "Compares two text strings (equals, contains, startsWith)",
  "type": "compare_text",
  "category": "Logic & Flow",
  "label": "Compare Text",
  "color": "#8b5cf6",
  icon: CaseSensitive,
  "inputs": [
    {
      "id": "text_a",
      "label": "Text A",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "text_b",
      "label": "Text B",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "operator",
      "label": "Operator",
      "type": "string",
      "defaultValue": "equals"
    }
  ],
  "outputs": [
    {
      "id": "result",
      "label": "Result",
      "type": "boolean"
    }
  ],
  ui
};

function ui({
  isConnected,
  AnimatedDropdown,
  update,
  node
}) {
  return <div className="node-config node-config-stack compare-text-config">
    {!isConnected('text_a') && <label className="node-config-fallback"><span>Text A</span><input value={node.data?.text_a ?? ''} onChange={(event) => update('text_a', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label="Text A" /></label>}
    {!isConnected('text_b') && <label className="node-config-fallback"><span>Text B</span><input value={node.data?.text_b ?? ''} onChange={(event) => update('text_b', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label="Text B" /></label>}
    {!isConnected('operator') && <AnimatedDropdown value={node.data?.operator ?? 'equals'} onChange={(value) => update('operator', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Text comparison operator" options={[{ value: 'equals', label: 'Equals' }, { value: 'contains', label: 'Contains' }, { value: 'startsWith', label: 'Starts with' }, { value: 'endsWith', label: 'Ends with' }]} className="node-select" />}
  </div>;
}
