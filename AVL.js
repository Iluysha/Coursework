'use strict';

//AVL tree

function Node(key, data, depth) {
    this.init(key, data, depth);
};

Node.prototype.init = function(key, data, depth) {
    this.key = key;
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.depth = depth;
};

function createTree(key, data) {
    root = new Node(key, data, 0);    //Создаем корень дерева
};

function addHelper(key, data, node, depth) {    //Рекурсивная функция, используется в add
    if(key > node.key && node.right){    //Переходим в правое поддерево 
        depth++;
    	addHelper(key, data, node.right, depth);
    }
    else if(key < node.key && node.left){    //Переходим в левое поддерево
    	depth++;
    	addHelper(key, data, node.left, depth);
    }
    else if(key > node.key){
        depth++;
    	node.right = new Node(key, data, depth); 
        node.right.parent = node;
    }
    else if(key < node.key){
        depth++;
    	node.left = new Node(key, data, depth);
        node.left.parent = node;
    }
    else{
        console.log("This key is taken");
    }
};

function add(key, data) {
    addHelper(key, data, root, 0);
    balance();
};

function findHelper(key, node) {    //Рекурсивная функция, используется в find
    if(key == node.key){
        console.log("Data: " + node.data);
    }
    else if(key > node.key && node.right){    //Переходим в правое поддерево 
    	findHelper(key, node.right);
    }
    else if(key < node.key && node.left){    //Переходим в левое поддерево
    	findHelper(key, node.left);
    }
    else{
        console.log("No such key");
    }
};

function find(key) {
    findHelper(key, root);
};

function delLeaf(node){
    if(node.parent){    
        if(node.parent.left == node){
            node.parent.left = null;    //Удаляем у отца ссылку на этот узел
        }
        else if(node.parent.right == node){
            node.parent.right = null;   //Удаляем у отца ссылку на этот узел
        }
    }
    else{
        root = null;
    }
};

function delNode(node){
    let temp = node;    //Узел который заменит node
    if(node.left){
        temp = node.left;
        let flag = true;
        while(temp.right){
            temp = temp.right;
            flag = false;    //Проверка, есть ли правый сын
        }
        if(flag){
            node.left = temp.left;
        }
    }
    else if(node.right){
        temp = node.right;
        let flag = true;
        while(temp.left){
            temp = temp.left;
            flag = false;    //Проверка, есть ли левый сын
        }
        if(flag){
            node.right = temp.right;
        }
    }
    else{    //Если нет сыновей, то это листок
        delLeaf(node);
    }
    node.key = temp.key;
    node.data = temp.data;
    delLeaf(temp);
};

function delHelper(key, node){
    if(key == node.key){
        delNode(node);
    }
    else if(key > node.key && node.right){    //Переходим в правое поддерево 
    	delHelper(key, node.right);
    }
    else if(key < node.key && node.left){    //Переходим в левое поддерево
    	delHelper(key, node.left);
    }
    else{
        console.log("No such key");
    }
};

function del(key){
    delHelper(key, root);
    balance();
};

function maxHeight(node, height, startNode){
    let distance = node.depth - startNode.depth + 1;
    height < distance ? height = distance : true;    //Высота равна максимальной глубине поддерева 
    height =  (node.right) ? maxHeight(node.right, height, startNode) : height;
    height =  (node.left) ? maxHeight(node.left, height, startNode) : height ;
    return height;
};

function height(node){
    return maxHeight(node, 0, node);
};

function heightOfTree(){
    console.log(maxHeight(root, 0, root));
};

function depthDown(node){
    node.depth--;
    node.left ? heightDown(node.left) : true;
    node.right ? heightDown(node.right) : true;
}

function depthUp(node){
    node.depth++;
    node.left ? heightDown(node.left) : true;
    node.right ? heightDown(node.right) : true;
}

function isBalanced(node){
    let flag = true; 
    if(node){
        let Rheight = node.right ? height(node.right) : 0;
        let Lheight = node.left ? height(node.left) : 0;
        let difference = Math.abs(Rheight - Lheight);
        if(node.right){    //Переходим в правое поддерево 
    	    flag = isBalanced(node.right);
        }
        else if(node.left){    //Переходим в левое поддерево
    	    flag = isBalanced(node.left);
        }
        if(difference > 1){
    	    flag = false;
        }
    }
    return flag;
};

function isBalancedTree(){
    return isBalanced(root);
};

function findDisbalance(node){
    let temp = node;
    if(!isBalanced(node)){
        let left = node.left;
        let right = node.right;
        if(left)
        if(!isBalanced(left)){
            temp = findDisbalance(left);
        }
        else if(!isBalanced(right)){
            temp = findDisbalance(right)
        }
    }
    return temp;
};

function rightRotate(node){
    let temp = node.left;
    temp.parent = node.parent;
    node.left = temp.right;
    if(!node.parent){
        root = temp;
    }
    else if(node.parent.left == node){
        node.parent.left = temp;
    }
    else if(node.parent.right == node){
        node.parent.right = temp;
    }
    node.parent = temp;
    temp.right = node;
    temp.left ? depthDown(temp.left) : true;
    node.right ? depthUp(node.right) : true;
    temp.depth--;
    node.depth++;
};

function leftRotate(node){
    let temp = node.right;
    temp.parent = node.parent;
    node.right = temp.left;
    if(!node.parent){
        root = temp;
    }
    else if(node.parent.left == node){
        node.parent.left = temp;
    }
    else if(node.parent.right == node){
        node.parent.right = temp;
    }
    node.parent = temp;
    temp.left = node;
    temp.right ? depthDown(temp.right) : true;
    node.left ? depthUp(node.left) : true;
    temp.depth--;
    node.depth++;
};

function nodeBalance(node){
   let Rheight = node.right ? height(node.right) : 0;
   let Lheight = node.left ? height(node.left) : 0;
   let difference = Rheight - Lheight;
   if(difference > 0){
       leftRotate(node);
   }
   else if(difference < 0){
       rightRotate(node);
   }
};

function balance(){
    nodeBalance(findDisbalance(root));
}

//Usage

let root;
createTree(7,"seven");
add(5, "five");
add(4, "four");
add(8, "six");

console.log(root);
heightOfTree();
console.log(isBalanced(root));
del(8);
//rightRotate(root);
console.log(root);
//heightOfTree();

//console.log(findDisbalance(root));
console.log(isBalanced(root));




