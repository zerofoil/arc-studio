import React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, FileCode2, Plus, X } from 'lucide-react';
import { getNodeTemplateInputPins, getTextTemplateSlots, PinColors } from './nodeDefinitions.js';
import { bitfieldToPermissions, DISCORD_PERMISSIONS } from './permissionCatalog.js';
import { AnimatedCheckbox, AnimatedDropdown } from '../ui/CustomControls.jsx';
import { CharacterLimit } from '../ui/Inputs.jsx';
import { EmbedNodeBuilder } from './EmbedNodeBuilder.jsx';
import { JsonSchemaEditor } from './JsonSchemaEditor.jsx';
import { DiscordTextField } from '../ui/DiscordTextField.jsx';
import { TemplateVariableHints } from '../ui/TemplateVariableHints.jsx';
import { DiscordLongTextField, LONG_TEXT_THRESHOLD } from '../ui/DiscordLongTextField.jsx';
import { apiUrl } from '../../core/api.js';
import { onPageBlur } from '../../core/pageFocus.js';
import { resolveVariableReference } from '../../core/projectVariables.js';
import { NodeDefinitions } from "../../../../studio-server/src/engine/NodeRegistry.js";
//
const slashCommandNamePattern = /^[-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/u;
const defaultValueForType = (type) => type === 'number' ? 0 : type === 'boolean' ? false : type === 'array' ? [] : type === 'object' ? {} : '';
const eventSocketHints = {
  application_id: 'Discord application (bot) ID associated with this interaction',
  channel_id: 'Discord channel ID where this event or interaction occurred',
  command_name: 'Name of the slash command that was invoked, without the leading slash',
  content: 'Text content of the Discord message or event payload',
  custom_id: 'Developer-defined ID used to identify the submitted component or modal',
  guild_id: 'Discord server ID where this event occurred; empty for direct messages',
  interaction_token: 'Short-lived token used to respond to this interaction; treat it as a secret',
  interaction_id: 'Unique ID for this Discord interaction',
  message_id: 'ID of the Discord message involved in this event',
  options: 'Object containing the command options submitted with this interaction',
  selected_values: 'Array of values chosen in the submitted select menu',
  submitted_values: 'Object of modal field values, keyed by each field’s custom ID',
  user_id: 'Discord user ID of the person who triggered this event or interaction',
  username: 'Discord username of the person who invoked this command'
};
function VariableJSONFallback({ type, value, onChange }) {
  const [draft, setDraft] = React.useState(null);
  const text = draft ?? JSON.stringify(value ?? defaultValueForType(type), null, 2);
  let valid = false;
  try {
    const parsed = JSON.parse(text);
    valid = type === 'array' ? Array.isArray(parsed) : Boolean(parsed && typeof parsed === 'object' && !Array.isArray(parsed));
  } catch { }
  return <div className="node-config-stack">
    <textarea rows={3} value={text} onChange={(event) => {
      const nextText = event.target.value;
      setDraft(nextText);
      try {
        const parsed = JSON.parse(nextText);
        const rightShape = type === 'array' ? Array.isArray(parsed) : parsed && typeof parsed === 'object' && !Array.isArray(parsed);
        if (rightShape) onChange(parsed);
      } catch { }
    }} onBlur={() => { if (valid) setDraft(null); }} onPointerDown={(event) => event.stopPropagation()} placeholder={type === 'array' ? '[]' : '{}'} aria-label="Variable fallback JSON value" />
    {!valid && <small className="node-config-hint">Enter a valid JSON {type === 'array' ? 'array' : 'object'}.</small>}
  </div>;
}
function variableValuePaths(value, root, depth = 0, output = []) {
  if (depth >= 4 || value == null || typeof value !== 'object') return output;
  const entries = Array.isArray(value) ? value.slice(0, 10).map((_item, index) => [index, value[index]]) : Object.entries(value).slice(0, 40).filter(([key]) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key));
  for (const [key, child] of entries) {
    const path = Array.isArray(value) ? `${root}[${key}]` : `${root}.${key}`;
    output.push({ path, label: path });
    variableValuePaths(child, path, depth + 1, output);
  }
  return output;
}

function getSlashCommandNameIssue(value) {
  const name = String(value ?? '');
  if (!name) return 'Enter a command name.';
  if (!slashCommandNamePattern.test(name)) return 'Use 1–32 lowercase letters, numbers, hyphens, underscores, or apostrophes. Do not include the leading /.';
  if (name !== name.toLowerCase()) return 'Command names must be lowercase.';
  return '';
}

function getSlashCommandDescriptionIssue(value) {
  const description = String(value ?? '').trim();
  if (!description) return 'Add a description for this slash command.';
  if (Array.from(description).length > 100) return 'Descriptions must be 100 characters or fewer.';
  return '';
}

