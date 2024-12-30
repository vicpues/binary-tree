module.exports = Tree;

function Tree(arr) {
    let root = _buildTree(arr);

    /** Prints a formatted version of the tree, starting at the root */
    function print() {
        _printRecursive(root);
    }

    /** Returns a tree whose root has the given value, or `null` if
     * it isn't present
     * @param {number} value
     */
    function find(value) {
        return _findNode(value, root);
    }

    /** Inserts the given value into the tree if it isn't already present
     * @param {number} value
     */
    function insert(value) {
        const newNode = new _Node(value);
        if (root === null) root = newNode;

        let current = root;
        let parent = null;
        while (current !== null) {
            parent = current;
            if (current.value > value) current = current.left;
            else if (current.value < value) current = current.right;
            else return root;
        }

        if (parent.value > value) parent.left = newNode;
        else parent.right = newNode;

        return root;
    }

    return {
        print,
        find,
        insert,
    };

    // PRIVATE METHODS

    /** Returns the root node of a new tree created from arr, or `null` if
     * the array is empty
     * @param {Array} arr The array from which to build the tree
     * @return {_Node | null}
     */
    function _buildTree(arr) {
        const unique = [...new Set(arr)];
        unique.sort((a, b) => a - b);
        return buildRecursive(0, unique.length - 1);

        function buildRecursive(start, end) {
            if (start > end) return null;

            const midpoint = start + Math.floor((end - start) / 2);
            const root = new _Node(unique[midpoint]);
            root.left = buildRecursive(start, midpoint - 1);
            root.right = buildRecursive(midpoint + 1, end);

            return root;
        }
    }

    /** Recursively finds the node with the given value, or null if not present
     * @param {number} value The value of the node to be found
     * @param {_Node} root Node from which to start the search
     */
    function _findNode(value, root) {
        if (root === null) return root;
        if (root.value > value) return _findNode(value, root.left);
        else if (root.value < value) return _findNode(value, root.right);
        else return root;
    }

    /** Prints a tree recursively, starting from \<node\> */
    function _printRecursive(node, prefix = "", isLeft = true) {
        if (node === null) return;
        if (node.right !== null) {
            _printRecursive(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false,
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            _printRecursive(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true,
            );
        }
    }
}

/** A node of a binary tree. */
function _Node(value, left = null, right = null) {
    return {
        value,
        left,
        right,
    };
}
