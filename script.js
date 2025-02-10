(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/
const messages = [
    "😯",
    "¿Tas segura?",
    "¿¿Muy muy segura??",
    "¿Segurísima segurisima?",
    "Amooor porfaa...",
    "Piénsalo bien vv 🫦",
    "Si dices que no, estare muy triste :(",
    "Ayyy amoor no seas mala :((",
    "me rompes el corazon :(",
    "pipipipipipi 😿",
    "Pero si te quiero muchooo :(",
    "waaaaaaaaa 😭😭😭😭😭",
    "Porfaaa 🥺🥺🥺🥺🥺",
    "teamo muchooo di que si 💔",
    "T_T",
    "ta bien pues no te seguiré insistiendo 😤",
    "Jajajs no te creas, seguiré insistiendo, di q si ❤️",
];

let messageIndex = 0; // Index to track the current message
let noClickCount = 0; // Counter to track the number of "No" button clicks
let mathProblemIndex = 0; // Index to track the current math problem

const mathProblems = [
    {
        question: "Aver, aceptaré un 'No' si me resuelves esta ecuación:",
        image: "mathproblem1.png",
        answer: "4"
    },
    {
        question: "Jjksjs ya deveritas si resuelves esta te dejo tranquila",
        image: "mathproblem2.png",
        answer: "12602123297335631" // Replace with the correct answer for the second problem
    }
];

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    
    // Update the "No" button text with the current message
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length; // Cycle through messages

    // Increase the size of the "Yes" button if the "No" button is clicked less than 6 times
    if (noClickCount < 10) {
        const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
        yesButton.style.fontSize = `${currentSize * 1.2}px`;
    }

     // Decrease the size of the "No" button
     if (noClickCount > 4 && noClickCount < 14) {
        const currentSize = parseFloat(window.getComputedStyle(noButton).fontSize);
        noButton.style.fontSize = `${currentSize * 0.9}px`;
    }

    noClickCount++; // Increment the "No" button click count

    // Move the "No" button to a random position
    if (noClickCount >= 10) {
        const randomX = Math.floor(Math.random() * (window.innerWidth - noButton.offsetWidth));
        const randomY = Math.floor(Math.random() * (window.innerHeight - noButton.offsetHeight));
        noButton.style.position = 'absolute';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    }

    // Show the math problem modal if the "No" button is clicked 17 times
    if (noClickCount === 18) {
        showMathProblemModal();
    }
}

//PROMPT BOX
function showMathProblemModal() {
    const noButton = document.querySelector('.no-button');
    const currentProblem = mathProblems[mathProblemIndex];

    // Create the modal element
    const modal = document.createElement('div');
    modal.id = 'mathProblemModal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#bf266e'; // Change this to your desired background color
    modal.style.color = '#eeeeee'; // Change this to your desired text color
    modal.style.padding = '20px'; // Adjust padding for smaller screens
    modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '1001';
    modal.style.borderRadius = '8px'; // Same border radius as the "No" button
    modal.style.border = 'none'; // Same border as the "No" button
    modal.style.textAlign = 'center'; // Center the text
    modal.style.width = '90%'; // Adjust width for smaller screens
    modal.style.maxWidth = '400px'; // Set a maximum width
    modal.innerHTML = `
        <p style="font-size: 1.2em; margin-bottom: 10px; font-weight: bold;">${currentProblem.question}</p> <!-- Font weight set to bold -->
        <img src="${currentProblem.image}" alt="Math Problem" style="width: 100%; height: auto; border-radius: 5px;">
        <input type="text" id="mathAnswer" placeholder="Escribe tu respuesta" style="margin-top: 10px; font-family: 'Comic Neue', cursive; width: calc(100% - 20px); padding: 10px; font-size: 1em; border-radius: 5px; background-color:#eeeeee; border: 1px solid #ccc;">
        <button id="submitMathAnswer" onclick="checkMathAnswer()" style="margin-top: 10px; width: 100%; padding: 10px; font-size: 1em; border-radius: 5px; border: none; font-family: 'Comic Neue', cursive; font-weight: bold; background-color: #eeeeee; color:rgb(15, 15, 15);">Enviar</button>
    `;

    // Create the overlay element
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';

    // Append the modal and overlay to the body
    document.body.appendChild(modal);
    document.body.appendChild(overlay);

    // Disable the "No" and "Yes" buttons while the modal is open
    noButton.disabled = true;
    const yesButton = document.querySelector('.yes-button');
    yesButton.disabled = true;
}

function checkMathAnswer() {
    const answer = document.getElementById('mathAnswer').value;
    const currentProblem = mathProblems[mathProblemIndex];

    // Check if the answer is correct
    if (answer === currentProblem.answer) {
        // Remove the modal and overlay
        document.getElementById('mathProblemModal').remove();
        document.getElementById('overlay').remove();

        // Enable the "No" and "Yes" buttons
        document.querySelector('.no-button').disabled = false;
        document.querySelector('.yes-button').disabled = false;

        // Move to the next math problem if available
        mathProblemIndex++;
        if (mathProblemIndex < mathProblems.length) {
            showMathProblemModal();
        } else {
            // Hide all content
            document.getElementById('initialContent').style.display = 'none';
            document.getElementById('yesContent').style.display = 'none';
            // Show the sad content
            document.getElementById('sadContent').style.display = 'block';
            // Play the sad audio
            const sadAudio = document.getElementById('sadAudio');
            sadAudio.play();

            // Hide the stickers
            const stickers = document.querySelectorAll('.sticker');
            stickers.forEach(sticker => {
                sticker.style.display = 'none';
            });
        }
    } else {
        alert('Respuesta incorrecta'); // Show an alert if the answer is incorrect
    }
}