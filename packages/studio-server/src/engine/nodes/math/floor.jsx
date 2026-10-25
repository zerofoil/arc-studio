import { ArrowDown } from "lucide-react";
export const registry = {
  "description": "Rounds down to an integer",
  "type": "math_floor",
  "category": "Math",
  "label": "Floor",
  "color": "#38bdf8",
  icon: ArrowDown,
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
