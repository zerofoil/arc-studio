import { SlidersHorizontal } from "lucide-react";
export const registry = {
  "description": "Restricts a value between a minimum and maximum",
  "type": "math_clamp",
  "category": "Math",
  "label": "Clamp",
  "color": "#38bdf8",
  icon: SlidersHorizontal,
  "inputs": [
    {
      "id": "value",
      "label": "Value",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "min",
      "label": "Minimum",
      "type": "number",
      "defaultValue": 0
    },
    {
      "id": "max",
      "label": "Maximum",
      "type": "number",
      "defaultValue": 1
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
