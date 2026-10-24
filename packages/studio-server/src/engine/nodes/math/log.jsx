import { TrendingUp } from "lucide-react";
export const register = {
  "description": "Natural logarithm, non-positive input returns 0",
  "type": "math_log",
  "category": "Math",
  "label": "Natural Log",
  "color": "#38bdf8",
  icon: TrendingUp,
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
