const weatherInput =
    document.getElementById("weatherInput");

const generateBtn =
    document.getElementById("generateBtn");

const sampleBtn =
    document.getElementById("sampleBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const illustration =
    document.getElementById("illustration");

const status =
    document.getElementById("status");



/* SAMPLE BUTTON */

sampleBtn.addEventListener("click", function () {

    weatherInput.value =
        "Tomorrow will be rainy with cool winds and lots of clouds.";

});



/* WEATHER DETECTION */

function detectWeather(text) {

    text = text.toLowerCase();


    if (
        text.includes("rain") ||
        text.includes("rainy") ||
        text.includes("drizzle")
    ) {
        return "rain";
    }


    if (
        text.includes("snow") ||
        text.includes("snowy")
    ) {
        return "snow";
    }


    if (
        text.includes("cloud") ||
        text.includes("cloudy") ||
        text.includes("overcast")
    ) {
        return "cloud";
    }


    if (
        text.includes("wind") ||
        text.includes("windy")
    ) {
        return "wind";
    }


    if (
        text.includes("sun") ||
        text.includes("sunny") ||
        text.includes("hot") ||
        text.includes("heat")
    ) {
        return "sun";
    }


    return "mixed";
}



/* GENERATE ILLUSTRATION */

function generateIllustration() {

    const text =
        weatherInput.value.trim();


    if (text === "") {

        status.textContent =
            "⚠️ Please enter a weather forecast.";

        return;
    }


    status.textContent =
        "✨ Creating your weather illustration...";


    generateBtn.disabled = true;


    setTimeout(function () {

        const weather =
            detectWeather(text);


        showWeather(weather, text);


        status.textContent =
            "✅ Illustration generated!";


        generateBtn.disabled = false;


        downloadBtn.disabled = false;

    }, 800);

}



/* SHOW WEATHER */

function showWeather(weather, text) {

    let icon = "🌈";

    let sky = "☀️ ☁️";

    let land = "🌳 🌼 🏡 🌼 🌳";


    if (weather === "rain") {

        icon = "🌧️";

        sky = "☁️ ☁️ ☁️";

        land = "🌳 ☂️ 🏡 🌷 🌳";

        illustration.style.background =
            "linear-gradient(#718eae 0%, #718eae 65%, #8fc47b 65%)";
    }


    else if (weather === "snow") {

        icon = "❄️";

        sky = "☁️ ❄️ ☁️";

        land = "🌲 ⛄ 🏠 🌲";

        illustration.style.background =
            "linear-gradient(#bce5ff 0%, #bce5ff 65%, #edf8ff 65%)";
    }


    else if (weather === "cloud") {

        icon = "⛅";

        sky = "☁️ ☁️";

        land = "🌳 🏡 🌼 🌳";

        illustration.style.background =
            "linear-gradient(#b9d9eb 0%, #b9d9eb 65%, #9fd27f 65%)";
    }


    else if (weather === "wind") {

        icon = "💨";

        sky = "☁️ ➡️ ☁️";

        land = "🌳 🍃 🏡 🍃 🌳";

        illustration.style.background =
            "linear-gradient(#a8dcf5 0%, #a8dcf5 65%, #9ed17b 65%)";
    }


    else if (weather === "sun") {

        icon = "☀️";

        sky = "☁️";

        land = "🌳 🌼 🏡 🌼 🌳";

        illustration.style.background =
            "linear-gradient(#8ed8ff 0%, #8ed8ff 65%, #a9df82 65%)";
    }


    else {

        icon = "🌈";

        sky = "☀️ ☁️";

        land = "🌳 🌈 🏡 🌷 🌳";

        illustration.style.background =
            "linear-gradient(#b9dff7 0%, #b9dff7 65%, #a9da82 65%)";
    }


    illustration.innerHTML = `

        <div class="big-icon">
            ${icon}
        </div>

        <div class="clouds">
            ${sky}
        </div>

        <div class="land">
            ${land}
        </div>

        <div class="preview-message">
            ${text}
        </div>

    `;
}



/* GENERATE BUTTON */

generateBtn.addEventListener(
    "click",
    generateIllustration
);



/* DOWNLOAD */

downloadBtn.addEventListener(
    "click",
    function () {

        const text =
            weatherInput.value;


        const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1000"
            height="700"
        >

            <rect
                width="1000"
                height="700"
                fill="#a9ddff"
            />

            <rect
                y="450"
                width="1000"
                height="250"
                fill="#a9dc82"
            />

            <text
                x="500"
                y="250"
                text-anchor="middle"
                font-size="100"
            >
                🌦️
            </text>

            <text
                x="500"
                y="390"
                text-anchor="middle"
                font-size="30"
                font-family="Arial"
            >
                ${text}
            </text>

            <text
                x="500"
                y="600"
                text-anchor="middle"
                font-size="60"
            >
                🌳 🏡 🌼 🌳
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


        link.click();


        URL.revokeObjectURL(url);

    }
);
