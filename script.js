const weatherInput = document.getElementById("weatherInput");
const generateBtn = document.getElementById("generateBtn");
const sampleBtn = document.getElementById("sampleBtn");
const downloadBtn = document.getElementById("downloadBtn");
const illustration = document.getElementById("illustration");
const status = document.getElementById("status");


/* SAMPLE */

sampleBtn.addEventListener("click", () => {

    weatherInput.value =
        "Today is a rainy day with dark clouds and cool wind.";

    weatherInput.focus();

});


/* WEATHER DETECTION */

function detectWeather(text) {

    const words = text.toLowerCase();

    if (
        words.includes("rain") ||
        words.includes("rainy") ||
        words.includes("drizzle") ||
        words.includes("storm")
    ) {
        return "rain";
    }

    if (
        words.includes("snow") ||
        words.includes("snowy") ||
        words.includes("snowfall") ||
        words.includes("cold")
    ) {
        return "snow";
    }

    if (
        words.includes("cloud") ||
        words.includes("cloudy") ||
        words.includes("overcast")
    ) {
        return "cloud";
    }

    if (
        words.includes("wind") ||
        words.includes("windy") ||
        words.includes("breeze")
    ) {
        return "wind";
    }

    if (
        words.includes("sun") ||
        words.includes("sunny") ||
        words.includes("hot") ||
        words.includes("heat")
    ) {
        return "sun";
    }

    return "mixed";
}


/* GENERATE */

function generateIllustration() {

    const text = weatherInput.value.trim();

    if (!text) {

        status.textContent =
            "⚠️ Please enter a weather forecast.";

        return;
    }

    generateBtn.disabled = true;

    status.textContent =
        "✨ Understanding the weather...";

    setTimeout(() => {

        const weather = detectWeather(text);

        showWeather(weather, text);

        status.textContent =
            "✅ Your weather illustration is ready!";

        generateBtn.disabled = false;

        downloadBtn.disabled = false;

    }, 700);
}


/* SHOW ILLUSTRATION */

function showWeather(weather, text) {

    let background;
    let sky;
    let mainIcon;
    let ground;
    let message;


    if (weather === "sun") {

        background =
            "linear-gradient(#7fd8ff 0%, #bdeaff 65%, #9ed66f 65%)";

        mainIcon = "☀️";

        sky = "☁️";

        ground = "🌳 🌼 🏡 🌼 🌳";

        message = "☀️ Sunny day!";

    }


    else if (weather === "rain") {

        background =
            "linear-gradient(#7895b5 0%, #9bb0c5 65%, #8fc56f 65%)";

        mainIcon = "🌧️";

        sky = "☁️ ☁️ ☁️";

        ground = "🌳 ☂️ 🏡 🌷 🌳";

        message = "🌧️ Rainy day!";

    }


    else if (weather === "snow") {

        background =
            "linear-gradient(#a9d9f5 0%, #d9efff 65%, #f3f9ff 65%)";

        mainIcon = "❄️";

        sky = "☁️ ❄️ ☁️";

        ground = "🌲 ⛄ 🏠 🌲";

        message = "❄️ Snowy day!";

    }


    else if (weather === "cloud") {

        background =
            "linear-gradient(#a9cee0 0%, #c7e1ec 65%, #9dce78 65%)";

        mainIcon = "☁️";

        sky = "☁️ ☁️ ☁️";

        ground = "🌳 🏡 🌼 🌳";

        message = "☁️ Cloudy day!";

    }


    else if (weather === "wind") {

        background =
            "linear-gradient(#9bd9f5 0%, #d0efff 65%, #9ccd72 65%)";

        mainIcon = "💨";

        sky = "☁️ ➡️ ☁️";

        ground = "🌳 🍃 🏡 🍃 🌳";

        message = "💨 Windy day!";

    }


    else {

        background =
            "linear-gradient(#a9ddf7 0%, #d5f0ff 65%, #a8d87a 65%)";

        mainIcon = "🌈";

        sky = "☀️ ☁️";

        ground = "🌳 🌈 🏡 🌷 🌳";

        message = "🌈 Mixed weather!";

    }


    illustration.style.background = background;


    illustration.innerHTML = `

        <div
            class="big-icon"
            style="
                font-size: 85px;
                animation: floatIcon 2s ease-in-out infinite;
            "
        >
            ${mainIcon}
        </div>


        <div
            class="clouds"
            style="font-size: 45px;"
        >
            ${sky}
        </div>


        <div
            style="
                position:absolute;
                top:145px;
                left:50%;
                transform:translateX(-50%);
                font-size:25px;
                white-space:nowrap;
            "
        >
            ${message}
        </div>


        <div
            class="land"
            style="font-size:42px;"
        >
            ${ground}
        </div>


        <div class="preview-message">

            <strong>${message}</strong>

            <br>

            <small>
                ${escapeHTML(text)}
            </small>

        </div>

    `;
}


/* PREVENT HTML FROM USER INPUT */

function escapeHTML(text) {

    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* DOWNLOAD SVG */

downloadBtn.addEventListener("click", () => {

    const text = weatherInput.value.trim();

    if (!text) return;


    const weather = detectWeather(text);


    let icon = "🌈";

    if (weather === "sun") icon = "☀️";
    if (weather === "rain") icon = "🌧️";
    if (weather === "snow") icon = "❄️";
    if (weather === "cloud") icon = "☁️";
    if (weather === "wind") icon = "💨";


    const safeText = escapeHTML(text);


    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1200"
            height="800"
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
                        stop-color="#8ed8ff"
                    />

                    <stop
                        offset="65%"
                        stop-color="#d5f0ff"
                    />

                    <stop
                        offset="65%"
                        stop-color="#a8d87a"
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
                y="330"
                text-anchor="middle"
                font-size="42"
                font-family="Arial"
                font-weight="bold"
                fill="#17324d"
            >
                WeatherArt Kids
            </text>


            <text
                x="600"
                y="410"
                text-anchor="middle"
                font-size="30"
                font-family="Arial"
                fill="#17324d"
            >
                ${safeText}
            </text>


            <text
                x="600"
                y="650"
                text-anchor="middle"
                font-size="75"
            >
                🌳 🏡 🌼 🌳
            </text>


            <text
                x="600"
                y="730"
                text-anchor="middle"
                font-size="25"
                font-family="Arial"
                fill="#17324d"
            >
                Fun Weather Learning
            </text>

        </svg>
    `;


    const blob = new Blob(
        [svg],
        {
            type: "image/svg+xml"
        }
    );


    const url = URL.createObjectURL(blob);


    const link = document.createElement("a");

    link.href = url;

    link.download = "weather-illustration.svg";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

});
