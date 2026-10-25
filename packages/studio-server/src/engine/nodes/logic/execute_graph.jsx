export const registry = {
  "description": "Runs another event graph for the same Discord event. The target must have a matching event node, graph cycles are rejected.",
  "type": "execute_graph",
  "category": "Logic & Flow",
  "label": "Run Event Graph",
  "color": "#8b5cf6",
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
    }
  ],
  ui
};

function ui({
  node,
  callableGraphs,
  AnimatedDropdown,
  update
}) {
  const eventGraphs = callableGraphs.filter((graph) => graph.graphType !== 'function' && (graph.nodes || []).some((item) => item.type.startsWith('event_')));
  return <div className="node-config node-config-stack function-node-config">
    <AnimatedDropdown value={node.data?.graphId || ''} options={eventGraphs.map((graph) => ({ value: graph.id, label: graph.name || 'Untitled graph' }))} onChange={(value) => {
      const selectedGraph = eventGraphs.find((graph) => graph.id === value);
      update({ graphId: value }, undefined, `Run ${selectedGraph?.name || 'Graph'}`);
    }} onPointerDown={(event) => event.stopPropagation()} ariaLabel="Event graph to run" placeholder={eventGraphs.length ? 'Select event graph' : 'Create an event graph first'} className="node-select" disabled={!eventGraphs.length} />
    <span className="node-config-hint">Runs with the current Discord event. The target needs a matching trigger.</span>
  </div>;
}
