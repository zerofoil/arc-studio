import { MessageSquareReply, AlertTriangle, Plus } from "lucide-react";

export const registry = {
  "description": "Responds to a slash command or component interaction with text, embeds, attachments, and interactive components",
  "type": "action_reply_interaction",
  "category": "Discord Actions",
  "label": "Reply to Interaction",
  "color": "#10b981",
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
      "id": "interaction_id",
      "label": "Interaction ID",
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
      "label": "Reply Content",
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
    },
    {
      "id": "ephemeral",
      "label": "Ephemeral (Hidden)",
      "type": "boolean",
      "defaultValue": false
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
  onOpenEmbedStudio
}) {
  const componentsConnected = isConnected('components');
  return <div className="node-config node-config-stack">
    {!isConnected('interaction_token') && !node.data?.interaction_token && (
      <span className="node-config-warning" role="status"><AlertTriangle size={12} /> Connect an interaction token to reply</span>
    )}
    {!isConnected('content') && <label className="node-config-fallback"><span>Reply content</span>{textEditor('content', 'Reply content', 2000, 'Used when unconnected')}</label>}
    {!isConnected('files') && <AttachmentPicker files={node.data?.files || []} authToken={authToken} onChange={(files) => update('files', files)} />}
    <button type="button" className={`node-config-action ${componentsConnected ? 'is-disabled' : ''}`} disabled={componentsConnected} title={componentsConnected ? 'Components input is connected. Edit the source node on the canvas instead.' : undefined} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { if (componentsConnected) return; event.stopPropagation(); onOpenEmbedStudio?.(node); }}><Plus size={12} /> {componentsConnected ? 'Components wired (edit source node)' : `Edit message components${node.data?.components?.length ? ` · ${node.data.components.length} rows` : ''}`}</button>
  </div>;
}
