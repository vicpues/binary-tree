const BinaryTree = require("./binary-tree");

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new BinaryTree(array);

tree.print();
console.log(tree.has(7));
tree.remove(7);
tree.print();
console.log(tree.has(7));
