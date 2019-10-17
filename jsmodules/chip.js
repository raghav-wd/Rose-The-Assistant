function chip(txt, side, read) {
    if (typeof (txt) === "undefined") {
        console.log("undefined ignored");
        return;
    }
    var side = (side == 0) ? "" : "right";
    var color = (side == 0) ? "pink" : "";
    var ren = document.getElementById("chatScreen");
    if (read == 1) say(txt);

    function dontWrite(str) {
        var open = str.indexOf("{|");
        var end = str.indexOf("|}");
        str = str.replace("{|", '')
        str = str.replace("|}", '')
        if (open != -1 && end != -1)
            return dontWrite(str);
        else return str
    }
    txt = dontWrite(txt)
    ren.innerHTML += `<tr>
                    <td></td>
                    <td class="${side}"><div style="background-color: ${color}" class="chip">${txt}</div></td>
                </tr>`;
}