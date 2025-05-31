// import styles from "./style.css";
const greetings = document.getElementById("greetings");
const homeRightMain = document.getElementById("homeRightMain");
const musicRightMain = document.getElementById("musicRightMain");
const sceneRightMain = document.getElementById("sceneRightMain");
const relaxRightMain = document.getElementById("relaxRightMain");
const yogaRightMain = document.getElementById("yogaRightMain");
const focusRightMain = document.getElementById("focusRightMain");
const aiRightmMain = document.getElementById("aiRightmMain");
const mainContainer = document.querySelector(".mainContainer");
const rightSectionBody = document.getElementById("rightSectionBody");
const home = document.querySelectorAll(".home");
const yogaSelect = document.getElementById("yogaSelect");
const yogaDataContainer = document.getElementById("yogaDataContainer");
const changableText = document.getElementById("changableText");
const homeImageChanger = document.getElementById("homeImageChanger");
const hamBurger = document.querySelector(".hamBurger");
const geminiInput = document.getElementById("geminiInput");
const geminiButton = document.getElementById("geminiButton");
const geminiContainer = document.getElementById("geminiContainer");
const circleProgress = document.querySelector(".breathing-circle-progress");
const numberOfBreaths = document.querySelector(".breathing-select");
const start = document.querySelector(".breathing-start");
const instructions = document.querySelector(".breathing-instructions");
const breathsText = document.querySelector(".breathing-breaths-text");
const speechToText = document.getElementById("speechToText");

let userName = localStorage.getItem("name");
if (userName == null) {
  window.location.href = "./login.html";
}

userName = userName.slice(0, 1).toUpperCase() + userName.slice(1);

console.log(userName);

let data = new Date();
let hour = data.getHours();

console.log(hour);
let timeZone;

if (hour < 12) {
  timeZone = "Good Morning ";
} else if (hour >= 12 && hour < 18) {
  timeZone = "Good Afternoon ";
} else {
  timeZone = "Good Evening ";
}
greetings.innerHTML = `Hello ${userName} ${timeZone}`;

mainContainer.addEventListener("click", (e) => {
  let element =
    e.target.id || e.target.parentNode.id || e.target.parentNode.parentNode.id;

  home.forEach((ele) => {
    ele.children[0].classList.remove("activeEle");
  });

  if (element === "homePanner") {
    document.getElementById("homePanner").classList.add("activeEle");
    rightSectionBody.innerHTML = "";
    rightSectionBody.append(homeRightMain);
  } else if (element === "musicPannel") {
    console.log("musicPanner");
    home[1].children[0].classList.add("activeEle");
    rightSectionBody.innerHTML = "";
    rightSectionBody.append(musicRightMain);
  } else if (element === "scenePannel") {
    // youTubeSection();
    home[2].children[0].classList.add("activeEle");
    showYTData();
    rightSectionBody.innerHTML = "";
    rightSectionBody.append(sceneRightMain);
  } else if (element === "relaxPannel") {
    home[3].children[0].classList.add("activeEle");
    rightSectionBody.innerHTML = "";
    rightSectionBody.append(relaxRightMain);
  } else if (element === "yogaPannel") {
    home[4].children[0].classList.add("activeEle");
    rightSectionBody.innerHTML = "";
    rightSectionBody.append(yogaRightMain);
    // showYoga();
    showYogaData("featured");
  } else if (element === "waterPannel") {
    home[5].children[0].classList.add("activeEle");
    rightSectionBody.innerHTML = "";
    rightSectionBody.append(focusRightMain);
    focusRightMain.innerHTML = "";
    createSplineViewer();
  } else if (element === "aiPannel") {
    home[6].children[0].classList.add("activeEle");
    rightSectionBody.innerHTML = "";
    rightSectionBody.append(aiRightmMain);
  }
});

rightSectionBody.innerHTML = "";
rightSectionBody.append(homeRightMain);

