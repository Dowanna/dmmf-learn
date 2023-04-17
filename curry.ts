type Add = (a: number, b: number) => number;
const add: Add = (a: number, b: number) => a + b;

type CurryAdd = (a: number) => (b: number) => number;
const curryAdd: CurryAdd = (a: number) => (b: number) => a + b;

add(1, 2);
add(1, 4);
add(1, 10);

const add1 = curryAdd(1);
add1(2);
add1(4);
add1(10);
