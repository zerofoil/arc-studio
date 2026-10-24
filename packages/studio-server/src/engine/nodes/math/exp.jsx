import { TrendingUp } from "lucide-react";
export const register = {
  "description": "Raises Euler’s number to the input power",
  "type": "math_exp",
  "category": "Math",
  "label": "Exponential",
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
