// Declare a dictionary of themes
const THEMES = {};

/*
Declaration of themes
[key]: theme id for theme

name: Readable name for theme
items: List of objects in theme
default: Default input when changing themes
ext: file extension for images (png)
space: negative margin-bottom percentage of height (0)
reverse: reverse the render order of objects (false)
*/
THEMES["oreo"] = {
    "name": "Oreo",
    "items": ["o", "re"],
    "default": "oreo",
    "ext": "svg",
    "space": 0.1
};
THEMES["reore"] = {
    "name": "Reore",
    "items": ["re", "o"],
    "default": "oreoreo",
    "ext": "svg",
    "space": 0.1
};
THEMES["hamburger"] = {
    "name": "Hamburger",
    "items": ["ham", "bur", "ger"],
    "default": "hamburger",
    "ext": "svg"
};
THEMES["egg"] = {
    "name": "Egg",
    "items": ["e", "gg"],
    "default": "egg",
    "ext": "svg",
    "space": 0.1,
    "reverse": true
};
THEMES["rickastley"] = {
    "name": "Rick Astley",
    "items": "rickastley".split(""),
    "default": "rickastley"
};

/*
Function to handle undefined attributes
If fallback is null (no fallback), throw ReferenceError
Otherwise, set the key to fallback
*/
function handleUndefined(theme, themename, key, fallback=null) {
    if (typeof theme[key] === "undefined") {
        if (fallback === null) {
            throw new ReferenceError(JSON.stringify(key) + " is required but not defined (" + JSON.stringify(themename) +")");
        } else {
            theme[key] = fallback;
        }
    }
}

// Process themes for runtime use
Object.keys(THEMES).forEach((themename) => {
    let theme = THEMES[themename];
    handleUndefined(theme, themename, "name");
    handleUndefined(theme, themename, "items");
    theme["items"] = theme["items"].sort((a, b) => b.length - a.length);
    handleUndefined(theme, themename, "default");
    handleUndefined(theme, themename, "ext", "png");
    handleUndefined(theme, themename, "space", 1);
    handleUndefined(theme, themename, "reverse", false);
});
