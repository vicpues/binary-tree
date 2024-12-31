const BinaryTree = require("./binary-tree");

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new BinaryTree(array);

tree.print();
console.log(tree.isBalanced());
tree.remove(1);
tree.remove(3);
tree.remove(7);
tree.remove(5);
console.log(tree.isBalanced());
tree.remove(4);
tree.print();
console.log(tree.isBalanced());
