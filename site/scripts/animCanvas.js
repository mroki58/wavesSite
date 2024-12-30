const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

function animateFps(cb, fps = 60) {
    let now;
    let then = Date.now();
    let delta = 0;
    let interval = 1000 / fps;

    const update = () => {
        requestAnimationFrame(update);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            cb(); 
            then = now - (delta % interval);
        }
    }

    update();
}

const source1 = { x: 100, y: 75, frequency: 1, amplitude: 50 };
const source2 = { x: 200, y: 75, frequency: 1, amplitude: 50 };

const waveSpeed = 25;

function calculateWaveValue(x, y, source, time) {
    const distance = Math.sqrt((x - source.x) ** 2 + (y - source.y) ** 2);
    const phase = (distance / waveSpeed) - time * source.frequency;
    return source.amplitude * Math.sin(2 * Math.PI * phase);
}

function interpolate(x, y, time) {
    const wave1 = calculateWaveValue(x, y, source1, time);
    const wave2 = calculateWaveValue(x, y, source2, time);

    return wave1 + wave2;
}


function draw()
{
    const logicalWidth = canvas.width;
    const logicalHeight = canvas.height;


    const time = performance.now() / 1000; 
    const imageData = ctx.createImageData(logicalWidth, logicalHeight);

    for (let y = 0; y < logicalHeight; y++) {
        for (let x = 0; x < logicalWidth; x++) {
            const value = interpolate(x, y, time);

            const normalized = Math.floor(128 + 127 * (value / (source1.amplitude + source2.amplitude)));
            const index = (y * logicalWidth + x) * 4;

            imageData.data[index] = normalized;     // R 
            imageData.data[index + 1] = normalized; // G 
            imageData.data[index + 2] = normalized; // B
            imageData.data[index + 3] = 255; //alpha
        }
    }

    ctx.putImageData(imageData, 0, 0);

}

//draw();
animateFps(draw,60);


const sliders = document.getElementById("forAnimation");

sliders.d.addEventListener('input', () => {
    const distance = parseFloat(sliders.d.value);
    console.log(distance)
    let x = (300 - distance) / 2
    source1.x = x;
    source2.x = x + distance;
    console.log(source1, source2)
})

sliders.f1.addEventListener('input', () => {
    source1.frequency = parseFloat(sliders.f1.value);
})

sliders.f2.addEventListener('input', () => {
    source2.frequency = parseFloat(sliders.f2.value);
    console.log(source1, source2)
})

sliders.a1.addEventListener('input', () => {
    source1.amplitude = parseFloat(sliders.a1.value);
})


sliders.a2.addEventListener('input', () => {
    source2.amplitude = parseFloat(sliders.a2.value);
})




