const keyCode = document.querySelector("#key-code");
const key = document.querySelector("#key");
const detailKey = document.querySelector("#detail-key");
const detailCode = document.querySelector("#detail-code");
let previousKey = ""; 

addEventListener("keydown", (event) => {
    if (event.key == " ") {
        key.innerHTML = "SPACE ";
    }
    else if (event.code =="Backslash" && previousKey == "SHIFT") {
        key.innerHTML = "£";
    }
    else if (event.code =="Backslash") {
        key.innerHTML = "`";
    }
    else if (event.code =="BracketLeft" && previousKey == "SHIFT") {
        key.innerHTML = "¨";
    }
    else if (event.code =="BracketLeft") {
        key.innerHTML = "^";
    }
    else {
        key.innerHTML = (event.key).toUpperCase(); 
    }

    previousKey = key.innerHTML;
    keyCode.innerHTML = event.keyCode; 

    detailKey.innerHTML = `Key : ${key.innerHTML}`;
    detailCode.innerHTML = `Code : ${keyCode.innerHTML}`;
}); 