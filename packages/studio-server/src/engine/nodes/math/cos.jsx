import { Activity } from "lucide-react";
export const register = {
  "description": "Cosine of an angle in radians",
  "type": "math_cos",
  "category": "Math",
  "label": "Cosine",
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
