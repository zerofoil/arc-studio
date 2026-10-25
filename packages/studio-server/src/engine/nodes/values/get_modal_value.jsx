import { AlertTriangle } from "lucide-react";

export const registry = {
  "description": "Reads a submitted modal field by custom ID, multi-select fields return arrays.",
  "type": "data_get_modal_value",
  "category": "Values & Data",
  "label": "Get Modal Value",
  "color": "#06b6d4",
  "inputs": [
    {
      "id": "submitted_values",
      "label": "Submitted Values",
      "type": "object",
      "defaultValue": []
    },
    {
      "id": "custom_id",
      "label": "Field Custom ID",
      "type": "string",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "value",
      "label": "Value",
      "type": "object"
    },
    {
      "id": "found",
      "label": "Found",
      "type": "boolean"
    }
  ],
  ui: ui
};

function ui({
  node,
  modalFieldOptions,
  FallbackField,
  AnimatedDropdown,
  isConnected
}) {
  const fieldId = String(node.data?.custom_id ?? '');
  const fieldOptions = [...new Map(modalFieldOptions.map((item) => [item.value, item])).values()];
  return <div className="node-config node-config-stack">
    {!isConnected('submitted_values') && <span className="node-config-warning" role="status"><AlertTriangle size={12} /><span>Connect submitted values.</span></span>}
    {!isConnected('custom_id') && <>
      {fieldOptions.length > 0 && <FallbackField label="Modal field"><AnimatedDropdown value={fieldId} options={fieldOptions} onChange={(value) => update('custom_id', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Popup modal field" placeholder="Choose a field" className="node-select" /></FallbackField>}
      <FallbackField label="Field Custom ID"><input value={fieldId} onChange={(event) => update('custom_id', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Enter the field's custom ID" aria-label="Field Custom ID" /></FallbackField>
    </>}
    <span className="node-config-hint">Returns the matching field value. Multi-select fields return an array; use <code>Get Modal Value → Value</code> for one field at a time.</span>
  </div>;
}
