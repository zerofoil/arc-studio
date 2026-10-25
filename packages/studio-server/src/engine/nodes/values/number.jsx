import { Hash } from "lucide-react";
export const registry = {
  "description": "Provides a numeric constant",
  "type": "value_number",
  "category": "Values & Data",
  "label": "Number",
  "color": "#06b6d4",
  icon: Hash,
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
      "id": "value",
      "label": "Number",
      "type": "number"
    }
  ]
};