function NodeNumberInput({ value, onChange, allowEmpty = false, className = '', ...props }) {
  const onBlur = props.onBlur;
  const inputProps = { ...props };
  delete inputProps.onBlur;
  const [draft, setDraft] = React.useState(value == null ? '' : String(value));
  React.useEffect(() => setDraft(value == null ? '' : String(value)), [value]);
  const emptyIsInvalid = draft === '' && !allowEmpty;
  return <input {...inputProps} type="text" inputMode="decimal" value={draft} className={`${className} ${emptyIsInvalid ? 'is-empty-number' : ''}`.trim()} aria-invalid={emptyIsInvalid || props['aria-invalid'] || undefined} onChange={(event) => {
    let next = event.target.value;
    const maximum = Number(props.max);
    const isTemplate = getTextTemplateSlots(next).length > 0;
    if (!isTemplate && next !== '' && Number.isFinite(maximum) && Number(next) > maximum) {
      next = String(maximum);
      event.target.value = next;
    }
    setDraft(next);
    if (next === '' || allowEmpty || Number.isFinite(Number(next)) || isTemplate) onChange?.(event);
  }} onBlur={(event) => {
    if (getTextTemplateSlots(draft).length) {
      onBlur?.(event);
      return;
    }
    if (draft !== '' && Number.isFinite(Number(draft))) {
      const minimum = Number(props.min);
      const maximum = Number(props.max);
      const number = Number(draft);
      const bounded = Math.max(Number.isFinite(minimum) ? minimum : -Infinity, Math.min(Number.isFinite(maximum) ? maximum : Infinity, number));
      if (Number.isFinite(bounded) && String(bounded) !== draft) {
        const normalized = String(bounded);
        setDraft(normalized);
        onChange?.({ target: { value: normalized } });
      }
    } else if (draft !== '' && !Number.isFinite(Number(draft))) setDraft(value == null ? '' : String(value));
    onBlur?.(event);
  }} />;
}

function numericNodeInputValue(value, { min = -Infinity, max = Infinity, fallback = 0, integer = false, allowEmpty = false } = {}) {
  const text = String(value ?? '');
  if (getTextTemplateSlots(text).length) return text;
  if (text === '' && allowEmpty) return '';
  const number = Number(text);
  if (!Number.isFinite(number)) return fallback;
  const bounded = Math.max(min, Math.min(max, integer ? Math.trunc(number) : number));
  return Number.isFinite(bounded) ? bounded : fallback;
}

