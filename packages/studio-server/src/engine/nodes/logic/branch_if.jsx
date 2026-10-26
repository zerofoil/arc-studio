import { GitBranch } from "lucide-react";

export const registry = {
  "description": "Splits execution flow based on a boolean condition",
  "type": "branch_if",
  "category": "Logic & Flow",
  "label": "Branch (If / Else)",
  "color": "#8b5cf6",
  icon: GitBranch,
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "condition",
      "label": "Condition",
      "type": "boolean",
      "defaultValue": false
    }
  ],
  "outputs": [
    {
      "id": "true_exec",
      "label": "True",
      "type": "exec"
    },
    {
      "id": "false_exec",
      "label": "False",
      "type": "exec"
    }
  ],
  exec
};

function exec({
  node,
  selectIfBranch,
  resolveDataInput,
  findExecOutputs,
  currentExecWires,
  log
}) {
  const decision = selectIfBranch(resolveDataInput(node, 'condition', false));
  log(decision.logMessage);
  currentExecWires.push(...findExecOutputs(node.id, decision.branchPin));
}
