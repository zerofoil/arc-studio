import { Activity } from "lucide-react";
export const register = {
  "description": "Sine of an angle in radians",
  "type": "math_sin",
  "category": "Math",
  "label": "Sine",
  "color": "#38bdf8",
  icon: Activity,
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
