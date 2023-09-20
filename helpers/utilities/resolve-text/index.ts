import { encode } from 'html-entities';

/**
 * encode special characters to normal string
 *
 * @export
 * @param {string} string
 * @return {*}  {string}
 */
export function encodeString(string: string): string {
    return encode(string);
}

export const left_lt: string = encodeString('<');
export const right_gt: string = encodeString('>');