function CanvasNodeView({
  node, definition, authToken = '', connectedInputIds = new Set(), graphVariables = [], templatePreviewValues = {}, callableGraphs = [], selected = false, illuminated = false, isLocked = false, findOptions = null, isFindCurrent = false,
  snappedPin = null, appEmojis = [], modalFieldOptions = [], onSelect, onDelete, onNodeDataChange, onPinStartConnect, onOpenVariables, onOpenEmbedStudio, onOpenTextStudio, onOpenPermissionStudio, onOpenSlashCommandStudio, onOpenModalStudio, onOpenFunctionGraph
}) {
  const nodeDef = definition || { label: node.label || node.type, color: '#778196', category: 'Node', inputs: [], outputs: [] };
  const execFirst = (pins = []) => [...pins].sort((left, right) => Number(right.type === 'exec') - Number(left.type === 'exec'));
  const inputs = execFirst(nodeDef.inputs);
  const outputs = execFirst(nodeDef.outputs);
  const rows = Math.max(inputs.length, outputs.length);
  const update = (key, value, label) => onNodeDataChange?.(node.id, typeof key === 'object' ? key : { [key]: value }, label);
  const selectedVariable = resolveVariableReference(graphVariables, node.data?.variableId, node.data?.scope || 'graph');
  const configureTextFields = (element) => {
    if (!element) return;
    element.querySelectorAll('input:not([type="number"]):not([type="checkbox"]):not([type="radio"]):not([type="color"]), textarea').forEach((field) => {
      field.setAttribute('autocapitalize', 'off');
      field.setAttribute('autocorrect', 'off');
      field.setAttribute('spellcheck', 'false');
    });
  };

  const renderPin = (pin, direction, index) => {
    const displayType = pin.colorType || pin.type;
    const pinColor = PinColors[displayType] || '#c7cedb';
    const isSnapped = snappedPin?.nodeId === node.id && snappedPin?.pinId === pin.id && snappedPin?.direction === direction;
    const socketHint = direction === 'output' && nodeDef.type?.startsWith('event_') ? eventSocketHints[pin.id] : '';
    const description = pin.description || (pin.type === 'exec'
      ? direction === 'input'
        ? 'Execution input · accepts multiple incoming paths · runs once for each active path'
        : 'Execution output · each connected path runs in order'
      : socketHint
        ? socketHint
        : direction === 'input'
          ? `Input socket for ${pin.label} · accepts a compatible ${displayType} wire · without one, the configured fallback is used`
          : `Output socket for ${pin.label} · carries a ${displayType} value to connected inputs`);
    return (
      <div
        key={`${direction}-${pin.id}`}
        className={`node-pin-row ${direction === 'output' ? 'is-output' : 'is-input'} ${pin.type === 'exec' ? 'is-exec' : ''} ${isSnapped ? 'is-wire-target' : ''}`}
        data-node-id={node.id}
        data-pin-id={pin.id}
        data-pin-index={index}
        data-direction={direction}
        data-pin-type={pin.type}
        data-tooltip={`${pin.label} · ${displayType}`}
        data-pin-description={`${pin.label} · ${description} · ${displayType}`}
        onPointerDown={(event) => {
          if (direction !== 'output') { event.stopPropagation(); return; }
          onPinStartConnect?.(event, node.id, pin.id, direction, pin.type, index);
        }}
      >
        {direction === 'input' && <span className="pin-socket" style={{ '--pin-color': pinColor }} />}
        <span className="pin-label">{renderCanvasFindText(pin.label, findOptions, isFindCurrent)}</span>
        {direction === 'output' && <span className="pin-socket" style={{ '--pin-color': pinColor }} />}
      </div>
    );
  };

  return (
    <article
      className={`canvas-node ${selected ? 'is-selected' : ''} ${illuminated ? 'is-illuminated' : ''} ${isLocked ? 'is-locked' : ''}`}
      data-node-card-id={node.id}
      tabIndex={-1}
      style={{ '--node-accent': nodeDef.color, '--node-rows': rows }}
      ref={configureTextFields}
      onClick={(event) => { event.stopPropagation(); onSelect?.(node.id, event); }}
      onDoubleClick={(event) => {
        event.stopPropagation();
        if (node.type !== 'function_call' || event.target.closest('button, input, textarea, select, [role="combobox"], .node-pin-row')) return;
        const target = callableGraphs.find((graph) => graph.id === node.data?.graphId && graph.graphType === 'function');
        if (target) onOpenFunctionGraph?.(target);
      }}
      data-tooltip={node.type === 'function_call' && callableGraphs.some((graph) => graph.id === node.data?.graphId && graph.graphType === 'function') ? 'Double-click to open this function graph' : undefined}
      aria-label={`${node.label || nodeDef.label} node`}
    >
      <header className="node-header">
        <span className="node-type-mark"><span /></span>
        <span className="node-category">{renderCanvasFindText(nodeDef.category, findOptions, isFindCurrent)}</span>
        {!isLocked && <button className="node-delete" onClick={(event) => { event.stopPropagation(); onDelete?.(node.id); }} title="Delete node" aria-label="Delete node" tabIndex={selected ? 0 : -1}><X size={13} /></button>}
      </header>
      <div className="node-title" data-tooltip={node.label && node.label !== nodeDef.label ? `Node type: ${nodeDef.label}` : undefined}>{renderCanvasFindText(node.label || nodeDef.label, findOptions, isFindCurrent)}</div>
      <div className="node-pins">
        <div className="node-pin-column node-pin-inputs">{inputs.map((pin, index) => renderPin(pin, 'input', index))}</div>
        <div className="node-pin-column node-pin-outputs">{outputs.map((pin, index) => renderPin(pin, 'output', index))}</div>
      </div>
      {!nodeDef.requiresGenericEditor && renderNodeConfig(node, nodeDef, update, graphVariables, callableGraphs, selectedVariable, onOpenVariables, onOpenEmbedStudio, onOpenTextStudio, onOpenPermissionStudio, onOpenSlashCommandStudio, onOpenModalStudio, connectedInputIds, appEmojis, authToken, modalFieldOptions, templatePreviewValues)}
      {(nodeDef.requiresGenericEditor || nodeDef.editorOnlyInputs?.length > 0) && <div className="node-config node-config-stack node-schema-fallback">
        {nodeDef.requiresGenericEditor && <span className="node-config-hint">This workspace schema differs from this client’s editor. These values are used by the workspace server.</span>}
        {nodeDef.editorOnlyInputs.filter((pin) => pin.type !== 'exec' && !connectedInputIds.has(pin.id)).map((pin) => {
          const value = node.data?.[pin.id] ?? pin.defaultValue;
          if (pin.type === 'boolean') return <FallbackCheckbox key={pin.id} label={pin.label} checked={Boolean(value)} onChange={(next) => update(pin.id, next)} />;
          if (pin.type === 'number') return <FallbackField key={pin.id} label={pin.label}><NodeNumberInput value={value ?? 0} onChange={(event) => update(pin.id, numericNodeInputValue(event.target.value))} onPointerDown={(event) => event.stopPropagation()} aria-label={pin.label} /></FallbackField>;
          if (['object', 'array', 'embed', 'any', 'variable'].includes(pin.type)) return <FallbackField key={pin.id} label={pin.label}><GenericJsonInput type={pin.type} value={value} onChange={(next) => update(pin.id, next)} /></FallbackField>;
          return <FallbackField key={pin.id} label={pin.label}><input value={typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value ?? '')} onChange={(event) => update(pin.id, event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label={pin.label} /></FallbackField>;
        })}
      </div>}
      {!['build_embed', 'format_text'].includes(node.type) && nodeDef.inputs
        .filter((pin) => ['string', 'number', 'arg'].includes(pin.type) && !pin.id.startsWith('arg_') && !pin.id.startsWith('slot_') && !connectedInputIds.has(pin.id) && typeof node.data?.[pin.id] === 'string' && getTextTemplateSlots(node.data[pin.id]).length)
        .map((pin) => <TemplateVariableHints key={`template-hints-${pin.id}`} value={node.data[pin.id]} graphVariables={graphVariables} inputSlots={getNodeTemplateInputPins(node, nodeDef.inputs, graphVariables).filter((slot) => getTextTemplateSlots(node.data[pin.id]).some((name) => slot.id === `slot_${name}`))} connectedInputIds={connectedInputIds} templatePreviewValues={templatePreviewValues} />)}
    </article>
  );
}

function areCanvasNodePropsEqual(previous, next) {
  const previousNode = previous.node;
  const nextNode = next.node;
  if (!equalCanvasNodeData(previousNode, nextNode)) return false;
  const previousKeys = Object.keys(previous);
  const nextKeys = Object.keys(next);
  if (previousKeys.length !== nextKeys.length) return false;
  return previousKeys.every((key) => {
    if (key === 'node') return true;
    if (key === 'graphVariables') return equalDefinitionValue(previous[key], next[key]);
    if (key === 'callableGraphs') return equalCallableGraphOptions(previous[key], next[key], nextNode || previousNode);
    return Object.is(previous[key], next[key]);
  });
}

export const CanvasNode = React.memo(CanvasNodeView, areCanvasNodePropsEqual);

function GenericJsonInput({ type, value, onChange }) {
  const expectedType = ['array', 'any', 'variable'].includes(type) ? type : 'object';
  const fallback = expectedType === 'array' ? [] : expectedType === 'object' ? {} : null;
  const serialized = JSON.stringify(value ?? fallback, null, 2);
  const [draft, setDraft] = React.useState(serialized);
  const [error, setError] = React.useState('');
  React.useEffect(() => {
    setDraft(JSON.stringify(value ?? fallback, null, 2));
    setError('');
  }, [expectedType, value]);
  return <>
    <textarea rows={3} value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={() => {
      try {
        const parsed = JSON.parse(draft);
        if (expectedType === 'array' && !Array.isArray(parsed)) throw new TypeError('Enter a JSON array.');
        if (expectedType === 'object' && (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))) throw new TypeError('Enter a JSON object.');
        onChange(parsed);
        setError('');
      } catch (parseError) {
        setError(parseError.message || 'Enter valid JSON.');
      }
    }} onPointerDown={(event) => event.stopPropagation()} aria-label={`${type} value`} aria-invalid={Boolean(error) || undefined} />
    <small className="node-config-hint">Valid JSON is applied when you leave the field.</small>
    {error && <small className="node-config-warning" role="alert">{error}</small>}
  </>;
}

