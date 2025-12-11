// ===== Canvas Setup =====

// Get the <canvas> element from the DOM
const canvas = document.getElementById("logoCanvas");

// Get the 2D drawing context
const ctx = canvas.getContext("2d");

// Set the CSS display size of the canvas
const CSS_W = 100;
const CSS_H = 100;

// Get the device pixel ratio (for Retina/HiDPI displays)
const DPR = window.devicePixelRatio || 1;

// Set the actual pixel buffer size of the canvas
canvas.width = CSS_W * DPR;
canvas.height = CSS_H * DPR;

// Scale the drawing context so 1 CSS pixel = 1 device pixel
ctx.scale(DPR, DPR);


// ===== Load Your SVG File =====

// Load an SVG file from a given path and return its text contents
async function loadSVG(path) {
    const res = await fetch(path);     // Fetch the SVG file over HTTP
    return await res.text();           // Convert the response to raw SVG text
}


// recolor the SVG (changes ALL fills from blue to your color)
// Uses regex to replace #0068B5 anywhere in the SVG string
function recolor(svg, color) {
    return svg.replace(/#0068B5/gi, color);
}


// ===== Draw SVG as an Image on Canvas =====

// Converts the SVG string → Blob → ObjectURL → HTMLImageElement,
// waits until it loads, then draws it onto the canvas
async function drawSVG(svgString) {

    // Convert SVG text into a binary Blob that the browser can treat like a file
    const blob = new Blob([svgString], { type: "image/svg+xml" });

    // Create a temporary URL pointing to that Blob
    const url = URL.createObjectURL(blob);

    // Create an <img> element that will load the SVG
    const img = new Image();

    // Wait until browser finishes loading the SVG image
    await new Promise((resolve) => {
        img.onload = resolve;
        img.src = url;
    });

    // Clear whatever was previously drawn on the canvas
    ctx.clearRect(0, 0, CSS_W, CSS_H);

    // Calculate a uniform scale so the SVG fits inside the CSS canvas size
    const scale = Math.min(CSS_W / img.width, CSS_H / img.height);

    // Compute the scaled width and height
    const w = img.width * scale;
    const h = img.height * scale;

    // Draw the image centered in the canvas
    ctx.drawImage(
        img,
        (CSS_W - w) / 2,     // center offset X
        (CSS_H - h) / 2,     // center offset Y
        w,
        h
    );

    // Release the temporary URL to avoid memory leaks
    URL.revokeObjectURL(url);
}


// ===== MAIN LOGIC =====

// Holds the original unmodified SVG text
let baseSVG;

// Immediately-invoked async function
(async () => {

    // Load SVG file once at startup
    baseSVG = await loadSVG("img/Intel-02.svg");

    // Draw the original blue version first
    await drawSVG(baseSVG);

})();