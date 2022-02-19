export type ClickEventType = 'none' | 'open_url' | 'run_command' | 'suggest_command' | 'change_page' | 'copy_to_clipboard'

export const ClickEvent: Record<ClickEventType, ClickEventType> = {
  none: 'none',
  open_url: 'open_url',
  run_command: 'run_command',
  suggest_command: 'suggest_command',
  change_page: 'change_page',
  copy_to_clipboard: 'copy_to_clipboard',
}
