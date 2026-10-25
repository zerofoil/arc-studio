import { GitBranch, Plus } from "lucide-react";

export const registry = {
  "description": "Compares one value with up to 50 cases and runs the first matching branch, or Default when none match.",
  "createdAt": "2026-10-20T16:53:56.000Z",
  "type": "branch_switch",
  "category": "Logic & Flow",
  "label": "Switch / Case",
  "color": "#8b5cf6",
  icon: GitBranch,
  "defaultData": {
    "caseCount": 2,
    "value": "",
    "case_1": "",
    "case_2": ""
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
    },
    {
      "id": "case_1",
      "label": "Case 1",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "case_2",
      "label": "Case 2",
      "type": "string",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "case_1_exec",
      "label": "Case 1",
      "type": "exec"
    },
    {
      "id": "case_2_exec",
      "label": "Case 2",
      "type": "exec"
    },
    {
      "id": "default_exec",
      "label": "Default",
      "type": "exec"
    }
  ],
  ui: ui
};

function ui({
  nodeDef,
  isConnected,
  FallbackField,
  update,
  node,
}) {
  const cases = nodeDef.inputs.filter((pin) => /^case_\d+$/.test(pin.id));
  return <div className="node-config node-config-stack">
    {!isConnected('value') && <FallbackField label="Value"><input value={node.data?.value ?? ''} onChange={(event) => update('value', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Value to match" aria-label="Switch value" /></FallbackField>}
    {cases.filter((pin) => !isConnected(pin.id)).map((pin) => <FallbackField key={pin.id} label={pin.label}><input value={node.data?.[pin.id] ?? ''} onChange={(event) => update(pin.id, event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Leave blank to skip" aria-label={`Switch ${pin.label.toLowerCase()}`} /></FallbackField>)}
    <span className="node-config-hint">First matching non-empty case runs. Values are compared as text.</span>
    <span className="node-config-hint">{cases.length} / 50 cases</span>
    {cases.length < 50 && <button type="button" className="node-config-action" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.preventDefault(); event.stopPropagation(); update('caseCount', cases.length + 1); }}><Plus size={12} /> Add case</button>}
  </div>;
}
