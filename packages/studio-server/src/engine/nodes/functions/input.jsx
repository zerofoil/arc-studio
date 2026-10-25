import { LogIn } from "lucide-react";
export const registry = {
  "description": "Defines a typed argument for a reusable function graph",
  "type": "function_input",
  "category": "Functions",
  "label": "Function Input",
  "color": "#a78bfa",
  icon: LogIn,
  "defaultData": {
    "name": "Input",
    "valueType": "number",
    "optional": false,
    "defaultValue": 0
  },
  "inputs": [],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "value",
      "label": "Value",
      "type": "number"
    }
  ],
  ui
};

function ui({
  node,
  defaultValueForType,
  CharacterLimit,
  AnimatedDropdown,
  AnimatedCheckbox,
  update,
  valueTypes
}) {
  const type = node.data?.valueType || 'number';
  const optional = node.data?.optional !== false;
  const defaultValue = node.data?.defaultValue ?? defaultValueForType(type);
  return <div className="node-config node-config-stack function-node-config">
    <CharacterLimit value={node.data?.name || ''} maxLength={40}><input value={node.data?.name || ''} maxLength={40} onChange={(event) => update('name', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Input name" aria-label="Function input name" /></CharacterLimit>
    <AnimatedDropdown value={type} options={valueTypes} onChange={(value) => update({ valueType: value, defaultValue: defaultValueForType(value) })} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Function input type" className="node-select" />
    <div className="function-input-option"><span>Optional input</span><AnimatedCheckbox checked={optional} label="Optional input" onChange={(value) => update('optional', value)} onPointerDown={(event) => event.stopPropagation()} /></div>
    {optional && (type === 'object'
      ? <span className="node-config-hint">Default is an empty object. Connect an array or object node to supply data.</span>
      : type === 'boolean'
        ? <div className="function-input-default"><span>Default value</span><AnimatedCheckbox checked={Boolean(defaultValue)} label="Default value" onChange={(value) => update('defaultValue', value)} onPointerDown={(event) => event.stopPropagation()} /></div>
        : <label className="function-input-default"><span>Default value</span><input type={type === 'number' ? 'number' : 'text'} step={type === 'number' ? 'any' : undefined} value={type === 'number' ? (Number.isFinite(Number(defaultValue)) ? Number(defaultValue) : 0) : defaultValue} onChange={(event) => update('defaultValue', type === 'number' ? (Number.isFinite(Number(event.target.value)) ? Number(event.target.value) : 0) : event.target.value)} onPointerDown={(event) => event.stopPropagation()} aria-label="Optional function input default value" /></label>)}
  </div>;
}
