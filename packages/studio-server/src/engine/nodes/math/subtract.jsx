import { Minus } from "lucide-react";
export const registry = {
  "description": "Subtracts B from A",
  "type": "math_subtract",
  "category": "Math",
  "label": "Subtract (−)",
  "color": "#38bdf8",
  icon: Minus,
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
