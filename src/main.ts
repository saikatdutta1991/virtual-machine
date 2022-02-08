import RandomAccessMemory from './random-access-memory';

const ram = new RandomAccessMemory(64);
ram.write(0, 100);
ram.write(31, 1);
ram.write(47, 1);
ram.write(63, 1);

// console.log(ram.read(1), ram.read(62));
console.log(ram.toString());
