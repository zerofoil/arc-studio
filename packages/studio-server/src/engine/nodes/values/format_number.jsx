import { CalculatorIcon } from "lucide-react";
export const registry = {
  "description": "Formats a finite number with locale grouping, decimal, percent, or currency style. Percent style scales the number by 100.",
  "createdAt": "2026-10-20T16:53:56.000Z",
  "type": "data_format_number",
  "category": "Values & Data",
  "label": "Format Number",
  "color": "#06b6d4",
  icon: CalculatorIcon,
  "defaultData": {
    "locale": "en-US",
    "style": "decimal",
    "currency": "USD",
    "minimum_fraction_digits": 0,
    "maximum_fraction_digits": 2
  },
  "inputs": [
    {
      "id": "value",
      "label": "Value",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "locale",
      "label": "Locale",
      "type": "string",
      "defaultValue": "en-US"
    },
    {
      "id": "style",
      "label": "Style",
      "type": "string",
      "defaultValue": "decimal"
    },
    {
      "id": "currency",
      "label": "Currency",
      "type": "string",
      "defaultValue": "USD"
    },
    {
      "id": "minimum_fraction_digits",
      "label": "Minimum decimals",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "maximum_fraction_digits",
      "label": "Maximum decimals",
      "type": "number",
      "defaultValue": 2
    }
  ],
  "outputs": [
    {
      "id": "text",
      "label": "Formatted",
      "type": "string"
    },
    {
      "id": "valid",
      "label": "Valid",
      "type": "boolean"
    }
  ],
  ui
};

function ui({
  node,
  isConnected,
  FallbackField,
  AnimatedDropdown,
  NodeNumberInput,
  update
}) {
  const style = ['decimal', 'percent', 'currency'].includes(node.data?.style) ? node.data.style : 'decimal';
  return <div className="node-config node-config-stack">
    {!isConnected('value') && <FallbackField label="Value"><NodeNumberInput allowEmpty step="any" value={node.data?.value ?? 0} onChange={(event) => update('value', numericNodeInputValue(event.target.value, { allowEmpty: true }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Number to format" /></FallbackField>}
    {!isConnected('locale') && <FallbackField label="Locale"><input value={node.data?.locale ?? 'en-US'} onChange={(event) => update('locale', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="en-US" aria-label="Number format locale" /></FallbackField>}
    {!isConnected('style') && <FallbackField label="Style"><AnimatedDropdown value={style} options={[{ value: 'decimal', label: 'Number' }, { value: 'percent', label: 'Percent' }, { value: 'currency', label: 'Currency' }]} onChange={(value) => update('style', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Number format style" className="node-select" /></FallbackField>}
    {style === 'currency' && !isConnected('currency') && <FallbackField label="Currency code"><input maxLength={3} value={node.data?.currency ?? 'USD'} onChange={(event) => update('currency', event.target.value.toUpperCase())} onPointerDown={(event) => event.stopPropagation()} placeholder="USD" aria-label="Currency code" /></FallbackField>}
    <div className="node-config"><FallbackField label="Minimum decimals">{isConnected('minimum_fraction_digits') ? <span>Connected</span> : <NodeNumberInput min="0" max="20" step="1" value={node.data?.minimum_fraction_digits ?? 0} onChange={(event) => update('minimum_fraction_digits', numericNodeInputValue(event.target.value, { min: 0, max: 20, integer: true }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Minimum fraction digits" />}</FallbackField><FallbackField label="Maximum decimals">{isConnected('maximum_fraction_digits') ? <span>Connected</span> : <NodeNumberInput min="0" max="20" step="1" value={node.data?.maximum_fraction_digits ?? 2} onChange={(event) => update('maximum_fraction_digits', numericNodeInputValue(event.target.value, { min: 0, max: 20, integer: true }))} onPointerDown={(event) => event.stopPropagation()} aria-label="Maximum fraction digits" />}</FallbackField></div>
  </div>;
}
