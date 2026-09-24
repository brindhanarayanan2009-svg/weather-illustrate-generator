const weatherInput = document.getElementById("weatherInput");
const generateBtn = document.getElementById("generateBtn");
const sampleBtn = document.getElementById("sampleBtn");
const downloadBtn = document.getElementById("downloadBtn");

const illustration = document.getElementById("illustration");
const status = document.getElementById("status");
const weatherLabel = document.getElementById("weatherLabel");
const sceneDescription = document.getElementById("sceneDescription");

let selectedDetail = "simple";
let currentWeather = "mixed";


/* =========================
   SAMPLE BUTTON
========================= */

sampleBtn.addEventListener("click", () => {

    weatherInput.value =
        "Today is a rainy day with dark clouds, cool wind and light rain.";

    weatherInput.focus();
});


/* =========================
   DETAIL BUTTONS
========================= */

document.querySelectorAll(".detail").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".detail")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedDetail = button.dataset.detail;

    });

});


/* =========================
   WEATHER DETECTION
========================= */

function detectWeather(text) {

    const words = text.toLowerCase();

    if (
        words.includes("snow") ||
        words.includes("snowy") ||
        words.includes("snowfall") ||
        words.includes("snowing") ||
        words.includes("blizzard") ||
        words.includes("freezing")
    ) {
        return "snow";
    }


    if (
        words.includes("rain") ||
        words.includes("rainy") ||
        words.includes("raining") ||
        words.includes("drizzle") ||
        words.includes("storm") ||
        words.includes("thunder")
    ) {
        return "rain";
    }


    if (
        words.includes("wind") ||
        words.includes("windy") ||
        words.includes("breeze") ||
        words.includes("gust")
    ) {
        return "wind";
    }


    if (
        words.includes("cloud") ||
        words.includes("cloudy") ||
        words.includes("overcast")
    ) {
        return "cloud";
    }


    if (
        words.includes("sun") ||
        words.includes("sunny") ||
        words.includes("sunshine") ||
        words.includes("hot") ||
        words.includes("heat")
    ) {
        return "sun";
    }


    return "mixed";
}


/* =========================
   GENERATE
========================= */

generateBtn.addEventListener("click", generateScene);


function generateScene() {

    const text = weatherInput.value.trim();

    if (!text) {

        status.textContent =
            "⚠️ Please enter a weather forecast first.";

        weatherInput.focus();

        return;
    }


    generateBtn.disabled = true;

    generateBtn.classList.add("loading");

    status.textContent =
        "🧠 Understanding your forecast...";


    setTimeout(() => {

        currentWeather = detectWeather(text);

        createScene(currentWeather, text);

        generateBtn.disabled = false;

        generateBtn.classList.remove("loading");

        downloadBtn.disabled = false;

        status.textContent =
            "✨ Weather scene generated!";

    }, 900);
}


/* =========================
   CREATE SCENE
========================= */

function createScene(weather, text) {

    let background;

    let title;

    let icon;


    if (weather === "sun") {

        background =
            "linear-gradient(#72cfff 0%, #d9f5ff 68%, #8dcc6e 68%)";

        title = "☀️ Sunny Day";

        icon = "☀️";
    }


    else if (weather === "rain") {

        background =
            "linear-gradient(#667f9c 0%, #a9bfd0 68%, #82b96b 68%)";

        title = "🌧️ Rainy Day";

        icon = "🌧️";
    }


    else if (weather === "snow") {

        background =
            "linear-gradient(#a8d7f0 0%, #edf9ff 68%, #eaf4f8 68%)";

        title = "🌨️ Snowy Day";

        icon = "❄️";
    }


    else if (weather === "cloud") {

        background =
            "linear-gradient(#a6c7d8 0%, #dceaf0 68%, #91c575 68%)";

        title = "☁️ Cloudy Day";

        icon = "☁️";
    }


    else if (weather === "wind") {

        background =
            "linear-gradient(#88d2f3 0%, #e2f8ff 68%, #91ca70 68%)";

        title = "💨 Windy Day";

        icon = "💨";
    }


    else {

        background =
            "linear-gradient(#7fd6f5 0%, #e3f7ff 68%, #8bc96d 68%)";

        title = "🌈 Mixed Weather";

        icon = "🌈";
    }


    illustration.style.background = background;


    weatherLabel.textContent =
        `${icon} ${title.replace(icon, "").trim()}`;


    sceneDescription.textContent =
        `${icon} ${title} · ${selectedDetail} illustration`;


    let html = "";


    /* CLOUDS */

    html += `
        <div class="weather-cloud cloud-a">☁️</div>
        <div class="weather-cloud cloud-b">☁️</div>
    `;


    /* SUN */

    if (weather === "sun" || weather === "mixed") {

        html += `
            <div class="sun">☀️</div>
        `;
    }


    /* RAIN */

    if (weather === "rain") {

        for (let i = 0; i < 70; i++) {

            const left =
                Math.random() * 100;

            const delay =
                Math.random() * 1.5;

            html += `
                <div
                    class="rain-drop"
                    style="
                        left:${left}%;
                        animation-delay:${delay}s;
                    "
                ></div>
            `;
        }
    }


    /* SNOW */

    if (weather === "snow") {

        for (let i = 0; i < 45; i++) {

            const left =
                Math.random() * 100;

            const delay =
                Math.random() * 4;

            const size =
                12 + Math.random() * 12;

            html += `
                <div
                    class="snowflake"
                    style="
                        left:${left}%;
                        animation-delay:${delay}s;
                        font-size:${size}px;
                    "
                >❄</div>
            `;
        }
    }


    /* WIND */

    if (weather === "wind") {

        html += `
            <div class="scene-message">
                💨 Cool wind is blowing!
            </div>
        `;
    }


    /* MAIN MESSAGE */

    if (weather !== "wind") {

        html += `
            <div class="scene-message">
                ${icon} ${title}
            </div>
        `;
    }


    /* LANDSCAPE */

    html += `
        <div class="landscape">

            <div class="tree">🌳</div>

            <div class="flowers">
                🌷 🌼
            </div>

            <div class="house">
                🏠
            </div>

            <div class="flowers">
                🌼 🌷
            </div>

            <div class="tree">🌳</div>

        </div>
    `;


    illustration.innerHTML = html;


    /* DETAIL MODE */

    if (selectedDetail === "simple") {

        document
            .querySelectorAll(".flowers")
            .forEach(item => {
                item.style.display = "none";
            });
    }


    if (selectedDetail === "detailed") {

        addExtraFlowers();
    }
}


