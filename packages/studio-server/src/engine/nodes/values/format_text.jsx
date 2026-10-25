import { TextCursorInput } from "lucide-react";

export const registry = {
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
  ],
  ui
};

function ui({
  node,
  onOpenTextStudio,
  nodeDef,
  update,
  graphVariables,
  variableValuePaths,
  LONG_TEXT_THRESHOLD,
  DiscordTextField,
  appEmojis,
  TemplateVariableHints,
  connectedInputIds,
  templatePreviewValues
}) {
  const value = String(node.data?.template ?? '');
  const openTextEditor = () => onOpenTextStudio?.(node, 'template', 'Text template', value);
  const valuePaths = graphVariables.flatMap((variable) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(variable.name || '') ? variableValuePaths(variable.initialValue, variable.name) : []);
  const templateSuggestions = nodeDef.inputs.filter((pin) => /^arg_\d+$/.test(pin.id)).map((pin) => ({ name: pin.id.replace(/^arg_/, 'arg'), label: pin.label }));
  return <div className="node-config node-config-stack">{value.length > LONG_TEXT_THRESHOLD ? <DiscordLongTextField value={value} onOpenEditor={openTextEditor} label="Text template" /> : <DiscordTextField onOpenTextEditor={openTextEditor} as="textarea" rows={2} value={value} appEmojis={appEmojis} graphVariables={graphVariables} discordAutocomplete templateAutocomplete templateValuePaths={valuePaths} templateSuggestions={templateSuggestions} onChange={(event) => update('template', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Type text with {{name}}" aria-label="Text template" />}<TemplateVariableHints value={node.data?.template} graphVariables={graphVariables} inputSlots={nodeDef.inputs.filter((pin) => pin.id.startsWith('slot_'))} connectedInputIds={connectedInputIds} templatePreviewValues={templatePreviewValues} /></div>;
}
