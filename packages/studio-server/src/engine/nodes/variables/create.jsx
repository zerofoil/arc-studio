import { Database } from "lucide-react";

export const registry = {
  "description": "Creates or updates a graph variable. Its value type follows the connected value, otherwise choose a type and fallback value.",
  "type": "variable_create",
  "category": "Variables",
  "label": "Create Variable",
  "color": "#38bdf8",
  icon: Database,
  "defaultData": {
    "name": "",
    "valueType": "string",
    "value": "",
    "persist": true
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
      "type": "arg",
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
      "id": "variable",
      "label": "Variable",
      "type": "variable"
    },
    {
      "id": "value",
      "label": "Value",
      "type": "arg"
    }
  ],
  ui
};

function ui({
  node,
  isConnected,
  AnimatedDropdown,
  FallbackCheckbox,
  FallbackField,
  update,
  nodeDef,
  defaultValueForType,
  VariableJSONFallback,
  NodeNumberInput
}) {
  const type = ['string', 'number', 'boolean', 'array', 'object'].includes(node.data?.valueType) ? node.data.valueType : 'string';
  const variableTypes = [{ value: 'string', label: 'Text' }, { value: 'number', label: 'Number' }, { value: 'boolean', label: 'Boolean' }, { value: 'array', label: 'Array' }, { value: 'object', label: 'Object' }];
  const inferredType = nodeDef?.inputs?.find((pin) => pin.id === 'value')?.colorType || type;
  const setFallbackType = (nextType) => update({ valueType: nextType, value: defaultValueForType(nextType) });
  return <div className="node-config node-config-stack">
    <FallbackField label="Variable name"><input value={node.data?.name ?? ''} maxLength={64} onChange={(event) => update('name', event.target.value.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64))} onPointerDown={(event) => event.stopPropagation()} placeholder="e.g. current-score" aria-label="Created variable name" /></FallbackField>
    {isConnected('value')
      ? <span className="node-config-hint">Value type comes from the connected socket: {inferredType}.</span>
      : <>
        <FallbackField label="Variable type"><AnimatedDropdown value={type} options={variableTypes} onChange={setFallbackType} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Created variable type" className="node-select" /></FallbackField>
        {type === 'boolean'
          ? <FallbackCheckbox label="Fallback value" checked={node.data?.value ?? false} onChange={(value) => update('value', value)} />
          : ['array', 'object'].includes(type)
            ? <FallbackField label={`Fallback ${type === 'array' ? 'array' : 'JSON object'}`}><VariableJSONFallback key={type} type={type} value={node.data?.value} onChange={(value) => update('value', value)} /></FallbackField>
            : <FallbackField label="Fallback value">{type === 'number'
              ? <NodeNumberInput value={node.data?.value ?? 0} onChange={(event) => update('value', numericNodeInputValue(event.target.value))} onPointerDown={(event) => event.stopPropagation()} aria-label="Variable fallback number" />
              : <input value={node.data?.value ?? ''} onChange={(event) => update('value', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label="Variable fallback text" />}</FallbackField>}
      </>}
    <FallbackCheckbox label="Persist between runs" checked={node.data?.persist !== false} onChange={(persist) => update('persist', persist)} />
    <span className="node-config-hint">Create Variable makes a graph variable. Project variables are managed in Variables and always persist.</span>
  </div>;
}
