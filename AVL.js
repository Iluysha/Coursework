'use strict';

//AVL tree

function Node(key, data, depth) {
  this.init(key, data, depth);
}

Node.prototype.init = function(key, data, depth) {
  this.key = key;
  this.data = data;
  this.left = null;
  this.right = null;
  this.parent = null;
  this.depth = depth;
};

function addHelper(key, data, node, depth) {
  if (key > node.key && node.right) {
    depth++;
    addHelper(key, data, node.right, depth);
  } else if
  (key < node.key && node.left) {
    depth++;
    addHelper(key, data, node.left, depth);
  } else if
  (key > node.key) {
    depth++;
    node.right = new Node(key, data, depth);
    node.right.parent = node;
  } else if
  (key < node.key) {
    depth++;
    node.left = new Node(key, data, depth);
    node.left.parent = node;
  } else
    console.log('This key is taken');
}

function add(key, data, node) {
  addHelper(key, data, node, 0);
  nodeBalance(node);
}

function find(key, node) {
  if (key === node.key) {
    console.log('Data: ' + node.data);
  } else if
  (key > node.key && node.right) {
    find(key, node.right);
  } else if
  (key < node.key && node.left) {
    find(key, node.left);
  } else
    console.log('No such key');
}


function delLeaf(node) {
  if (node.parent) {
    if (node.parent.left === node) {
      node.parent.left = null;
    } else if
    (node.parent.right === node) {
      node.parent.right = null;
    }
  } else
    node = null;
}

function delNode(node) {
  let temp = node;
  if (node.left) {
    temp = node.left;
    let flag = true;
    while (temp.right) {
      temp = temp.right;
      flag = false;
    }
    if (flag) {
      node.left = temp.left;
    }
  } else if
  (node.right) {
    temp = node.right;
    let flag = true;
    while (temp.left) {
      temp = temp.left;
      flag = false;
    }
    if (flag) {
      node.right = temp.right;
    }
  } else {
    delLeaf(node);
  }
  node.key = temp.key;
  node.data = temp.data;
  delLeaf(temp);
}

function delHelper(key, node) {
  if (key === node.key) {
    delNode(node);
  } else if
  (key > node.key && node.right) {
    delHelper(key, node.right);
  } else if
  (key < node.key && node.left) {
    delHelper(key, node.left);
  } else
    console.log('No such key');
}

function del(key, node) {
  delHelper(key, node);
  nodeBalance(node);
}

function maxHeight(node, height, startNode) {
  const distance = node.depth - startNode.depth + 1;
  height = (height < distance) ?  distance : height;
  height =  (node.right) ?
    maxHeight(node.right, height, startNode) : height;
  height =  (node.left) ?
    maxHeight(node.left, height, startNode) : height;
  return height;
}

function height(node) {
  return maxHeight(node, 0, node);
}

function depthDown(node) {
  node.depth--;
  if (node.left) depthDown(node.left);
  if (node.right) depthDown(node.right);
}

function depthUp(node) {
  node.depth++;
  if (node.left) depthDown(node.left);
  if (node.right) depthDown(node.right);
}

function isBalanced(node) {
  let flag = true;
  if (node) {
    const Rheight = node.right ? height(node.right) : 0;
    const Lheight = node.left ? height(node.left) : 0;
    const difference = Math.abs(Rheight - Lheight);
    if (node.right) {
      flag = isBalanced(node.right);
    } else if
    (node.left) {
      flag = isBalanced(node.left);
    }
    if (difference > 1) {
      flag = false;
    }
  }
  return flag;
}

function findDisbalance(node) {
  let temp = node;
  if (!isBalanced(node)) {
    const left = node.left;
    const right = node.right;
    if (!isBalanced(left)) {
      temp = findDisbalance(left);
    } else if
    (!isBalanced(right)) {
      temp = findDisbalance(right);
    }
  }
  return temp;
}

function rightRotate(node) {
  const temp = node.left;
  temp.parent = node.parent;
  node.left = temp.right;
  if (node.parent.left === node) {
    node.parent.left = temp;
  } else if
  (node.parent.right === node) {
    node.parent.right = temp;
  }
  node.parent = temp;
  temp.right = node;
  if (temp.left) depthDown(temp.left);
  if (node.right) depthUp(node.right);
  temp.depth--;
  node.depth++;
}

function leftRotate(node) {
  const temp = node.right;
  temp.parent = node.parent;
  node.right = temp.left;
  if (node.parent.left === node) {
    node.parent.left = temp;
  } else if
  (node.parent.right === node) {
    node.parent.right = temp;
  }
  node.parent = temp;
  temp.left = node;
  temp.right ? depthDown(temp.right) : true;
  node.left ? depthUp(node.left) : true;
  temp.depth--;
  node.depth++;
}

function nodeBalance(node) {
  const Rheight = node.right ? height(node.right) : 0;
  const Lheight = node.left ? height(node.left) : 0;
  const difference = Rheight - Lheight;
  if (difference > 0) {
    leftRotate(node);
  } else if
  (difference < 0) {
    rightRotate(node);
  }
}

//Usage

const root = new Node(7, 'seven', 0);
add(5, 'five');
add(4, 'four');
add(6, 'six');

console.log(root);
find(4);
del(6);
console.log(findDisbalance(root));
console.log(nodeBalance(root));
console.log(isBalanced(root));







