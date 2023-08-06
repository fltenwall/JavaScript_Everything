class TreeNode {
    public val:string | number
    public leftChild:TreeNode | null
    public rightChild:TreeNode | null
    constructor(val:string | number){
        this.val = val
        this.leftChild = null
        this.rightChild = null
    }
}

const createTree = (arr:string[] | number[]):TreeNode | null | undefined => { 
    // 创建二叉树
    let tree = new TreeNode(arr[0])
    let Nodes = [tree]
    let i = 1
    for (let node of Nodes){
        Nodes.push(node.leftChild = new TreeNode (arr[i]))
        i += 1
        if (i == arr.length) return tree
        Nodes.push(node.rightChild = new TreeNode(arr[i]))
        i += 1
        if (i == arr.length) return tree
    }
}
let datas = [5,3,7,2,4,6,8]
let tree:TreeNode = createTree(datas) as TreeNode
// console.info(tree)

// 前序遍历
function midOrderTree(node:TreeNode){
    if(node === null) return
    midOrderTree(node.leftChild!)
    // @ts-ignore
    res.push(node.val)
    midOrderTree(node.rightChild!)
}

const res:number[] | string[] = []
function findKValue(tree:TreeNode,k:number):number{
    midOrderTree(tree)
    return res[k-1] as number
}

console.log(findKValue(tree,3))