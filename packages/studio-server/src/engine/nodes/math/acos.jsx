import { Activity } from "lucide-react";
export const registry = {
  "description": "Inverse cosine, returned in radians",
  "type": "math_acos",
  "category": "Math",
  "label": "Arccosine",
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