function createSplineViewer() {
  const container = document.getElementById("focusRightMain");
  let h1 = document.createElement("h1");
  h1.innerHTML = "START FOCUSING";
  container.appendChild(h1);
  const viewer = document.createElement("spline-viewer");
  viewer.id = "spline-viewer";
  viewer.setAttribute(
    "url",
    "https://prod.spline.design/bv-Zt2ATOj13uI6w/scene.splinecode"
  );
  container.appendChild(viewer);
  let div = document.createElement("div");
  div.innerHTML = `
    <img class="fullscreen" src="./Assets/fullscreen.png" alt="" />
  `;
  container.append(div);
  let span = document.createElement("span");
  span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
  `;

  span.className = "exitFullScreen";
  container.append(span);
  const exitFullScreen = document.querySelector(".exitFullScreen");

  const fullscreen = document.querySelector(".fullscreen");
  console.log(fullscreen);

  fullscreen.addEventListener("click", () => {
    let video = document.getElementById("spline-viewer");
    video.style =
      "width: 100vw; height: 100vh; position: absolute; left: 0; margin-top: 0; border-radius: 0;";
    fullscreen.style.display = "none";

    exitFullScreen.style =
      "display : block; width: 30px; color : white; position: absolute; top: 0; right: 0; margin: 10px; cursor: pointer;";
  });

  exitFullScreen.addEventListener("click", () => {
    let video = document.getElementById("spline-viewer");
    video.style = "";
    fullscreen.style.display = "block";
    exitFullScreen.style = "display : none;";
  });
}

let ytArrays = [];
let yogaArr = [];
// const youTubeSection = () => {
const API_KEY = "AIzaSyBQfc-yWhcxZAS1Na-5IOSTk7EEGtqimmI";
const PLAYLIST_ID = "UUy7WP8lvB10G6wDS5azHA_Q";

fetch(
  `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=12`
)
  .then((response) => response.json())
  .then((data) => {
    sceneRightMain.innerHTML = "";
    ytArrays = data.items;

    // showYTData();
  })
  .catch((error) => console.error("Error fetching video IDs:", error));
// };

let showYTData = () => {
  let h1 = document.createElement("h1");
  h1.innerHTML = "Meditation Music Videos";
  sceneRightMain.innerHTML = "";
  sceneRightMain.append(h1);

  ytArrays.map((item) => {
    let videoId = item.snippet.resourceId.videoId;
    let div = document.createElement("div");
    div.innerHTML = `
    <iframe class="ytIframe" width="270" height="370" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
    <p style="text-align: center; width:260px; height:100px ">${item.snippet.title}</p>

    `;

    // div.style.overflow = "hidden";

    // console.log(item);
    sceneRightMain.append(div);
  });
};

const showYoga = () => {
  const yogaAPI = "https://priyangsubanerjee.github.io/yogism/yogism-api.json";
  console.log(yogaArr.length);
  if (yogaArr.length === 0) {
    fetch(yogaAPI)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        yogaArr = data;
        for (let item in yogaArr) {
          // console.log(item);
          let option = document.createElement("option");

          option.value = item;
          let val = item;
          val = val.charAt(0).toUpperCase() + item.slice(1);
          option.innerHTML = val;
          // option.innerHTML.style.textTransform = "capitalize";

          // console.log(val);
          yogaSelect.append(option);
        }
        // showYogaData("featured");
        console.log("Data loaded");
      });
  }
};

const showYogaData = (value) => {
  // console.log(yogaArr[value]);
  let data = yogaArr[value];
  yogaDataContainer.innerHTML = "";
  data.map((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <img src="${item.image}"/>
    <h1>${item.name}</h1>
    <p>${item.description}</p>
    `;
    div.classList.add("yogaDataDivs");
    div.addEventListener("click", () => {
      localStorage.setItem("yogaData", JSON.stringify(item));
      window.open("./showYogaDetail.html", "_blank");
    });
    // console.log(item);
    yogaDataContainer.append(div);
  });
};

yogaSelect.addEventListener("change", () => {
  let value = yogaSelect.value;
  // console.log(value);
  showYogaData(value);
});

showYoga();

let textArr = [
  "You are beautiful 😍",
  "Belive in yourself 🤞",
  "You are smart 😎",
  "Love yourself ❤️",
  "Always keep smiling 😁",
];
const typeWriter = () => {
  let i = 0;
  // let text = textArr[i];

  const typeWord = () => {
    changableText.innerHTML = "";
    let j = 0;
    const text = textArr[i];
    const typeLetter = () => {
      if (j <= text.length - 1) {
        changableText.innerHTML += text[j];
        // console.log(text[j]);
        j++;
        // console.log(j, text.length, text[j]);
        if (j === text.length) {
          if (i === textArr.length - 1) {
            i = 0;
          } else {
            i++;
          }

          setTimeout(typeWord, 2000);
          // console.log(textArr.length, i);
          return;
        }

        setTimeout(typeLetter, 50);
      }
    };
    typeLetter();
  };

  typeWord();
};
typeWriter();
// changableText.innerHTML = typeWriter();

let imgArr = [
  "./Assets/0.jpg",
  "./Assets/1.jpg",
  "./Assets/2.jpeg",
  "./Assets/3.jpeg",
  "./Assets/5.png",
];

console.log(imgArr[0]);
const ImageChanger = () => {
  let i = Math.round(Math.random() * 4);
  // console.log(i);

  homeImageChanger.innerHTML = `
    <img src="${imgArr[i]}" alt="" />
  `;

  // console.log(i);

  setTimeout(ImageChanger, 2500);
};

ImageChanger();

let flag = false;
document.querySelector(".spC").addEventListener("click", () => {
  flag = !flag;
  if (flag) {
    document.querySelector(".accordion").style.display = "block";
  } else {
    document.querySelector(".accordion").style.display = "none";
  }
});

