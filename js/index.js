"use strict";
const {decoding,encoding, getFrequency, createHUFFTable,compress_ratio_Huffman} = require("./huffman");
const {L_encoding,L_decoding,compress_ratio_LZW} = require("./lzw");
Object.defineProperty(exports, "__esModule", { value: true});
const selectAlgorithm = $("#althorithm");
const textArea=$("#input");
const buttonEncode=$("#encode");
const buttonDecode = $("#decode");
const table=$("#right" );
const compress_ratio=$("#compression-ratio");
let algorithm,encode,text,Hcodes,Lcodes;
buttonEncode.on("click",()=>{
    algorithm=String(selectAlgorithm.val());
    compress_ratio.empty();
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
    compress_ratio_Huffman(text,Hcodes);
}
function encodeLZW(){
    text=String(textArea.val());
    Lcodes=L_encoding(text);
    let out="";
    for (let i in Lcodes.output){
        out+=String(Lcodes.output[i]);  
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
    text=String(textArea.val());
    let result=L_decoding(text);
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
    var content=compress_ratio_Huffman(text,codes);
    compress_ratio.empty();
    compress_ratio.append(content);
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
    var content=compress_ratio_LZW(text,codes);
    compress_ratio.empty();
    compress_ratio.append(content);
};
// Khởi tạo một đối tượng hình ảnh mới
var img = new Image();

// Nạp hình ảnh
img.src = './icon.png';

// Xử lý khi hình ảnh được nạp hoàn tất
img.onload = function() {
  // Tạo canvas để đọc nội dung hình ảnh và chuyển đổi nó thành mảng
  var canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // imageData.data chứa tất cả các giá trị RGBA của từng pixel trong hình ảnh
  var pixels = imageData.data;

  // Lưu các giá trị RGBA của từng pixel vào một mảng
  var pixelArray = [];
  for (var i = 0; i < pixels.length; i += 4) {
    pixelArray.push([pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]]);
  }

  console.log(pixelArray);
};
