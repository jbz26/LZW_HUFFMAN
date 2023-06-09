"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTree = exports.getFrequency = exports.createCode=exports.encoding =exports.decoding= void 0;
function getFrequency(text){
    let freq = new Map();
    for(let  i=0; i<text.length;i++){
        if(freq.has(text[i])){
            freq.set(text[i],freq.get(text[i])+1);
        }
        else{
            freq.set(text[i],1);
        }
    }
    return Array.from(freq).sort((a, b) => b[1] - a[1]);
}
exports.getFrequency=getFrequency;
function createNode(node1, node2){
    let node = {
        labels:node1.labels.concat(node2.labels),
        frequency:node1.frequency+node2.frequency,
        childs:[node1,node2]
    }
    return node;
}
exports.createNode=createNode;
function createTree(frequencyArr) {
    let arr1 = frequencyArr.map((item) => ({
        labels: [item[0]],
        frequency: item[1],
        childs: [],
    }));
    let min1;
    let min2;
    let node;
    while (arr1.length > 2) {
        min1 = searchMinFreqNode(arr1);
        arr1.splice(arr1.indexOf(min1), 1);
        min2 = searchMinFreqNode(arr1);
        arr1.splice(arr1.indexOf(min2), 1);
        node = createNode(min1, min2);
        arr1.push(node);
    }
    return createNode(arr1[0], arr1[1]);
}
exports.createTree=createTree;

function searchMinFreqNode(arr){
    let min=0;
    for (let i=0;i<arr.length;i++){
        if (arr[min].frequency>=arr[i].frequency){
            min=i;
        }
    }
    return arr[min];
}
function createCode(token,tree){
    let ttree=tree;
    let code="";
    while(ttree){        
        if(ttree.labels &&ttree.labels.includes(token)) {
            {   
                if(ttree.childs[0].labels.includes(token)){
                    code+="0";
                    ttree=ttree.childs[0];
                }
                else{
                    code+="1";
                    ttree=ttree.childs[1];
                }
                if(ttree.childs.length==0)
                return code;
              }
        }
        else
        return false;
    }
    return code;
}
exports.createCode=createCode;
function createHUFFTable(text){
    const frequencyArr = getFrequency(text);
    const tree=createTree(frequencyArr);
    const tokens=frequencyArr.map(item=>item[0]);
    if(tokens.length<=1)
        return false;
    let result1=new Map();
    tokens.forEach(element => {
        result1.set(element,createCode(element,tree))
    });
    return result1;
}
exports.createHUFFTable=createHUFFTable;

function encoding(code,text){
    let s="";
    for (let i=0; i<text.length;i++){
        if(code.has(text[i])){
            s+=code.get(text[i]);
        }
        else "";
    }
    return s;
}
exports.encoding=encoding;
function decoding(codes,text){
    let s="";
    let temp="";
    for(let i=0; i<text.length;i++){
        temp+=text[i];
        codes.forEach((token,code)=>{
            if(temp==token){
                s+=code;
                temp="";
            }
        });
    }
    return s;
}
exports.decoding=decoding;