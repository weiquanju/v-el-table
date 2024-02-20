/**
 *
 * @param {string} componentName
 * @returns
 */
declare function resolver(componentName: string): {
    from: string;
    name: string;
} | undefined;
export default resolver;
