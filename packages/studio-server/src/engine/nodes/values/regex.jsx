export const registry = {
  "description": "Tests, extracts, or replaces text with a JavaScript regular expression. Inputs are bounded and risky regex structures are rejected.",
  "type": "data_regex",
  "category": "Values & Data",
  "label": "Regular Expression",
  "color": "#06b6d4",
  "defaultData": {
    "mode": "test",
    "text": "",
    "pattern": "",
    "flags": "",
    "replacement": ""
  },
  "inputs": [
    {
      "id": "text",
      "label": "Text",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "pattern",
      "label": "Pattern",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "flags",
      "label": "Flags",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "replacement",
      "label": "Replacement",
      "type": "string",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "text",
      "label": "Text",
      "type": "string"
    },
    {
      "id": "matched",
      "label": "Matched",
      "type": "boolean"
    },
    {
      "id": "match",
      "label": "First Match",
      "type": "string"
    },
    {
      "id": "matches",
      "label": "All Matches",
      "type": "object"
    },
    {
      "id": "captures",
      "label": "Capture Groups",
      "type": "object"
    },
    {
      "id": "index",
      "label": "Index",
      "type": "number"
    },
    {
      "id": "valid",
      "label": "Valid",
      "type": "boolean"
    },
    {
      "id": "error",
      "label": "Error",
      "type": "string"
    }
  ],
  ui
};

function ui({
  node,
  AnimatedDropdown,
  FallbackField,
  update,
  isConnected
}) {
  const mode = ['test', 'match', 'replace'].includes(node.data?.mode) ? node.data.mode : 'test';
  return <div className="node-config node-config-stack">
    <FallbackField label="Operation"><AnimatedDropdown value={mode} options={[{ value: 'test', label: 'Test for a match' }, { value: 'match', label: 'Extract a match' }, { value: 'replace', label: 'Replace matches' }]} onChange={(value) => update('mode', value)} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Regex operation" className="node-select" /></FallbackField>
    {!isConnected('text') && <FallbackField label="Text"><textarea rows={2} maxLength={8192} value={node.data?.text ?? ''} onChange={(event) => update('text', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label="Regex input text" /></FallbackField>}
    {!isConnected('pattern') && <FallbackField label="Pattern"><input maxLength={256} value={node.data?.pattern ?? ''} onChange={(event) => update('pattern', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="e.g. (\\d+)" aria-label="Regular expression pattern" /></FallbackField>}
    {!isConnected('flags') && <FallbackField label="Flags"><input maxLength={6} value={node.data?.flags ?? ''} onChange={(event) => update('flags', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="g, i, m, s, u, y" aria-label="Regular expression flags" /></FallbackField>}
    {mode === 'replace' && !isConnected('replacement') && <FallbackField label="Replacement"><textarea rows={2} maxLength={2000} value={node.data?.replacement ?? ''} onChange={(event) => update('replacement', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Replacement text" aria-label="Regex replacement text" /></FallbackField>}
    <span className="node-config-hint">Limits: 256-character pattern, 8,192-character input. Use Valid and Error to handle invalid patterns safely.</span>
  </div>;
}
