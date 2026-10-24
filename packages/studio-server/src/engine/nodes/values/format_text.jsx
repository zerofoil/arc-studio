import { TextCursorInput } from "lucide-react";

export const register = {
  "description": "Combines text and graph variables using {{name}} slots",
  "type": "format_text",
  "category": "Values & Data",
  "label": "Text Builder",
  "color": "#06b6d4",
  icon: TextCursorInput,
  "inputs": [],
  "outputs": [
    {
      "id": "text",
      "label": "Text",
      "type": "string"
    }
  ]
};
