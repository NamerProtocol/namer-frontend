export const truncateNumbers = (str: string) => {
    const split = str.split('.');

    const [_, decimals = ''] = split;
    const base = split.shift()?.split('').reverse();

    if (!base) {
        return str;
    }

    const truncatedResult = base.reduce(
        (acc: any, el) => {
            if (acc.counter === 3) {
                acc.arr = [...acc.arr, ' ', el];
                acc.counter = 1;
            } else {
                acc.arr.push(el);
                acc.counter = acc.counter + 1;
            }

            return acc;
        },
        {
            counter: 0,
            arr: [],
        },
    );

    return `${truncatedResult.arr.reverse().join('')}${
        decimals ? '.' : ''
    }${decimals}`;
};
