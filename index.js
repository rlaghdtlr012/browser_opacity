const STORAGE_KEY = "pageOpacityPercent"; // 0~100 정수로 저장

// 슬라이더 UI 생성
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

const savedPercent = parseInt(localStorage.getItem(STORAGE_KEY) || "100", 10);
slider.value = Number.isNaN(savedPercent) ? "100" : String(savedPercent);

const label = document.createElement("span");
Object.assign(label.style, {
  color: "white",
  marginLeft: "10px",
  fontSize: "14px",
});

function applyOpacity(percentInt) {
  const clamped = Math.min(100, Math.max(0, percentInt));
  const opacityValue = clamped / 100;
  document.body.style.opacity = String(opacityValue);
  label.innerText = `${clamped}%`;
  localStorage.setItem(STORAGE_KEY, String(clamped));
}

// 이벤트: 슬라이더 변경 시 즉시 적용 & 저장
slider.addEventListener("input", () => {
  applyOpacity(parseInt(slider.value, 10));
});

sliderContainer.appendChild(slider);
sliderContainer.appendChild(label);
document.body.appendChild(sliderContainer);
applyOpacity(parseInt(slider.value, 10));
