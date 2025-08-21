const sliderContainer = document.createElement("div");
sliderContainer.style.position = "fixed";
sliderContainer.style.right = "20px";
sliderContainer.style.bottom = "20px";
sliderContainer.style.padding = "10px";
sliderContainer.style.background = "rgba(0, 0, 0, 0.3)";
sliderContainer.style.borderRadius = "10px";
sliderContainer.style.zIndex = "1000";

const slider = document.createElement("input");
slider.type = "range";
slider.min = "0";
slider.max = "100";
slider.value = "100";
slider.style.width = "90px";

const label = document.createElement("span");
label.innerText = "100%";
label.style.color = "white";
label.style.marginLeft = "6px";
label.style.fontSize = "13px";

slider.addEventListener("input", () => {
  const opacityValue = slider.value / 100 + 0.1; // 0 ~ 1 사이 값
  document.body.style.opacity = opacityValue;
  label.innerText = `${slider.value}%`;
});

sliderContainer.appendChild(slider);
sliderContainer.appendChild(label);

document.body.appendChild(sliderContainer);