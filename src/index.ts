export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export function optionalDeepMerge<T>(target: T, source: RecursivePartial<T>): T {
    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = target[key];

        if (typeof sourceValue === 'object' && typeof targetValue === 'object') {
            target[key] = optionalDeepMerge(targetValue, sourceValue);
        } else {
            target[key] = sourceValue as T[Extract<keyof T, string>];
        }
    }

    return target;
}