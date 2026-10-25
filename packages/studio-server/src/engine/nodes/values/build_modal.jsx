import { Plus } from "lucide-react";

export const registry = {
  "description": "Builds a Discord modal with 1–5 labeled inputs, selects, or checkbox groups.",
  "type": "build_modal",
  "category": "Values & Data",
  "label": "Popup Modal Builder",
  "color": "#06b6d4",
  "defaultData": {
    "modal": {
      "customId": "arc_modal",
      "title": "Tell us more",
      "components": [
        {
          "type": "text",
          "customId": "details",
          "label": "Details",
          "style": 2,
          "required": true,
          "minLength": 1,
          "maxLength": 1000
        }
      ]
    }
  },
  "inputs": [],
  "outputs": [
    {
      "id": "modal",
      "label": "Modal",
      "type": "object"
    }
  ],
  ui
};

function ui({
  node,
  onOpenModalStudio
}) {
  if (node.type === 'build_modal') return <div className="node-config node-config-stack"><button type="button" className="node-config-action node-config-studio-action" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.preventDefault(); event.stopPropagation(); onOpenModalStudio?.(node); }}><Plus size={12} /> Edit popup modal{node.data?.modal?.components?.length ? ` · ${node.data.modal.components.length} fields` : ''}</button></div>;
}
