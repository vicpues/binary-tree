# Binary tree

A binary tree module for [The Odin Project's](https://www.theodinproject.com/lessons/javascript-binary-search-trees) fullstack javascript course.

Implemented as a factory function because why not. For simplicity, the tree only accepts numbers as values.

### Constructor:

-   `new Tree(arr)` - Creates a new tree instance. If an array `arr` is provided, the tree will be created using every unique value in the array. Otherwise, the tree will start empty.

### Instance methods:

-   `.print()` - Prints a visualisation of the tree to the console.
-   `.has(value)` - Returns `true` if the provided `value` exists within the tree, or `false` otherwise.
-   `.insert(value)` - Inserts the provided `value` into the tree without balancing it. If the tree already contains the value, does nothing.
-   `.remove(value)` - Removes the `value` if found inside the tree, and reorders surrounding nodes to maintain order.
-   `.levelOrder(callback)` - Traverses the tree in breadth-first order and calls the `callback` function with each value as an argument.
-   `.inOrder(callback)` - Traverses the tree depth-first, in-order, and calls the `callback` function with each value as an argument. This effectively yields every item from lowest to highest.
-   `.preOrder(callback)` - Traverses the tree depth-first, in pre-order, and calls the `callback` function with each value as an argument.
-   `.postOrder(callback)` - Traverses the tree depth-first, in post-order, and calls the `callback` function with each value as an argument.
-   `.isBalanced()` - Returns `true` if the tree is balanced, that is, if the left and right subtrees have the same height. Otherwise returns `false`.
-   `.rebalance()` - Rebalances the tree if it is unbalanced. This can be used to maintain O(log n) time complexity when accessing nodes.

## Production notes

This was **_a lot_** more time consuming than I expected. To be fair, the specification was a little confusing. I decided that the structure and nodes of the tree were an implementation detail, and that the tree would be a lot easier to use if I only exposed the value of each node.

Also, thank god for ES6 classes. Trying to write a module like this using only factories made everything a lot more confusing. Not to mention, it messed up the code completion on the testing script. Although that might be because my JSDoc isn't very good lol.
