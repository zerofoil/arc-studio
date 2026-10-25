import { Database, Plus } from "lucide-react";

export const registry = {
  "description": "Reads a graph variable as typed data",
  "type": "variable_get",
  "category": "Variables",
  "label": "Get Variable",
  "color": "#38bdf8",
  icon: Database,
  "inputs": [
    {
      "id": "variable",
      "label": "Variable",
      "type": "variable"
    }
  ],
  "outputs": [
    {
      "id": "variable",
      "label": "Variable",
      "type": "variable"
    },
    {
      "id": "value",
      "label": "Value",
      "type": "string"
    }
  ],
  ui
};

function ui({
  node,
  AnimatedDropdown,
  update,
  graphVariables,
  selectedVariable
}) {
  if (node.type === 'variable_get' || node.type === 'variable_set') {
    const currentScope = node.data?.scope || 'graph';
    const variableOptions = graphVariables.map((variable) => ({ value: `${variable.scope || 'graph'}:${variable.id}`, label: `${variable.scope === 'project' ? 'Project' : 'Graph'} · ${variable.name} · ${variable.type}` }));
    const selectedScope = selectedVariable?.scope || currentScope;
    return <div className="node-config node-config-stack">
      {graphVariables.length ? <AnimatedDropdown value={`${selectedScope}:${node.data?.variableId || ''}`} onChange={(value) => { const separator = value.indexOf(':'); update({ scope: value.slice(0, separator), variableId: value.slice(separator + 1) }); }} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Project or graph variable" placeholder="Select variable" options={variableOptions} className="node-select" /> : <button className="node-config-action" onClick={(event) => { event.stopPropagation(); onOpenVariables?.(); }}><Plus size={12} /> Create variable</button>}
      {selectedVariable && <span className="node-config-hint">{selectedVariable.name} · {selectedVariable.type}</span>}
    </div>;
  }
}
