const BinaryTree = require("./binary-tree");

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new BinaryTree(array);

tree.insert(70);
tree.remove(8);
tree.print();
const callback = (value) => console.log(value);
tree.inOrder(callback);
