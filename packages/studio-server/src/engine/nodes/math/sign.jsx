import { Plus } from "lucide-react";
export const register = {
  "description": "Returns -1, 0, or 1 for the input sign",
  "type": "math_sign",
  "category": "Math",
  "label": "Sign",
  "color": "#38bdf8",
  icon: Plus,
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
