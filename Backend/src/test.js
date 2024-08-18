const item = {name: 'maor', age: 5678, date: new Date(25-12-2012)}

const stringfy = JSON.stringify(item)
console.log(stringfy);
console.log(JSON.parse(stringfy));