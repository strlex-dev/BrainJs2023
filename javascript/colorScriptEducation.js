document.addEventListener('DOMContentLoaded', function () {
        const net = new brain.NeuralNetwork();

        const trainingData = [
            { input: { r: 1, g: 0, b: 0 }, output: { red: 1, color: "RED" } },
            { input: { r: 0, g: 1, b: 0 }, output: { green: 1, color: "GREEN" } },
            { input: { r: 0, g: 0, b: 1 }, output: { blue: 1, color: "BLUE" } },
            { input: { r: 0, g: 0, b: 0 }, output: { black: 1, color: "BLACK" } },
            { input: { r: 1, g: 1, b: 1 }, output: { white: 1, color: "WHITE" } },
            { input: { r: 0.5, g: 0.5, b: 0.5 }, output: { gray: 1, color: "GRAY" } },
            { input: { r: 0.7, g: 0.2, b: 0.8 }, output: { pink: 1, color: "PINK" } },
            { input: { r: 0.3, g: 0.8, b: 0.1 }, output: { green: 1, color: "GREEN" } },
            { input: { r: 0.8, g: 0.5, b: 0.2 }, output: { orange: 1, color: "ORANGE" } },
            { input: { r: 0.1, g: 0.7, b: 0.9 }, output: { cyan: 1, color: "CYAN" } },
            { input: { r: 0.9, g: 0.4, b: 0.6 }, output: { pink: 0.2, color: "PINK" } },
            { input: { r: 0.2, g: 0.3, b: 0.5 }, output: { blue: 0.8, color: "BLUE" } },
            { input: { r: 0.6, g: 0.9, b: 0.4 }, output: { green: 0.2, color: "GREEN" } },
            { input: { r: 0.8, g: 0.2, b: 0.1 }, output: { red: 0.2, color: "RED" } },
            { input: { r: 0.4, g: 0.7, b: 0.9 }, output: { blue: 0.2, color: "BLUE" } },
            { input: { r: 0.5, g: 0.1, b: 0.8 }, output: { pink: 0.8, color: "PINK" } },
            { input: { r: 0.9, g: 0.7, b: 0.3 }, output: { yellow: 0.2, color: "YELLOW" } },
            { input: { r: 0.2, g: 0.6, b: 0.4 }, output: { green: 0.1, color: "GREEN" } },
            { input: { r: 0.7, g: 0.5, b: 0.8 }, output: { pink: 0.8, color: "PINK" } },
            { input: { r: 0.3, g: 0.2, b: 0.1 }, output: { brown: 0.8, color: "BROWN" } },
        ];
        net.train(trainingData, {
            iterations: 20000,
            log: true,
            logPeriod: 100,
            learningRate: 0.01,
        });

        function convertFromRGB(r, g, b) {
            const maxColorValue = 255;

            const validateColor = (color) =>
                Math.min(maxColorValue, Math.max(0, color));

            const red = validateColor(r);
            const green = validateColor(g);
            const blue = validateColor(b);

            const resRed = (red / maxColorValue).toFixed(1);
            const resGreen = (green / maxColorValue).toFixed(1);
            const resBlue = (blue / maxColorValue).toFixed(1);
            return { r: resRed, g: resGreen, b: resBlue };
        }

        document.getElementById('predictColor').addEventListener('click', function () {
            const redInput = parseInt(document.getElementById('redInput').value);
            const greenInput = parseInt(document.getElementById('greenInput').value);
            const blueInput = parseInt(document.getElementById('blueInput').value);

            if (isNaN(redInput) || isNaN(greenInput) || isNaN(blueInput) ||
                redInput < 0 || redInput > 255 ||
                greenInput < 0 || greenInput > 255 ||
                blueInput < 0 || blueInput > 255) {
                alert('Please enter valid RGB values (0-255).');
                return;
            }

            const inputColor = `rgba(${redInput}, ${greenInput}, ${blueInput}, 1)`;

            function displayInputColor(boxId, color, infoBoxId) {
               const colorBox = document.getElementById(boxId);
               colorBox.style.backgroundColor = color;

               const colorInfoBox = document.getElementById(infoBoxId);
               colorInfoBox.innerHTML = `Input: RGB (${redInput}, ${greenInput}, ${blueInput})`;
            }

            const convertedRGB = convertFromRGB(redInput, greenInput, blueInput);

            function displayPredictedColor(boxId, color, infoBoxId) {
                const predictedColor = brain.likely(convertedRGB, net);

                const colorInfoBox = document.getElementById(infoBoxId);
                colorInfoBox.innerHTML = `<p>AI Prediction: ${predictedColor}</p>`;
            }


            displayInputColor("inputColorBox", inputColor, "inputColorInfo");
            displayPredictedColor("predictedColorBox", convertedRGB, "predictedColorInfo");
        });
});