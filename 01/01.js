import fs from 'fs';

const data = fs.readFileSync('input', 'utf8').split('\n').map(Number).map((e,i,arr)=> {
  if(i===0) {
    return null;
  }
  if(e>arr[i-1]) {
    return 1;
  } else {
    return -1;
  }
}).filter(e => e === 1);

console.log(data.length)