function equalCanvasNodeData(left, right) {
  if (left === right) return true;
  if (!left || !right || typeof left !== 'object' || typeof right !== 'object') return false;
  const leftKeys = Object.keys(left).filter((key) => key !== 'x' && key !== 'y');
  const rightKeys = Object.keys(right).filter((key) => key !== 'x' && key !== 'y');
  return leftKeys.length === rightKeys.length
    && leftKeys.every((key) => Object.hasOwn(right, key) && equalDefinitionValue(left[key], right[key]));
}

function equalCallableGraphOptions(left = [], right = [], node) {
  if (left === right) return true;
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) return false;
  if (node?.type !== 'function_call' && node?.type !== 'execute_graph') return true;
  const targetId = node.data?.graphId;
  for (let index = 0; index < left.length; index += 1) {
    const before = left[index];
    const after = right[index];
    if (before?.id !== after?.id || before?.name !== after?.name) return false;
    if (node.type === 'function_call' && before.id === targetId) {
      if (before.graphType !== after.graphType || functionSignature(before) !== functionSignature(after)) return false;
    }
    if (node.type === 'execute_graph') {
      const beforeIsEventGraph = before.graphType !== 'function' && (before.nodes || []).some((item) => String(item.type || '').startsWith('event_'));
      const afterIsEventGraph = after.graphType !== 'function' && (after.nodes || []).some((item) => String(item.type || '').startsWith('event_'));
      if (before.graphType !== after.graphType || beforeIsEventGraph !== afterIsEventGraph) return false;
    }
  }
  return true;
}

