import { Sigma } from "lucide-react";
export const registry = {
  "description": "Adds up to 50 values. Connect the last input to reveal another.",
  "type": "math_sum",
  "category": "Math",
  "label": "Sum",
  "color": "#38bdf8",
  icon: Sigma,
  "inputs": [
    {
      "id": "a",
      "label": "A",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "b",
      "label": "B",
      "type": "number",
      "defaultValue": 0
    }
  ],
  "outputs": [
    {
      "id": "result",
      "label": "Result",
      "type": "number"
    }
  ]
};
