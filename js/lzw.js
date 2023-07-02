"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L_encoding=exports.L_decoding= exports.compress_ratio_LZW=void 0;
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

    return {
        current,
        output,
        next,
        dictionary
    }
}
exports.L_encoding=L_encoding
function L_decoding(text){
    let t=0;
    let out="";
    var dict={};
    var last;
    var code=256;
    for (let i=0;i<text.length;i++){
        t=t*10+parseInt(text[i],10);
        console.log(t," " ,last);
        if(t<32){}
        else if(t<256){
            var c=String.fromCharCode(t);
            if(last!=undefined){
                dict[code++]=last+c;
            }
            last = c;
            out+=last;
            t=0;
        }else{
            if(last==undefined){}
            else{
                if(dict[t]==undefined){
                    let cur=last+last[0];
                    last=cur;
                    out+=cur;
                    dict[t]=cur;
                    t=0;
                }else{
                    let cur=dict[t];
                    out+=cur;
                    dict[code++]=last+cur[0];
                    last=cur;
                    t=0;
                }
            }
        }
    }

    return out;
}
exports.L_decoding=L_decoding;
function compress_ratio_LZW(text,codes){
    let before=text.length*8;
    let after=0;
    for (let i=0;i<codes.output.length;i++){
        let t=codes.output[i];
        console.log(t);
        if(t<256){
            after+=8;
        }
        else
            after+=t.toString(2).length;
        
        console.log(t.toString(2).length);
    }

    let CR=(before)/after;
    let content='Length of input string: ' + text.length
            +'<br> Total bits: '+ before
            +'<br> Total bits after compress: ' + after 
            +'<br> Compress ratio: '+ CR.toFixed(2)
            +'<br> Space Savings: '+ ((1-1/CR)*100).toFixed(2) + "%";
return content;
}
exports.compress_ratio_LZW=compress_ratio_LZW;
