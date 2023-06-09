"use strict";
const {decoding,encoding, getFrequency, createHUFFTable } = require("./huffman");
const {L_encoding,L_decoding} = require("./lzw");
Object.defineProperty(exports, "__esModule", { value: true});
const selectAlgorithm = $("#althorithm");
const textArea=$("#input");
const buttonEncode=$("#encode");
const buttonDecode = $("#decode");
const table=$("#right" );
let algorithm,encode,text,Hcodes,Lcodes;
buttonEncode.on("click",()=>{
    algorithm=String(selectAlgorithm.val());
    switch(algorithm){
        case "huffman":
            encodeHuffMan();
            break;
        case "lzw":
            encodeLZW();
            break;
    }
})
function encodeHuffMan(){
    text=String(textArea.val());
    Hcodes= createHUFFTable(text);
    encode=encoding(Hcodes,text);
    textArea.val(encode)
    showTableOfHuffman(text,Hcodes);
}
function encodeLZW(){
    text=String(textArea.val());
    Lcodes=L_encoding(text);
    let out="";
    for (let i in Lcodes.output){
        out+=String(Lcodes.output[i]);
        console.log(Lcodes.output[i]);
    }
    textArea.val(out);
    showTableOfLZW(Lcodes);
}
buttonDecode.on("click",()=>{
    algorithm=String(selectAlgorithm.val());
    switch(algorithm){
        case "huffman":
            decodeHuffMan();
            break;
        case "lzw":
            decodeLZW();
            break;
    }
})
function decodeHuffMan(){
    if(!Hcodes)
        alert("HuffMan table is empty!");
    text=String(textArea.val());
    let result=decoding(Hcodes,text);
    textArea.val(result);
}
function decodeLZW(){
    if(!Lcodes)
        alert("LZW table is empty!");
    text=String(textArea.val());
    let result=L_decoding(Lcodes.dictionary,text);
    console.log(Lcodes);
    textArea.val(result);
}
function showTableOfHuffman(text,codes) {
    let frequencyArr = getFrequency(text);
    let html = "<tr><th>Character</th><th>Frequency</th><th>Code</th></tr>";
    for (let i = 0; i < frequencyArr.length; i++) {
        html += `
                    <tr>
                        <td>${frequencyArr[i][0]}</td>
                        <td>${frequencyArr[i][1]}</td>
                        <td>${codes.get(frequencyArr[i][0])}</td>
                    </tr>
        `;
    }
    table.show();
    $("#right table").empty();
    $("#right table").append(html);
};
function showTableOfLZW(codes){
    let html = "<tr><th>Current</th><th>Output</th><th>Next</th><th>Code</tr>";
    let i=0;
    let dict=Object.keys(codes.dictionary);
    let val=Object.values(codes.dictionary);
    for (i;i<dict.length;i++){
            html += `
                        <tr>
                            <td>${codes.current[i]}</td>
                            <td>${codes.output[i]}</td>
                            <td>${codes.next[i]}</td>
                            <td>${dict[i]}:${val[i]}</td>
                        </tr>
            `;
    }
    html += `
        <tr>
            <td>${codes.current[i]}</td>
            <td>${codes.output[i]}</td>
            <td>${""}</td>
            <td>${""}</td>
        </tr>
    `;
    table.show();
    $("#right table").empty();
    $("#right table").append(html);
};
