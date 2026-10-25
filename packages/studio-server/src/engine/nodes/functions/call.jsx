import { Workflow, AlertTriangle } from "lucide-react";

export const registry = {
  "description": "Runs a reusable function graph and returns its result",
  "type": "function_call",
  "category": "Functions",
  "label": "Call Function",
  "color": "#a78bfa",
  icon: Workflow,
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "result",
      "label": "Result",
      "type": "number"
    }
  ],
  ui: ui
};

function ui({
  node,
  callableGraphs,
  AnimatedDropdown,
  update
}) {
  const target = callableGraphs.find((graph) => graph.id === node.data?.graphId);
  const parameters = (target?.nodes || []).filter((item) => item.type === 'function_input');
  const requiredCount = parameters.filter((item) => item.data?.optional === false).length;
  const optionalCount = parameters.length - requiredCount;
  const hasReturn = target?.nodes?.some((item) => item.type === 'function_return');
  return <div className="node-config node-config-stack function-node-config">
    <AnimatedDropdown value={node.data?.graphId || ''} options={callableGraphs.map((graph) => ({ value: graph.id, label: graph.name || 'Untitled graph' }))} onChange={(value) => {
      const selectedGraph = callableGraphs.find((graph) => graph.id === value);
      update({ graphId: value }, undefined, `Call ${selectedGraph?.name || 'Graph'}`);
    }} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Graph to call" placeholder={callableGraphs.length ? 'Select graph' : 'Save a graph first'} className="node-select" disabled={!callableGraphs.length} />
    {target && <span className="node-config-hint">{parameters.length ? `${requiredCount} required · ${optionalCount} optional input${parameters.length === 1 ? '' : 's'}` : 'No inputs'}</span>}
    {target && hasReturn
      ? <span className="node-config-hint">Returns {target.nodes.find((item) => item.type === 'function_return')?.data?.valueType || 'number'}</span>
      : target && <span className="node-config-warning" role="status"><AlertTriangle size={12} /> This graph has no Return Value</span>}
  </div>;
}
