import { promises as fsPromises } from 'fs';

// Read text file, separating by line
const filename = 'input.txt';
const data = await fsPromises.readFile(filename, 'utf-8');
const arr = data.split(/\r?\n/);

let bottomIndex;
let stackCount;
let stacks = [];

// Find bottom of the initial state
for (let i = 0; i < arr.length; i++) {
  if (arr[i].charAt(1) === '1') { // Found row we are looking for, this could definitely be optimized
    bottomIndex = i - 1;
    stackCount = arr[i].charAt(arr[i].length - 2);
    break;
  }
}

// Initialize array of arrays
for (let i = 0; i < stackCount; i++) {
  stacks.push([]);
}

// Work from the bottom up for each stack
for (let i = bottomIndex; i >= 0; i--) {
  // Gonna have to use charAt
  for (let j = 0; j < stackCount; j++) {
    const crate = arr[i].charAt(j * 4 + 1);
    if (crate !== ' ') { // Push to queue
      stacks[j].push(crate);
    }
  }
}


// Go through the rest of the input
const commands = arr.slice(bottomIndex + 3);
commands.forEach(command => {
  const split = command.split(' ');
  // Only care about indicies 1, 3, and 5
  const count = parseInt(split[1]);
  const from = parseInt(split[3]) - 1;
  const to = parseInt(split[5]) - 1;

  // Execute the actual crate moving
  // This part is different in part 2
  // Need to use array slice rather than pop

  // Slice off the end of the from array
  const crates = stacks[from].splice(-count, count);

  // Add to the to array
  stacks[to] = stacks[to].concat(crates);
})

// Create answer string from final crate config
let answer = '';
for (const stack of stacks) {
  answer = answer.concat(stack.pop());
}

console.log('answer', answer);