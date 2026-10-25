import { ListFilter } from "lucide-react";

export const registry = {
  "description": "Keeps items whose value (or selected property path) matches the chosen comparison.",
  "createdAt": "2026-10-20T16:53:56.000Z",
  "type": "data_filter_array",
  "category": "Values & Data",
  "label": "Filter Array",
  "color": "#06b6d4",
  icon: ListFilter,
  "defaultData": {
    "path": "",
    "operator": "equals",
    "value": ""
  },
  "inputs": [
    {
      "id": "array",
      "label": "Array",
      "type": "object",
      "defaultValue": []
    },
    {
      "id": "path",
      "label": "Property path",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "operator",
      "label": "Comparison",
      "type": "string",
      "defaultValue": "equals"
    },
    {
      "id": "value",
      "label": "Match value",
      "type": "arg",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "array",
      "label": "Filtered items",
      "type": "object"
    },
    {
      "id": "count",
      "label": "Count",
      "type": "number"
    }
  ],
  ui
};

function ui({
  node,
  isConnected,
  update,
  FallbackField,
  AnimatedDropdown
}) {
  const comparisonOptions = [{ value: 'equals', label: 'Equals' }, { value: 'not_equals', label: 'Does not equal' }, { value: 'contains', label: 'Contains' }, { value: 'starts_with', label: 'Starts with' }, { value: 'ends_with', label: 'Ends with' }, { value: 'greater_than', label: 'Greater than' }, { value: 'greater_or_equal', label: 'At least' }, { value: 'less_than', label: 'Less than' }, { value: 'less_or_equal', label: 'At most' }, { value: 'exists', label: 'Path exists' }, { value: 'is_empty', label: 'Is empty' }];
  return <div className="node-config node-config-stack">
    {!isConnected('path') && <FallbackField label="Property path (optional)"><input value={node.data?.path ?? ''} onChange={(event) => update('path', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="id or user.name; blank checks each item" aria-label="Array item property path" /></FallbackField>}
    {node.type === 'data_filter_array' && !isConnected('operator') && <FallbackField label="Comparison"><AnimatedDropdown value={node.data?.operator || 'equals'} options={comparisonOptions} onChange={(value) => update('operator', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Array filter comparison" className="node-select" /></FallbackField>}
    {!isConnected('value') && !['exists', 'is_empty'].includes(node.data?.operator) && <FallbackField label="Match value"><input value={node.data?.value ?? ''} onChange={(event) => update('value', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label="Array match value" /></FallbackField>}
  </div>;
}