let menuFlag = false;
hamBurger.addEventListener("click", () => {
  menuFlag = !menuFlag;
  if (menuFlag) {
    document.querySelector(".leftNav").style.display = "block";
  } else {
    document.querySelector(".leftNav").style.display = "none";
  }
});

function displayMessage(sender, text, isUser = false) {
    let p = document.createElement("div");
    p.classList.add("message-bubble");
    p.classList.add(isUser ? "user-message" : "gemini-message");
    p.innerHTML = `<strong>${sender}</strong>: ${text}`;
    geminiContainer.appendChild(p);
    geminiContainer.scrollTop = geminiContainer.scrollHeight;
}

function showLoading(show) {
    let loadingDiv = document.getElementById("loadingIndicator");
    if (!loadingDiv) {
        loadingDiv = document.createElement("div");
        loadingDiv.id = "loadingIndicator";
        loadingDiv.classList.add("loading-indicator");
        geminiContainer.appendChild(loadingDiv);
    }
    loadingDiv.style.display = show ? "block" : "none";
    loadingDiv.textContent = show ? "HOPE is typing..." : "";
    geminiContainer.scrollTop = geminiContainer.scrollHeight;
}

async function run(prompt) {
    displayMessage(userName, prompt, true);
    showLoading(true);

    const chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = {
        contents: chatHistory
    };

    const apiKey = "AIzaSyDuzmj3e6b9xeHJNfCyq6qTWwdD4xQaHMQ";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;

            let plainText = text
                .replace(/\*\*(.*?)\*\*/g, "$1")
                .replace(/\*(.*?)\*/g, "$1");

            displayMessage("HOPE", plainText);
        } else {
            displayMessage("HOPE", "Sorry, I couldn't get a response. Please try again.");
            console.error("Unexpected API response structure:", result);
        }
    } catch (error) {
        displayMessage("HOPE", "An error occurred while communicating with the API. Please check your connection or try again later.");
        console.error("Fetch error:", error);
    } finally {
        showLoading(false);
    }
}

console.log(geminiButton, geminiInput, geminiContainer);
geminiButton.addEventListener("click", () => {
    let prompt = geminiInput.value.trim();
    if (prompt) {
        console.log(prompt);
        run(prompt);
        geminiInput.value = "";
    }
});

geminiInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        geminiButton.click();
    }
});

geminiInput.value = "";


function record() {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";

  recognition.onresult = function (event) {
    console.log("Fn started");
    console.log(event);
    let value = event.results[0][0].transcript;
    console.log(event.results[0][0].transcript);
    // document.getElementById("geminiInput").value =
    //   event.results[0][0].transcript;
    console.log("Fn end");
    run(value);
  };
  recognition.start();
}

speechToText.addEventListener("click", () => {
  record();
});
// run(`Hello ${userName}`);

let breathsLeft = 0;

// Watching for selected breaths from user
numberOfBreaths.addEventListener("change", () => {
  breathsLeft = numberOfBreaths.value;
  console.log(breathsLeft);
  breathsText.innerText = breathsLeft;
});

// Grow/Shrink Circle
const growCircle = () => {
  circleProgress.classList.add("breathing-circle-grow");
  setTimeout(() => {
    circleProgress.classList.remove("breathing-circle-grow");
  }, 8000);
};

// Breathing Instructions
const breathTextUpdate = () => {
  // breathsText.innerText = breathsLeft;
  console.log(breathsLeft);
  breathsLeft--;
  breathsText.innerText = breathsLeft;
  instructions.innerText = "Breath in";
  setTimeout(() => {
    instructions.innerText = "Hold Breath";
    setTimeout(() => {
      instructions.innerText = "Exhale Breath Slowly";
    }, 4000);
  }, 4000);

  // breathsText.innerText = breathsLeft;
  if (breathsLeft <= 0) {
    return;
  }
};

// Breathing App Function
const breathingApp = () => {
  const breathingAnimation = setInterval(() => {
    if (breathsLeft === 0) {
      clearInterval(breathingAnimation);
      instructions.innerText =
        "Breathing session completed. Click 'Begin' to start another session!";
      start.classList.remove("breathing-button-inactive");
      breathsLeft = numberOfBreaths.value;
      breathsText.innerText = breathsLeft;
      return;
    }
    growCircle();
    breathTextUpdate();
  }, 12000);
};

// Start Breathing
start.addEventListener("click", () => {
  breathsLeft = numberOfBreaths.value;
  breathsText.innerText = breathsLeft;
  if (breathsLeft <= 0) {
    return;
  }
  start.classList.add("breathing-button-inactive");
  instructions.innerText = "Get relaxed, and ready to begin breathing";
  setTimeout(() => {
    instructions.innerText = "Breathing is about to begin...";
    setTimeout(() => {
      breathingApp();
      growCircle();
      breathTextUpdate();
    }, 2000);
  }, 2000);
});
