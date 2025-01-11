/**
 * Compile an object to SNBT
 * @param obj A JSON object to compile to SNBT
 */
export function compile(obj: any): string | undefined {
	if (obj === undefined || obj === null) {
		return obj;
	} else if (typeof obj === 'object') {
		if (Array.isArray(obj)) {
			return `[${obj.map(compile).join(',')}]`;
		} else {
			return `{${Object.entries(obj)
				.filter(([, value]) => value !== undefined)
				.map(([key, value]) => `${key}:${compile(value)}`)
				.join(',')}}`;
		}
	} else if (typeof obj === 'string') {
		return JSON.stringify(obj);
	} else if (typeof obj === 'number') {
		return compile_number(obj);
	} else if (typeof obj === 'boolean') {
		return obj ? 'true' : 'false';
	} else {
		console.warn(`Unknown type for SNBT: ${typeof obj}`);
		return obj.toString();
	}
}

/**
 * Compile to an SNBT string with the smallest data storage requirement
 *
 * - `-128` to `127` are stored as a byte (example: -20b)
 * - `-32,768` to `32,767` are stored as a short (example: 31415s)
 * - `-2,147,483,648` to `2,147,483,647` are stored as an int (example: 31415926)
 * - `-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807` are stored as a long (example: 81943198341l)
 * - All other numbers use doubles (example: 3.14159d)
 * @param obj
 * @returns
 */
function compile_number(val: number): string {
	if (Number.isInteger(val)) {
		if (val >= -128 && val <= 127) {
			return `${val}b`;
		} else if (val >= -32768 && val <= 32767) {
			return `${val}s`;
		} else if (val >= -2147483648 && val <= 2147483647) {
			return `${val}`;
		} else if (val >= -9223372036854775808 && val <= 9223372036854775807) {
			return `${val}l`;
		}
	}
	return `${val}d`;
}
