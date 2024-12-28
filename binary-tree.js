module.exports = Tree;

function Tree() {
    return {};
}

function _Node(value, left = null, right = null) {
    return {
        value,
        left,
        right,
    };
}
