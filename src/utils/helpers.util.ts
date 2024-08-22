export const isNullOrUndefined = (param: any): boolean => {
    return param === undefined || param === null || (param as string) === '';
};
