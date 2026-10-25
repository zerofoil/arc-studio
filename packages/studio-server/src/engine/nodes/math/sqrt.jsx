import { Square } from "lucide-react";
export const registry = {
  "description": "Returns the non-negative square root, negative input returns 0",
  "type": "math_sqrt",
  "category": "Math",
  "label": "Square Root (√)",
  "color": "#38bdf8",
  icon: Square,
  "inputs": [
    {
      "id": "value",
      "label": "Value",
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
