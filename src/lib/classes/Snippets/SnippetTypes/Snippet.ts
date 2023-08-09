import type { ClickEventType } from '../ClickEvent';
import type { HoverEventType } from '../HoverEvent';
import type { Color } from '../../Color';

export type FieldType = 'string';

export interface FieldSpecifier {
	field: string;
	placeholder: string | null;
	datalistID: string | null;
	fieldType: FieldType;
}

export abstract class Snippet {
	id: string;

	bold = false;
	italic = false;
	underlined = false;
	strikethrough = false;
	obfuscated = false;

	font: string | null = null;

	color: Color = 'none';

	insertion = '';

	click_event_type: ClickEventType = 'none';
	click_event_value = '';

	hover_event_type: HoverEventType = 'none';
	hover_event_value = '';
	hover_event_children: Array<Snippet> = [];

	constructor(id: string | null = null) {
		if (id !== null) {
			this.id = id;
		} else {
			this.id = crypto.randomUUID();
		}
	}

	editor_fields(): Array<FieldSpecifier> {
		return [];
	}

	value(field: FieldSpecifier): string {
		return this[field.field] as string;
	}

	setBold(value: boolean): this {
		this.bold = value;
		return this;
	}

	setItalic(value: boolean): this {
		this.italic = value;
		return this;
	}

	setUnderlined(value: boolean): this {
		this.underlined = value;
		return this;
	}

	setStrikethrough(value: boolean): this {
		this.strikethrough = value;
		return this;
	}

	setObfuscated(value: boolean): this {
		this.obfuscated = value;
		return this;
	}

	setFont(value: string): this {
		this.font = value;
		return this;
	}

	setColor(value: Color): this {
		this.color = value;
		return this;
	}

	setInsertion(value: string): this {
		this.insertion = value;
		return this;
	}
}
