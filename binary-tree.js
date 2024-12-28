module.exports = Tree;

function Tree() {
    return {};
}

/** A node of a binary tree. */
function _Node(value, left = null, right = null) {
    return {
        value,
        left,
        right,
    };
}
