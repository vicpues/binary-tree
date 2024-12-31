const BinaryTree = require("./binary-tree");

const array = [];
while (array.length < 20) array.push(Math.floor(Math.random() * 100));
const tree = new BinaryTree(array);

tree.print();
console.log(tree.isBalanced()); // true

allOrders(); // Last printout should be all the values from low to high.

const newValues = [];
while (newValues.length < 6)
    newValues.push(Math.floor(Math.random() * 100) + 100);
newValues.forEach((value) => tree.insert(value));
tree.print();
console.log(tree.isBalanced()); // false

tree.rebalance();
tree.print();
console.log(tree.isBalanced()); // true
console.log();

allOrders(); // Last printout should be all the values from low to high.

/** Prints every value in the tree in level order, then preorder, then
 * postorder, and finally inorder.
 */
function allOrders() {
    const printValue = (value) => console.log(value);
    tree.levelOrder(printValue);
    console.log();
    tree.preOrder(printValue);
    console.log();
    tree.postOrder(printValue);
    console.log();
    tree.inOrder(printValue); // All the nodes from low to high
    console.log();
}
