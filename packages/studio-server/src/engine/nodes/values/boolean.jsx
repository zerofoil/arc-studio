import { ToggleLeft } from "lucide-react";
export const registry = {
  "description": "Provides a true or false constant",
  "type": "value_boolean",
  "category": "Values & Data",
  "label": "Boolean",
  "color": "#ef4444",
  icon: ToggleLeft,
  "inputs": [
    {
      "id": "value",
      "label": "Value",
      "type": "boolean",
      "defaultValue": true
    }
  ],
  "outputs": [
    {
      "id": "value",
      "label": "Boolean",
      "type": "boolean"
    }
  ]
};
