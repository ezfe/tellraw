export type HoverEventType = 'none' | 'show_text' | 'show_item' | 'show_entity'

export const HoverEvent: Record<HoverEventType, HoverEventType> = {
	none: 'none',
	show_text: 'show_text',
	show_item: 'show_item',
	show_entity: 'show_entity',
}
