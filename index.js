const DEFAULT_THEMEID = "oreo";

function render() {
    let themename = document.getElementById("themename").value;
    let text = document.getElementById("text").value;
    let objects = document.getElementsByClassName("theme-objects")[0];
    let errimg = document.getElementsByClassName("theme-error")[0];
    let item;
    while (item = objects.firstChild) {
        objects.removeChild(item);
    }

    let theme = THEMES[themename];
    let items = theme["items"];
    let chunks = text.toLowerCase().split(new RegExp(items.map((i) => "(" + i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + ")")
        .join("|"), "gi")).filter(Boolean);
    if (theme["reverse"]) {
        chunks = chunks.reverse();
    }
    if (chunks.every((chunk) => items.includes(chunk))) {
        objects.style.overflow = "";
        objects.style.display = "block";
        errimg.style.display = "none";
        chunks.forEach((chunk, index) => {
            let element = document.createElement("img");
            element.src = "themes/" + themename + "/" + chunk + "." + theme["ext"];
            element.alt = "";
            element.style.zIndex = -index;
            element.style.visibility = "hidden";
            element.style.position = "relative";
            element.classList.add("theme-object", themename + "-theme");
            objects.appendChild(element);
            function onload() {
                element.style.marginBottom = element.clientHeight * (theme["space"] - 1) + "px";
                element.style.visibility = "";
            }
            if (element.clientHeight) {
                onload();
            } else {
                element.onload = onload;
            }
        });
    } else {
        objects.style.overflow = "hidden";
        objects.style.display = "none";
        errimg.style.display = "block";
    }
}

function setTheme() {
    document.getElementById("text").value = THEMES[document.getElementById("themename").value]["default"];
    render();
}

window.addEventListener("load", function () {
    let ddcontent = document.getElementById("themename");
    Object.keys(THEMES).forEach((themeid) => {
        let option = document.createElement("option");
        option.value = themeid;
        option.innerText = THEMES[themeid]["name"];
        option.addEventListener("click", function () {
            setTheme(themeid);
        });
        ddcontent.appendChild(option);
    });
    window.addEventListener("resize", render);
    document.getElementById("themename").value = DEFAULT_THEMEID;
    setTheme(DEFAULT_THEMEID);
});
