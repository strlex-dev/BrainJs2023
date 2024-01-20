document.addEventListener('DOMContentLoaded', function () {
    const net = new brain.NeuralNetwork();

    const trainingData = [
        { input: { number: 0 }, output: { zero: 1 } },
        { input: { number: 1 }, output: { one: 1 } },
        { input: { number: 2 }, output: { two: 1 } },
        { input: { number: 3 }, output: { three: 1 } },
        { input: { number: 4 }, output: { four: 1 } },
        { input: { number: 5 }, output: { five: 1 } },
        { input: { number: 6 }, output: { six: 1 } },
        { input: { number: 7 }, output: { seven: 1 } },
        { input: { number: 8 }, output: { eight: 1 } },
        { input: { number: 9 }, output: { nine: 1 } },
    ];

    net.train(trainingData, {
        iterations: 20000,
        errorThresh: 0.05,
        log: true,
        learningRate: 0.08,
    });

    document.getElementById('submitButton').addEventListener('click', function () {
        const inputElement = document.getElementById('number');
        const resultElement = document.getElementById('result');
        const inputValue = parseInt(inputElement.value, 10);

        if (isNaN(inputValue) || inputValue < 0 || inputValue > 9) {
            resultElement.innerHTML = `<p style="margin-top=5px">Please enter a valid number between 0-9!</p>`;
            return;
        }

        const output = net.run({ number: inputValue });

        const predictedNumber = getMaxKey(output);
        const confidence = (output[predictedNumber] * 100).toFixed(2);

        resultElement.innerHTML = `
        <p>Your input number is: ${inputValue}</p>
        <p>AI Prediction: ${predictedNumber}</p>
        <p>Confidence: ${confidence}%</p>
    `;
    });

    function getMaxKey(obj, threshold = 0.5) {
        let maxKey = null;
        let maxValue = -Infinity;

        for (const key in obj) {
            if (obj[key] > maxValue || obj[key] >= threshold || maxValue === threshold) {
                maxKey = key;
                maxValue = obj[key];
            }
        }
        return maxKey;
    }
});
