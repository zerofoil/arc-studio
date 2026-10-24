import { Percent } from "lucide-react";
export const register = {
  "description": "Returns the remainder after division",
  "type": "math_modulo",
  "category": "Math",
  "label": "Remainder (mod)",
  "color": "#38bdf8",
  icon: Percent,
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
