import { Power } from "lucide-react";
export const registry = {
  "description": "Raises A to the power of B",
  "type": "math_power",
  "category": "Math",
  "label": "Power (^)",
  "color": "#38bdf8",
  icon: Power,
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
