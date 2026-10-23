function ui({
    isConnected,
    node,
    update,
    FallbackField,
    NodeNumberInput
  }) {
  if (!isConnected('index')) {
    return <div className="node-config node-config-stack"><FallbackField label="Index"><NodeNumberInput min="0" step="1" value={node.data?.index ?? 0} onChange={(event) => update('index', numericNodeInputValue(event.target.value, { min: 0, integer: true }))} onPointerDown={(event) => event.stopPropagation()} placeholder="0" aria-label="Array item index" /></FallbackField><span className="node-config-hint">Zero-based index</span></div>;
  }
}

export const register = {
  "description": "Reads an item by its zero-based index. Check Found before using the result.",
  "type": "data_array_get",
  "category": "Values & Data",
  "label": "Get Array Item",
  "color": "#06b6d4",
  "defaultData": {
    "index": 0
  },
  "inputs": [
    {
      "id": "array",
      "label": "Array",
      "type": "object",
      "defaultValue": []
    },
    {
      "id": "index",
      "label": "Index",
      "type": "number",
      "defaultValue": 0
    }
  ],
  "outputs": [
    {
      "id": "value",
      "label": "Item",
      "type": "arg"
    },
    {
      "id": "found",
      "label": "Found",
      "type": "boolean"
    }
  ],
  "ui": ui
};
