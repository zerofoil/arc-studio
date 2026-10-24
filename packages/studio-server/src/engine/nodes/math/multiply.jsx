import { Asterisk } from "lucide-react";
export const register = {
  "description": "Multiplies two numbers",
  "type": "math_multiply",
  "category": "Math",
  "label": "Multiply (×)",
  "color": "#38bdf8",
  icon: Asterisk,
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
