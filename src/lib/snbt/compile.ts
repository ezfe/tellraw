/**
 * Compile an object to SNBT
 * @param obj A JSON object to compile to SNBT
 */
export function compile(obj?: object | string | number | boolean): string | undefined {
	if (obj === undefined || obj === null) {
		return undefined;
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
function compile_number(val: number | bigint): string {
	if (typeof val == 'bigint' || Number.isInteger(val)) {
		const big_int = BigInt(val);
		if (big_int >= -128n && big_int <= 127n) {
			return `${big_int}b`;
		} else if (big_int >= -32768n && big_int <= 32767n) {
			return `${big_int}s`;
		} else if (big_int >= -2147483648n && big_int <= 2147483647n) {
			return `${big_int}`;
		} else if (big_int >= -9223372036854775808n && big_int <= 9223372036854775807n) {
			return `${big_int}l`;
		}
	}
	return `${val}d`;
}
