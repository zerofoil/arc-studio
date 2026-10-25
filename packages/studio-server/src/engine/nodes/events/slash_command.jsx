import { Slash, AlertTriangle, Plus } from "lucide-react";

export const registry = {
  "description": "Fires when an application slash command is invoked",
  "type": "event_slash_command",
  "category": "Events",
  "label": "On Slash Command",
  "color": "#5865F2",
  icon: Slash,
  "gatewayEvent": "INTERACTION_CREATE",
  "gatewayInteractionType": 2,
  "gatewayCommandType": 1,
  "inputs": [],
  "outputs": [
    {
      "id": "exec",
      "label": "Exec",
      "type": "exec"
    },
    {
      "id": "command_name",
      "label": "Command Name",
      "type": "string"
    },
    {
      "id": "user_id",
      "label": "User ID",
      "type": "string"
    },
    {
      "id": "username",
      "label": "Username",
      "type": "string"
    },
    {
      "id": "channel_id",
      "label": "Channel ID",
      "type": "string"
    },
    {
      "id": "guild_id",
      "label": "Server ID",
      "type": "string"
    },
    {
      "id": "application_id",
      "label": "Application ID",
      "type": "string"
    },
    {
      "id": "interaction_id",
      "label": "Interaction ID",
      "type": "string"
    },
    {
      "id": "interaction_token",
      "label": "Interaction Token",
      "type": "string"
    },
    {
      "id": "options",
      "label": "Command Arguments",
      "type": "object"
    }
  ],
  ui
};

function ui({
  getSlashCommandNameIssue,
  getSlashCommandDescriptionIssue,
  bitfieldToPermissions,
  node,
  CharacterLimit,
  AnimatedCheckbox,
  update,
  onOpenPermissionStudio,
  onOpenSlashCommandStudio
}) {
  const commandNameIssue = getSlashCommandNameIssue(node.data?.commandName);
  const commandDescriptionIssue = getSlashCommandDescriptionIssue(node.data?.description);
  const commandPermissionBits = String(node.data?.defaultMemberPermissions ?? '').trim();
  const selectedCommandPermissions = bitfieldToPermissions(commandPermissionBits).map((key) => DISCORD_PERMISSIONS.find((permission) => permission.key === key)?.label || key);
  const commandPermissionSummary = commandPermissionBits === '0'
    ? 'Administrators only'
    : selectedCommandPermissions.length === 1
      ? selectedCommandPermissions[0]
      : selectedCommandPermissions.length > 1
        ? `${selectedCommandPermissions.length} permissions`
        : 'Everyone';
  const usesAppDefaults = !Array.isArray(node.data?.integrationTypes) && !Array.isArray(node.data?.contexts);
  const integrationTypes = Array.isArray(node.data?.integrationTypes) ? node.data.integrationTypes : [];
  const commandContexts = Array.isArray(node.data?.contexts) ? node.data.contexts : [];
  const toggleSelection = (key, current, value) => {
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    if (next.length) update(key, next);
  };
  const warning = (message) => message && <button type="button" className="slash-command-warning" data-tooltip={message} aria-label={message} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}><AlertTriangle size={11} /></button>;
  const options = Array.isArray(node.data?.options) ? node.data.options : [];
  return <div className="node-config node-config-stack slash-command-config">
    <label>
      <span className="slash-command-field-label">
        <span>Command</span>
        {warning(commandNameIssue, 'Command name issue')}
      </span>
      <CharacterLimit className="is-flex" value={node.data?.commandName ?? ''} maxLength={32}>
        <div>
          <b>/</b>
          <input value={node.data?.commandName ?? ''} maxLength={32} autoCapitalize="none" autoCorrect="off" spellCheck={false} onChange={(event) => update('commandName', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="help" aria-label="Slash command name" />
        </div>
      </CharacterLimit>
    </label>
    <label>
      <span className="slash-command-field-label">
        <span>Description</span>
        {warning(commandDescriptionIssue, 'Command description issue')}
      </span>
      <CharacterLimit value={node.data?.description ?? ''} maxLength={100}>
        <input value={node.data?.description ?? ''} maxLength={100} autoCapitalize="none" autoCorrect="off" spellCheck={false} onChange={(event) => update('description', event.target.value)} onPointerDown={(event) => event.stopPropagation()} placeholder="What this command does" aria-label="Slash command description" />
      </CharacterLimit>
    </label>
    <section className="slash-command-options-compact">
      <div>
        <strong>Arguments</strong>
        <span>{options.length}/25</span>
      </div>
      <button type="button" className="node-config-action node-config-studio-action is-static-hover" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.preventDefault(); event.stopPropagation(); onOpenSlashCommandStudio?.(node); }}><Plus size={12} /> Edit arguments</button>
    </section>
    <section className="slash-command-options-compact">
      <div>
        <strong>Who can use this command</strong>
        <span>{commandPermissionSummary}</span>
      </div>
      <button type="button" className="node-config-action node-config-studio-action is-static-hover" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.preventDefault(); event.stopPropagation(); onOpenPermissionStudio?.(node); }}><Plus size={12} /> Edit command permissions</button>
    </section>
    <details className="slash-command-availability">
      <summary>Installation and context</summary>
      <label className="slash-command-choice">
        <AnimatedCheckbox checked={usesAppDefaults} label="Use application defaults" onChange={(value) => update({ integrationTypes: value ? undefined : [0], contexts: value ? undefined : [0] })} onPointerDown={(event) => event.stopPropagation()} />
        <span>Use application defaults</span>
      </label>
      <div className={`slash-command-choice-list ${usesAppDefaults ? 'is-disabled' : ''}`}>
        <span className="slash-command-choice-heading">Installations</span>
        {[[0, 'Server install'], [1, 'User install']].map(([value, label]) =>
          <label className="slash-command-choice" key={value}>
            <AnimatedCheckbox checked={integrationTypes.includes(value)} label={label} disabled={usesAppDefaults} onChange={() => toggleSelection('integrationTypes', integrationTypes, value)} onPointerDown={(event) => event.stopPropagation()} />
            <span>{label}</span>
          </label>
        )}
        <span className="slash-command-choice-heading">Where it can be used</span>
        {[[0, 'Server channels'], [1, 'Bot DMs'], [2, 'Private channels']].map(([value, label]) =>
          <label className="slash-command-choice" key={value}>
            <AnimatedCheckbox checked={commandContexts.includes(value)} label={label} disabled={usesAppDefaults} onChange={() => toggleSelection('contexts', commandContexts, value)} onPointerDown={(event) => event.stopPropagation()} />
            <span>{label}</span>
          </label>
        )}
        <small>Private channels require user installation. The application must support each selected install type.</small>
      </div>
    </details>
  </div>;
}
