const STORAGE_KEY = "pageOpacityPercent"; // 0~100 정수로 저장

function getStoredPercent(defaultVal = "100") {
  return new Promise((resolve) => {
    try {
      chrome.storage.sync.get({ [STORAGE_KEY]: defaultVal }, (res) => {
        resolve(String(res[STORAGE_KEY]));
      });
    } catch (e) {
      resolve(defaultVal);
    }
  });
}

function setStoredPercent(val) {
  try {
    chrome.storage.sync.set({ [STORAGE_KEY]: String(val) });
  } catch (e) {
    console.error(e);
  }
}

const sliderContainer = document.createElement("div");
Object.assign(sliderContainer.style, {
  position: "fixed",
  right: "20px",
  bottom: "20px",
  padding: "10px",
  background: "rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  zIndex: "1000",
  backdropFilter: "blur(4px)",
});

const slider = document.createElement("input");
slider.type = "range";
slider.min = "0";
slider.max = "100";
slider.style.width = "90px";

const label = document.createElement("span");
Object.assign(label.style, {
  color: "white",
  marginLeft: "10px",
  fontSize: "14px",
});

function applyOpacity(percentInt) {
  const clamped = Math.min(100, Math.max(0, percentInt));
  const opacityValue = (clamped / 100) || 0.1;; // 최소치 보정
  document.body.style.opacity = String(opacityValue);
  label.innerText = `${clamped}%`;
  setStoredPercent(clamped);
}

(async () => {
  const raw = await getStoredPercent("100");
  const savedPercent = parseInt(raw, 10);
  slider.value = Number.isNaN(savedPercent) ? "100" : String(savedPercent);

  slider.addEventListener("input", () => {
    applyOpacity(parseInt(slider.value, 10));
  });

  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(label);
  document.body.appendChild(sliderContainer);

  applyOpacity(parseInt(slider.value, 10));
})();
