"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L_encoding=exports.L_decoding= void 0;
function L_encoding(text){
    var next=[],current=[],output=[],dictionary={};
    var code=256;
    var cur=text[0];
    for (let i=1; i<text.length;i++){
        if(dictionary[cur+text[i]]!=undefined){
            cur+=text[i];
        }
        else{
            next.push(text[i]);
            current.push(cur);
            if(cur.length>1){
                output.push(dictionary[cur]);
                dictionary[cur+text[i]]=code++;
            }
            else{
                output.push(cur.charCodeAt(0));
                dictionary[cur+text[i]]=code++;
            }
            cur=text[i];
        }
        if(i==text.length-1){
            current.push(cur);
            if(cur.length>1){
                output.push(dictionary[cur]);
            }
            else{
                output.push(cur.charCodeAt(0));
            }
        }
    }
    //current.push(last);
    //output.push(last.charCodeAt(0));

    return {
        current,
        output,
        next,
        dictionary
    }
}
exports.L_encoding=L_encoding
function L_decoding(codes,text){
    let t=0;
    let out="";
    let dict=Object.keys(codes);
    let val=Object.values(codes);
    for (let i=0; i<text.length;i++){
        t=t*10+parseInt(text[i],10);
        if(t<32){
        }
        else if(t<256){
            out+=String.fromCharCode(t);
            t=0;
        }
        else{
            if(val.includes(t)){
                out+=String(dict[val.indexOf(t)]);
                t=0;
            }
        }
    }
    return out;
}
exports.L_decoding=L_decoding;
