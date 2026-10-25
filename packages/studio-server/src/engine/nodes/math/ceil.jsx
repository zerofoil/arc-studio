import { ArrowUp } from "lucide-react";
export const registry = {
  "description": "Rounds up to an integer",
  "type": "math_ceil",
  "category": "Math",
  "label": "Ceiling",
  "color": "#38bdf8",
  icon: ArrowUp,
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