/* =========================
   EXTRA DETAILS
========================= */

function addExtraFlowers() {

    for (let i = 0; i < 12; i++) {

        const flower =
            document.createElement("div");

        flower.textContent =
            Math.random() > .5
                ? "🌼"
                : "🌷";

        flower.style.position =
            "absolute";

        flower.style.bottom =
            `${Math.random() * 35 + 5}px`;

        flower.style.left =
            `${Math.random() * 100}%`;

        flower.style.fontSize =
            "18px";

        illustration.appendChild(flower);
    }
}


/* =========================
   DOWNLOAD SVG IMAGE
========================= */

downloadBtn.addEventListener("click", () => {

    if (!weatherInput.value.trim()) {
        return;
    }


    const text =
        weatherInput.value.trim();

    const weather =
        detectWeather(text);


    let icon = "🌈";

    if (weather === "sun") icon = "☀️";
    if (weather === "rain") icon = "🌧️";
    if (weather === "snow") icon = "❄️";
    if (weather === "cloud") icon = "☁️";
    if (weather === "wind") icon = "💨";


    const safeText =
        escapeXML(text);


    const svg = `
<svg
xmlns="http://www.w3.org/2000/svg"
width="1200"
height="800"
viewBox="0 0 1200 800"
>

<defs>

<linearGradient
id="sky"
x1="0"
y1="0"
x2="0"
y2="1"
>

<stop
offset="0%"
stop-color="#82d5f8"
/>

<stop
offset="68%"
stop-color="#e4f8ff"
/>

<stop
offset="68%"
stop-color="#8bc96d"
/>

</linearGradient>

</defs>


<rect
width="1200"
height="800"
fill="url(#sky)"
/>


<text
x="600"
y="180"
text-anchor="middle"
font-size="120"
>
${icon}
</text>


<text
x="600"
y="285"
text-anchor="middle"
font-family="Arial"
font-size="45"
font-weight="bold"
fill="#17324d"
>
WeatherArt Kids
</text>


<text
x="600"
y="355"
text-anchor="middle"
font-family="Arial"
font-size="32"
font-weight="bold"
fill="#17324d"
>
${escapeXML(getWeatherTitle(weather))}
</text>


<text
x="600"
y="430"
text-anchor="middle"
font-family="Arial"
font-size="24"
fill="#35556d"
>
${safeText}
</text>


<text
x="600"
y="660"
text-anchor="middle"
font-size="80"
>
🌳 🏠 🌷 🌼 🌳
</text>


<text
x="600"
y="730"
text-anchor="middle"
font-family="Arial"
font-size="22"
fill="#35556d"
>
Fun Weather Learning
</text>

</svg>
`;


    const blob =
        new Blob(
            [svg],
            {
                type: "image/svg+xml"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "weather-illustration.svg";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
});


/* =========================
   HELPERS
========================= */

function getWeatherTitle(weather) {

    if (weather === "sun")
        return "Sunny Day";

    if (weather === "rain")
        return "Rainy Day";

    if (weather === "snow")
        return "Snowy Day";

    if (weather === "cloud")
        return "Cloudy Day";

    if (weather === "wind")
        return "Windy Day";

    return "Mixed Weather";
}


function escapeXML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
