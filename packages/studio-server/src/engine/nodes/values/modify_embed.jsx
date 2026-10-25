import { PanelsTopLeft } from "lucide-react";

export const registry = {
  "description": "Updates specific fields on an existing embed without rebuilding it",
  "type": "modify_embed",
  "category": "Values & Data",
  "label": "Modify Embed",
  "color": "#ec4899",
  icon: PanelsTopLeft,
  "inputs": [
    {
      "id": "embed",
      "label": "Base Embed",
      "type": "embed"
    },
    {
      "id": "title",
      "label": "Title (Optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "description",
      "label": "Description (Optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "color",
      "label": "Hex Color (#, optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "image_url",
      "label": "Image URL (Optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "thumbnail_url",
      "label": "Thumbnail URL (Optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "footer_text",
      "label": "Footer Text (Optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "author_name",
      "label": "Author Name (Optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "field_name",
      "label": "Field Name (Optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "field_value",
      "label": "Field Value (Optional)",
      "type": "string",
      "defaultValue": ""
    }
  ],
  "outputs": [
    {
      "id": "embed",
      "label": "Embed",
      "type": "embed"
    }
  ],
  ui
};

function ui({
  node,
  isConnected,
  textEditor,
  update
}) {
  if (node.type === 'modify_embed') {
    return <div className="node-config node-config-stack">
      {!isConnected('title') && <label className="node-config-fallback"><span>Title</span><input value={node.data?.title ?? ''} onChange={(event) => update('title', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="New title (Optional)" aria-label="Title" /></label>}
      {!isConnected('description') && <label className="node-config-fallback"><span>Description</span>{textEditor('description', 'Description', 4096, 'New description (Optional)')}</label>}
      {!isConnected('color') && <label className="node-config-fallback"><span>Color (#hex)</span><input value={node.data?.color ?? ''} onChange={(event) => update('color', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="#5865F2" aria-label="Color" /></label>}
    </div>;
  }
}
