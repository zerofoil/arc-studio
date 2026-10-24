import { BarChart3 } from "lucide-react";
export const register = {
  "description": "Base 10 logarithm, non-positive input returns 0",
  "type": "math_log10",
  "category": "Math",
  "label": "Log Base 10",
  "color": "#38bdf8",
  icon: BarChart3,
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
