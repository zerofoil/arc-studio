import { ArrowDown } from "lucide-react";
export const register = {
  "description": "Returns the smaller number",
  "type": "math_min",
  "category": "Math",
  "label": "Minimum (min)",
  "color": "#38bdf8",
  icon: ArrowDown,
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
