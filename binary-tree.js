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
            else return root; // Node already exists
        }

        if (parent.value > value) parent.left = newNode;
        else parent.right = newNode;

        return root;
    }

    /** Removes the given value from the tree, if present
     * @param {number} value
     */
    function remove(value) {
        return _removeRecursive(value, root);
    }

    /** Traverses the tree in level order, and calls callback with the
     * value of each node as an argument.
     * @param {Function} callback A callback with 0 or 1 parameters
     */
    function levelOrder(callback) {
        _checkCallback(callback);
        if (root === null) return;

        const queue = new _Queue();
        queue.enqueue(root);

        while (!queue.isEmpty()) {
            const node = queue.dequeue();
            callback(node.value);
            if (node.left !== null) queue.enqueue(node.left);
            if (node.right !== null) queue.enqueue(node.right);
        }
    }

    /** Traverses the tree inorder, and calls callback with the
     * value of each node as an argument.
     * @param {Function} callback A callback with 0 or 1 parameters
     */
    function inOrder(callback) {
        _checkCallback(callback);
        if (root === null) return;
        _inOrderRecursive(root);

        function _inOrderRecursive(root) {
            if (root.left !== null) _inOrderRecursive(root.left);
            callback(root.value);
            if (root.right !== null) _inOrderRecursive(root.right);
        }
    }

    /** Traverses the tree in preorder, and calls callback with the
     * value of each node as an argument.
     * @param {Function} callback A callback with 0 or 1 parameters
     */
    function preOrder(callback) {
        _checkCallback(callback);
        if (root === null) return;
        _preOrderRecursive(root);

        function _preOrderRecursive(root) {
            callback(root.value);
            if (root.left !== null) _preOrderRecursive(root.left);
            if (root.right !== null) _preOrderRecursive(root.right);
        }
    }

    /** Traverses the tree in postorder, and calls callback with the
     * value of each node as an argument.
     * @param {Function} callback A callback with 0 or 1 parameters
     */
    function postOrder(callback) {
        _checkCallback(callback);
        if (root === null) return;
        _postOrderRecursive(root);

        function _postOrderRecursive(root) {
            if (root.left !== null) _postOrderRecursive(root.left);
            if (root.right !== null) _postOrderRecursive(root.right);
            callback(root.value);
        }
    }

    return {
        print,
        find,
        insert,
        remove,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
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

        function buildRecursive(start, end, parent = null) {
            if (start > end) return null;

            const midpoint = start + Math.floor((end - start) / 2);
            const root = new _Node(unique[midpoint]);
            root.parent = parent;
            root.left = buildRecursive(start, midpoint - 1, root);
            root.right = buildRecursive(midpoint + 1, end, root);

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

    /** Removes the value, starting the search from root
     * @param {number} value The value of the node to remove
     * @param {_Node} start Node from which to start the search
     * @returns {_Node | null}
     */
    function _removeRecursive(value, start) {
        const node = _findNode(value, start);

        // Case: Node not found
        if (node === null) return root;

        const parent = node.parent;
        const isRoot = parent === null;
        const isLeftChild = isRoot ? false : parent.left === node;

        // Case: Node has 0 children (it's a leaf node)
        if (node.left === null && node.right === null) {
            if (isRoot) return _setRoot(null);
            if (isLeftChild) parent.left = null;
            else parent.right = null;
        }

        // Case: Node has 2 children
        else if (node.left !== null && node.right !== null) {
            let successor = node.right;
            while (successor.left !== null) successor = successor.left;
            node.value = successor.value;
            _removeRecursive(node.value, node.right);
        }

        // Case: Node has 1 child
        else {
            const child = node.left !== null ? node.left : node.right;
            if (isRoot) return _setRoot(child);
            if (isLeftChild) parent.left = child;
            else parent.right = child;
        }

        return root;
    }

    /** Sets the tree's root to a different Node
     * @param {_Node | null} toNode The new root of the tree, or null to clear the tree
     */
    function _setRoot(toNode) {
        root = toNode;
        return root;
    }

    /** Returns the height of a node, the distance from a node to the furthest
     * leaf that can be reached from it.
     * @param {_Node | null} node The node from which to start the search
     * @returns {number}
     */
    function _height(node) {
        if (node === null) return 0;
        const leftHeight = _height(node.left);
        const rightHeight = _height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    /** Checks that callback is a function with 0 or 1 parameters, and throws
     * a TypeError if it isn't
     * @param {Function} callback The function to be checked
     */
    function _checkCallback(callback) {
        if (typeof callback !== "function") {
            throw new TypeError("Must provide a callback function!");
        }
        if (callback.length > 1) {
            throw new TypeError("Callback must accept 0 or 1 arguments");
        }
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
function _Node(value, parent = null, left = null, right = null) {
    return {
        value,
        parent,
        left,
        right,
    };
}

/** A basic doubly linked list, useful for level order traversal of the tree */
function _Queue() {
    let _head = null;
    let _tail = null;

    /** A node of the queue, with `value` and references to the next and
     * previous elements */
    function _QueueNode(value) {
        return {
            value,
            next: null,
            prev: null,
        };
    }

    /** Adds a value at the end of the queue */
    function enqueue(value) {
        const node = new _QueueNode(value);
        if (isEmpty()) {
            _head = node;
            _tail = node;
            return;
        }
        _tail.next = node;
        node.prev = _tail;
        _tail = node;
    }

    /** Pops the first item in the queue and return its value */
    function dequeue() {
        if (isEmpty()) throw new Error("Can't dequeue, the queue is empty");
        const value = _head.value;
        _head = _head.next;
        if (!isEmpty()) _head.prev = null;
        return value;
    }

    /** Returns `true` if the queue is empty, otherwise returns `false` */
    function isEmpty() {
        return _head === null;
    }

    return {
        enqueue,
        dequeue,
        isEmpty,
    };
}
