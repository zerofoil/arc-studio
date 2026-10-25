import { GitBranch } from "lucide-react";
function exec({
  targetNode,
  selectIfBranch,
  resolveDataInput,
  findExecOutputs,
  currentExecWires,
  log
}) {
  const decision = selectIfBranch(resolveDataInput(targetNode, 'condition', false));
  log(decision.logMessage);
  currentExecWires.push(...findExecOutputs(targetNode.id, decision.branchPin));
}

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
  "exec": exec
};
