import { GitFork } from "lucide-react";
export const register = {
  "description": "Runs two execution branches concurrently. Both branches must connect to the same Join node before execution continues.",
  "type": "parallel",
  "category": "Logic & Flow",
  "label": "Parallel",
  "color": "#8b5cf6",
  icon: GitFork,
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    }
  ],
  "outputs": [
    {
      "id": "branch_a_exec",
      "label": "Branch A",
      "type": "exec"
    },
    {
      "id": "branch_b_exec",
      "label": "Branch B",
      "type": "exec"
    }
  ]
};
