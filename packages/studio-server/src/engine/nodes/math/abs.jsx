import { SquareFunction } from "lucide-react";
export const registry = {
  "description": "Returns the distance from zero",
  "type": "math_abs",
  "category": "Math",
  "label": "Absolute (abs)",
  "color": "#38bdf8",
  icon: SquareFunction,
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