function functionSignature(graph) {
  const nodes = graph?.nodes || [];
  return JSON.stringify({
    inputs: nodes.filter((item) => item.type === 'function_input').map((item) => [item.id, item.data?.paramId, item.data?.name, item.data?.optional, item.data?.valueType, item.data?.defaultValue]),
    returnType: nodes.find((item) => item.type === 'function_return')?.data?.valueType || null
  });
}

function equalDefinitionValue(left, right) {
  if (Object.is(left, right)) return true;
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left) && Array.isArray(right) && left.length === right.length
      && left.every((value, index) => equalDefinitionValue(value, right[index]));
  }
  if (!left || !right || typeof left !== 'object' || typeof right !== 'object') return false;
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  return leftKeys.length === rightKeys.length
    && leftKeys.every((key) => Object.hasOwn(right, key) && equalDefinitionValue(left[key], right[key]));
}

function renderCanvasFindText(value, findOptions, currentNode = false) {
  const text = String(value ?? '');
  const query = findOptions?.query?.trim();
  if (!query) return text;
  let expression;
  try {
    const source = findOptions.regex ? query : query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    expression = new RegExp(source, `gu${findOptions.matchCase ? '' : 'i'}`);
  } catch {
    return text;
  }
  const parts = [];
  let cursor = 0;
  let match;
  let index = 0;
  while ((match = expression.exec(text))) {
    const start = match.index;
    const end = start + match[0].length;
    const isWord = (character) => Boolean(character && /[\p{L}\p{N}_]/u.test(character));
    if (!match[0].length) {
      expression.lastIndex += 1;
      continue;
    }
    if (findOptions.wholeWord && (isWord(text[start - 1]) || isWord(text[end]))) continue;
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(<mark key={`${start}-${index}`} className={`canvas-find-text-hit ${currentNode ? 'is-current' : ''}`}>{match[0]}</mark>);
    cursor = end;
    index += 1;
  }
  if (!index) return text;
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

function renderSchemaControls(node, controls, update, connectedInputIds) {
  if (!Array.isArray(controls) || controls.length === 0) return null;
  const visibleControls = controls.filter((control) => {
    if (control.hideWhenConnected && connectedInputIds.has(control.inputId || control.key)) return false;
    if (!control.visibleWhen) return true;
    const { key, equals, orUnset } = control.visibleWhen;
    const value = node.data?.[key];
    return value === equals || (orUnset && (value === undefined || value === ''));
  });
  if (!visibleControls.length) return null;

  return <div className="node-config node-config-stack">
    {visibleControls.map((control, index) => {
      if (control.type === 'hint') return <span key={`hint-${index}`} className="node-config-hint">{control.text}</span>;
      const value = node.data?.[control.key] ?? control.defaultValue;
      const label = control.label || control.key;
      if (control.type === 'checkbox') {
        return <FallbackCheckbox key={control.key} label={label} checked={Boolean(value)} onChange={(next) => update(control.key, next)} />;
      }
      if (control.type === 'number') {
        return <FallbackField key={control.key} label={label}><NodeNumberInput
          min={control.min}
          max={control.max}
          step={control.step}
          value={value ?? 0}
          onChange={(event) => update(control.key, numericNodeInputValue(event.target.value, {
            min: control.min ?? -Infinity,
            max: control.max ?? Infinity,
            integer: control.integer
          }))}
          onPointerDown={(event) => event.stopPropagation()}
          aria-label={label}
        /></FallbackField>;
      }
      if (control.type === 'select') {
        const options = (control.options || []).map((option) => ({ ...option, value: String(option.value) }));
        const selectedValue = value === '' ? control.defaultValue : value;
        return <FallbackField key={control.key} label={label}><AnimatedDropdown
          value={String(selectedValue ?? '')}
          options={options}
          onChange={(next) => update(control.key, control.valueType === 'boolean' ? next === 'true' : control.valueType === 'number' ? Number(next) : next)}
          onPointerDown={(event) => event.stopPropagation()}
          ariaLabel={label}
          className="node-select"
        /></FallbackField>;
      }
      if (control.type === 'text') {
        return <FallbackField key={control.key} label={label}><input
          value={String(value ?? '')}
          maxLength={control.maxLength}
          onChange={(event) => update(control.key, event.target.value)}
          onPointerDown={(event) => event.stopPropagation()}
          placeholder={control.placeholder}
          aria-label={label}
        /></FallbackField>;
      }
      return null;
    })}
  </div>;
}

function renderNodeConfig(node, nodeDef, update, graphVariables, callableGraphs, selectedVariable, onOpenVariables, onOpenEmbedStudio, onOpenTextStudio, onOpenPermissionStudio, onOpenSlashCommandStudio, onOpenModalStudio, connectedInputIds, appEmojis, authToken, modalFieldOptions, templatePreviewValues) {
  const isConnected = (pinId) => connectedInputIds.has(pinId);
  const valueTypes = [{ value: 'number', label: 'Number' }, { value: 'string', label: 'Text' }, { value: 'boolean', label: 'Boolean' }, { value: 'object', label: 'Object / Array' }];
  function textEditor(id, label, maxLength = 2000, placeholder = '', autocomplete = true) {
    const value = String(node.data?.[id] ?? '');
    const openTextEditor = () => onOpenTextStudio?.(node, id, label, value, maxLength);
    const valuePaths = graphVariables.flatMap((variable) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(variable.name || '') ? variableValuePaths(variable.initialValue, variable.name) : []);
    const templateSuggestions = nodeDef.inputs.filter((pin) => /^arg_\d+$/.test(pin.id)).map((pin) => ({ name: pin.id.replace(/^arg_/, 'arg'), label: pin.label }));
    if (value.length > LONG_TEXT_THRESHOLD) return <DiscordLongTextField value={value} onOpenEditor={openTextEditor} label={label} maxLength={maxLength} />;
    return <CharacterLimit value={value} maxLength={maxLength}><DiscordTextField onOpenTextEditor={openTextEditor} discordAutocomplete={autocomplete} templateAutocomplete templateValuePaths={valuePaths} templateSuggestions={templateSuggestions} graphVariables={graphVariables} as="textarea" rows={2} maxLength={maxLength} value={value} appEmojis={appEmojis} onChange={(event) => update(id, event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder={placeholder} aria-label={label} /></CharacterLimit>;
  };
  function templateInput(id, label, { multiline = false, maxLength = 8192, inputMode, placeholder = 'Used when unconnected' } = {}) {
    if (isConnected(id)) return null;
    const value = String(node.data?.[id] ?? '');
    const valuePaths = graphVariables.flatMap((variable) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(variable.name || '') ? variableValuePaths(variable.initialValue, variable.name) : []);
    const templateSuggestions = nodeDef.inputs.filter((pin) => /^arg_\d+$/.test(pin.id)).map((pin) => ({ name: pin.id.replace(/^arg_/, 'arg'), label: pin.label }));
    return <FallbackField label={label}><DiscordTextField
      as={multiline ? 'textarea' : 'input'}
      rows={multiline ? 2 : undefined}
      maxLength={maxLength}
      inputMode={inputMode}
      value={value}
      graphVariables={graphVariables}
      templateValuePaths={valuePaths}
      templateSuggestions={templateSuggestions}
      templateAutocomplete
      onOpenTextEditor={() => onOpenTextStudio?.(node, id, label, value, maxLength)}
      onChange={(event) => update(id, event.target.value)}
      onPointerDown={(event) => event.stopPropagation()}
      placeholder={placeholder}
      aria-label={label}
    /></FallbackField>;
  };
  function textField(id, label, placeholder = 'Used when unconnected') {
    return isConnected(id) ? null : <FallbackField key={id} label={label}><input value={node.data?.[id] ?? ''} onChange={(event) => update(id, event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder={placeholder} aria-label={label} /></FallbackField>;
  }

  try {
    return NodeDefinitions[node.type].ui({
      node,
      nodeDef,
      update,
      graphVariables,
      callableGraphs,
      selectedVariable,
      onOpenVariables,
      onOpenEmbedStudio,
      onOpenTextStudio,
      onOpenPermissionStudio,
      onOpenSlashCommandStudio,
      onOpenModalStudio,
      connectedInputIds,
      appEmojis,
      authToken,
      modalFieldOptions,
      templatePreviewValues,
      isConnected,
      FallbackField,
      NodeNumberInput,
      AttachmentPicker,
      textEditor,
      FallbackCheckbox,
      getSlashCommandNameIssue,
      getSlashCommandDescriptionIssue,
      bitfieldToPermissions,
      CharacterLimit,
      AnimatedCheckbox,
      AnimatedDropdown,
      defaultValueForType,
      valueTypes,
      numericNodeInputValue,
      DiscordLongTextField,
      DiscordTextField,
      VariableJSONFallback,
      variableValuePaths,
      LONG_TEXT_THRESHOLD,
      TemplateVariableHints,
      EmbedNodeBuilder,
      textField,
      templateInput
    });
  } catch (e) {
    if (NodeDefinitions[node.type]?.ui) {
      console.log(`UI error at ${node.type}\n${e}`);
    }
  }

  if (nodeDef.pluginAdapter) {
    return <div className="node-config node-config-stack plugin-adapter-config">
      {nodeDef.description && <span className="node-config-hint">{nodeDef.description}</span>}
      {nodeDef.inputs.filter((pin) => pin.type !== 'exec' && !isConnected(pin.id)).map((pin) => {
        if (pin.type === 'boolean') return <FallbackCheckbox key={pin.id} label={pin.label} checked={node.data?.[pin.id] ?? pin.defaultValue ?? false} onChange={(value) => update(pin.id, value)} />;
        if (pin.type === 'number') return <FallbackField key={pin.id} label={pin.label}><NodeNumberInput value={node.data?.[pin.id] ?? pin.defaultValue ?? 0} onChange={(event) => update(pin.id, numericNodeInputValue(event.target.value))} onPointerDown={(event) => event.stopPropagation()} aria-label={pin.label} /></FallbackField>;
        const input = pin.editor === 'json-schema'
          ? <JsonSchemaEditor value={node.data?.[pin.id] ?? pin.defaultValue ?? '{}'} onChange={(value) => update(pin.id, value)} onOpenTextEditor={() => onOpenTextStudio?.(node, pin.id, pin.label, String(node.data?.[pin.id] ?? pin.defaultValue ?? '{}'), 12000)} label={pin.label} />
          : pin.editor === 'json'
            ? <div className="plugin-json-editor"><button type="button" className="node-config-editor-button" aria-label={`Edit ${pin.label} JSON`} onClick={(event) => { event.stopPropagation(); onOpenTextStudio?.(node, pin.id, pin.label, String(node.data?.[pin.id] ?? pin.defaultValue ?? '{}'), 12000); }}><FileCode2 size={13} />Edit JSON</button></div>
            : pin.id === 'svg'
              ? <textarea rows={4} value={node.data?.[pin.id] ?? pin.defaultValue ?? ''} onChange={(event) => update(pin.id, event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Paste SVG markup" aria-label={pin.label} />
              : <input value={node.data?.[pin.id] ?? pin.defaultValue ?? ''} onChange={(event) => update(pin.id, event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Used when unconnected" aria-label={pin.label} />;
        return <FallbackField key={pin.id} label={pin.label}>{input}</FallbackField>;
      })}
    </div>;
  }

  return renderSchemaControls(node, nodeDef.editorControls, update, connectedInputIds);
}

function FallbackField({ label, children }) {
  if (React.isValidElement(children) && children.type === 'textarea' && String(children.props.value ?? '').length > LONG_TEXT_THRESHOLD) {
    return <label className="node-config-fallback"><span>{label}</span><DiscordLongTextField
      value={String(children.props.value ?? '')}
      onChange={(value) => children.props.onChange?.({ target: { value } })}
      label={label}
      maxLength={children.props.maxLength}
      rows={14}
    /></label>;
  }
  return <label className="node-config-fallback"><span>{label}</span>{children}</label>;
}

function FallbackCheckbox({ label, checked, onChange }) {
  return <div className="node-checkbox-label"><AnimatedCheckbox checked={checked} onChange={onChange} onPointerDown={(event) => event.stopPropagation()} label={label} /><span>{label}</span></div>;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ filename: file.name, contentType: file.type || 'application/octet-stream', data: reader.result });
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}

function AttachmentPicker({ files = [], authToken = '', onChange }) {
  const [error, setError] = React.useState('');
  const [urlEntryOpen, setUrlEntryOpen] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [filename, setFilename] = React.useState('');
  const [urlLoading, setUrlLoading] = React.useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);
  const contextMenuRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  const onFiles = async (event) => {
    const selected = Array.from(event.target.files || []);
    event.target.value = '';
    const combined = [...files, ...selected];
    if (combined.length > 10) { setError('Choose up to 10 files.'); return; }
    if (selected.some((file) => file.name.length > 100)) { setError('Filenames must be 100 characters or fewer.'); return; }
    if (selected.some((file) => !file.size)) { setError('Empty files cannot be attached.'); return; }
    if (selected.some((file) => file.size > 20 * 1024 * 1024)) { setError('Each file must be 20 MiB or smaller.'); return; }
    const existingBytes = files.reduce((total, file) => total + Math.floor(String(file.data || '').split(',').pop().length * 3 / 4), 0);
    if (existingBytes + selected.reduce((total, file) => total + file.size, 0) > 24 * 1024 * 1024) { setError('Files must total 24 MiB or less.'); return; }
    if (new Set(combined.map((file) => String(file.filename || file.name).toLowerCase())).size !== combined.length) { setError('Each attachment needs a unique filename.'); return; }
    try {
      setError('');
      onChange([...files, ...await Promise.all(selected.map(readFileAsDataUrl))]);
    } catch (readError) { setError(readError.message || 'Could not read selected files.'); }
  };
  const remove = (index) => onChange(files.filter((_, fileIndex) => fileIndex !== index));
  const openContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const menuWidth = 164;
    const menuHeight = 40;
    setContextMenu({
      left: Math.max(8, Math.min(event.clientX, window.innerWidth - menuWidth - 8)),
      top: Math.max(8, Math.min(event.clientY, window.innerHeight - menuHeight - 8))
    });
  };
  React.useEffect(() => {
    if (!contextMenu) return undefined;
    const close = (event) => {
      if (contextMenuRef.current?.contains(event.target)) return;
      setContextMenu(null);
    };
    const onKeyDown = (event) => { if (event.key === 'Escape') setContextMenu(null); };
    document.addEventListener('pointerdown', close, true);
    document.addEventListener('keydown', onKeyDown, true);
    const removePageBlurListener = onPageBlur(() => setContextMenu(null));
    return () => {
      document.removeEventListener('pointerdown', close, true);
      document.removeEventListener('keydown', onKeyDown, true);
      removePageBlurListener();
    };
  }, [contextMenu]);
  const addUrl = async (event) => {
    event.preventDefault();
    let parsed;
    try { parsed = new URL(url.trim()); } catch { setError('Enter a valid public HTTP or HTTPS URL.'); return; }
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) { setError('Use an HTTP or HTTPS URL without embedded credentials.'); return; }
    if (files.length >= 10) { setError('Choose up to 10 files.'); return; }
    const pathName = parsed.pathname.split('/').filter(Boolean).pop() || 'attachment.bin';
    let inferredName = pathName;
    try { inferredName = decodeURIComponent(pathName); } catch { }
    const cleanName = String(filename.trim() || inferredName).replace(/[\\/\0-\x1f]/g, '_').slice(0, 100) || 'attachment.bin';
    if (files.some((file) => String(file.filename || file.name || '').toLowerCase() === cleanName.toLowerCase())) { setError('Each attachment needs a unique filename.'); return; }
    setError('');
    setUrlLoading(true);
    try {
      const response = await fetch(apiUrl('/api/graphs/attachment-url'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-arc-token': authToken },
        body: JSON.stringify({ url: parsed.href, filename: cleanName })
      });
      let result = {};
      try { result = await response.json(); } catch { }
      if (!response.ok || !result.file?.data) throw new Error(result.error || 'Could not download this attachment.');
      const currentBytes = files.reduce((total, file) => total + Math.floor(String(file.data || '').split(',').pop().length * 3 / 4), 0);
      const addedBytes = Math.floor(String(result.file.data).split(',').pop().length * 3 / 4);
      if (currentBytes + addedBytes > 24 * 1024 * 1024) throw new Error('Files must total 24 MiB or less.');
      onChange([...files, result.file]);
      setUrl('');
      setFilename('');
      setUrlEntryOpen(false);
    } catch (downloadError) { setError(downloadError.message || 'Could not download this attachment.'); }
    finally { setUrlLoading(false); }
  };
  return <div className="node-attachment-picker" onPointerDown={(event) => event.stopPropagation()}>
    <div className="node-attachment-heading"><span>Attachments</span><span>{files.length} / 10 · 20 MiB each</span></div>
    <button className="node-attachment-choose" type="button" onClick={() => fileInputRef.current?.click()} onContextMenu={openContextMenu}>Choose files</button>
    <input ref={fileInputRef} className="node-attachment-file-input" type="file" multiple onChange={onFiles} />
    {files.length > 0 && <div className="node-attachment-list">{files.map((file, index) => <div className="node-attachment-item" key={`${file.filename}-${index}`}><span title={file.url || undefined}>{file.filename}{file.url ? ' · URL' : ''}</span><button type="button" onClick={() => remove(index)} aria-label={`Remove ${file.filename}`}><X size={12} /></button></div>)}</div>}
    {urlEntryOpen && <form className="node-attachment-url-form" onSubmit={addUrl}>
      <input type="url" value={url} onChange={(event) => { setUrl(event.target.value); setError(''); }} onPointerDown={(event) => event.stopPropagation()} placeholder="https://example.com/image.png" aria-label="Attachment URL" autoCapitalize="none" autoCorrect="off" spellCheck="false" required disabled={urlLoading} />
      <input value={filename} onChange={(event) => setFilename(event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="Filename (optional)" aria-label="Attachment filename" maxLength={100} autoCapitalize="none" autoCorrect="off" spellCheck="false" disabled={urlLoading} />
      <div><button type="button" disabled={urlLoading} onClick={() => { setUrlEntryOpen(false); setError(''); }}>Cancel</button><button type="submit" disabled={urlLoading}>{urlLoading ? 'Downloading…' : 'Add URL'}</button></div>
    </form>}
    <small>24 MiB total per message. URL files are downloaded into the graph and included in exports. Embed images can use attachment://filename.</small>
    {error && <small className="node-attachment-error" role="alert">{error}</small>}
    {contextMenu && createPortal(<div ref={contextMenuRef} className="canvas-context-menu attachment-context-menu" role="menu" style={{ left: contextMenu.left, top: contextMenu.top }} onPointerDown={(event) => event.stopPropagation()}>
      <button role="menuitem" onClick={() => { setUrlEntryOpen(true); setContextMenu(null); setError(''); }}><span>Use URL</span></button>
    </div>, document.body)}
  </div>;
}
