import { Activity } from "lucide-react";
export const registry = {
  "description": "Inverse sine, returned in radians",
  "type": "math_asin",
  "category": "Math",
  "label": "Arcsine",
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
