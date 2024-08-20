import h from '../scripts/hours.json';

export const getDfaultHoursLashes = (): string[] => {
    let hs: string[] = [];
    let s = h.start;
    let e = h.end;
    while (s < e) {
        hs = [
            `${s.toString().length === 1 ? `0${s.toString()}` : s.toString()}:00`,
            ...hs
        ];
        s += 3;
    }
    return hs.reverse();
};

export const getDfaultHoursBrows = (): string[] => {
    let hs: string[] = [];
    let s = h.start;
    let e = h.end;
    while (s < e) {
        hs = [
            `${s.toString().length === 1 ? `0${s.toString()}` : s.toString()}:00`,
            ...hs
        ];
        s += 2;
    }
    return hs.reverse();
};

export const getDfaultHoursNails = getDfaultHoursBrows;
