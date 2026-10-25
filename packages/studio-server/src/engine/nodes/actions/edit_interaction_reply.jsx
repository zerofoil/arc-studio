import { MessageSquareReply, AlertTriangle, Plus } from "lucide-react";

export const registry = {
  "description": "Edits the original reply to a slash command, button, or select menu interaction after it has already been sent",
  "type": "action_edit_interaction_reply",
  "category": "Discord Actions",
  "label": "Edit Interaction Reply",
  "color": "#f59e0b",
  icon: MessageSquareReply,
  "inputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "application_id",
      "label": "Application ID",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "interaction_token",
      "label": "Interaction Token",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "content",
      "label": "New Content (Optional)",
      "type": "string",
      "defaultValue": ""
    },
    {
      "id": "embed",
      "label": "Embed (Optional)",
      "type": "embed"
    },
    {
      "id": "components",
      "label": "Components (Optional)",
      "type": "object"
    },
    {
      "id": "files",
      "label": "Files (optional)",
      "type": "object",
      "defaultValue": []
    }
  ],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    }
  ],
  ui
};

function ui({
  node,
  isConnected,
  AttachmentPicker,
  textEditor,
  authToken,
  update,
  onOpenEmbedStudio
}) {
  const componentsConnected = isConnected('components');
  return <div className="node-config node-config-stack">
    {!isConnected('interaction_token') && !node.data?.interaction_token && (
      <span className="node-config-warning" role="status"><AlertTriangle size={12} /> Connect an interaction token to edit</span>
    )}
    {!isConnected('content') && <label className="node-config-fallback"><span>New content (Optional)</span>{textEditor('content', 'New content', 2000, 'Leave empty to keep existing')}</label>}
    {!isConnected('files') && <AttachmentPicker files={node.data?.files || []} authToken={authToken} onChange={(files) => update('files', files)} />}
    <button type="button" className={`node-config-action ${componentsConnected ? 'is-disabled' : ''}`} disabled={componentsConnected} title={componentsConnected ? 'Components input is connected. Edit the source node on the canvas instead.' : undefined} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { if (componentsConnected) return; event.stopPropagation(); onOpenEmbedStudio?.(node); }}><Plus size={12} /> {componentsConnected ? 'Components wired (edit source node)' : `Edit message components${node.data?.components?.length ? ` · ${node.data.components.length} rows` : ''}`}</button>
  </div>;
}
