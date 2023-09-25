const mapPoints = document.querySelectorAll('.map-point');
const comicPopup = document.getElementById('comicPopup');
let currentPoint = null;

function getRandomColor() {
  const colors = ['#E23A45', '#FF881B', '#4C62E6'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addRandomColors() {
  const maxTotalPaths = 30;

  const coloredPaths = Array.from(mapPoints).filter(path => ['#E23A45', '#FF881B', '#4C62E6'].includes(path.getAttribute('fill')));
  const coloredPathCount = coloredPaths.length;

  if (coloredPathCount >= maxTotalPaths) {
    const pathsToClear = getRandomInt(1, 5);
    for (let i = 0; i < pathsToClear; i++) {
      const coloredPaths = Array.from(mapPoints).filter(path => ['#E23A45', '#FF881B', '#4C62E6'].includes(path.getAttribute('fill')));
      if (coloredPaths.length === 0) {
        break;
      }
      const randomPath = coloredPaths[Math.floor(Math.random() * coloredPaths.length)];
      randomPath.setAttribute('fill', 'white');
    }
  }

  const pathsToAdd = getRandomInt(1, 5);
  for (let i = 0; i < pathsToAdd; i++) {
    const uncoloredPaths = Array.from(mapPoints).filter(path => !['#E23A45', '#FF881B', '#4C62E6'].includes(path.getAttribute('fill')));
    if (uncoloredPaths.length === 0) {
      return;
    }
    const randomPath = uncoloredPaths[Math.floor(Math.random() * uncoloredPaths.length)];
    randomPath.setAttribute('fill', getRandomColor());
  }
}

function handleMouseEnter(path) {
  const currentColor = path.getAttribute('fill');

  path.addEventListener('mouseleave', function () {
    path.setAttribute('fill', currentColor);
    path.removeEventListener('mouseleave', null);
  });

  switch (currentColor) {
    case 'white':
      path.setAttribute('fill', '#1991E6');
      break;
    case '#E23A45':
      path.setAttribute('fill', 'red');
      break;
    case '#FF881B':
      path.setAttribute('fill', 'orange');
      break;
    case '#4C62E6':
      path.setAttribute('fill', 'blue');
      break;
    default:
      path.setAttribute('fill', '#1991E6');
  }
}

function watchPathColorChanges() {
  mapPoints.forEach(path => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'fill') {
          const currentColor = path.getAttribute('fill');
          if (currentColor === 'white' || currentColor === '#1991E6') {
            if (path === currentPoint) {
              comicPopup.style.display = 'none';
              currentPoint = null;
            }
          }
        }
      });
    });

    observer.observe(path, { attributes: true });
  });
}

const closeButton = document.querySelector('.close-popup');

closeButton.addEventListener('click', function () {
  comicPopup.style.display = 'none';
  currentPoint = null;
});

function setCurrentDateTime() {
  const infoDateBlocks = document.querySelectorAll('.info-block .date-block');
  const popupDateBlock = document.querySelector('.comic-popup .date-block');

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function formatPopupDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function updateDateTime(dateBlock, formatFunction) {
    const currentDate = new Date();
    const dateFormatted = formatFunction(currentDate);
    const timeString = currentDate.toLocaleTimeString();
    const dateTimeString = `${dateFormatted} ${timeString}`;
    dateBlock.textContent = dateTimeString;
  }

  infoDateBlocks.forEach(dateBlock => {
    updateDateTime(dateBlock, formatDate);
    setInterval(() => updateDateTime(dateBlock, formatDate), 1000);
  });

  updateDateTime(popupDateBlock, formatPopupDate);
  setInterval(() => updateDateTime(popupDateBlock, formatPopupDate), 1000);
}

function updateRandomNumbers() {
  const randomTime = getRandomInt(70, 150);
  const randomLatency = getRandomInt(-150000, -100000);

  document.getElementById("time").textContent = randomTime;
  document.getElementById("latency").textContent = randomLatency + "ms";
}

function updateEventsAndIPs() {
  const event1 = getRandomInt(1, 5);
  const event2 = getRandomInt(1, 5);
  const event3 = getRandomInt(1, 5);

  document.getElementById("event1").textContent = ` +${event1} `;
  document.getElementById("event2").textContent = ` +${event2} `;
  document.getElementById("event3").textContent = ` +${event3} `;

  const ip1 = `${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}`;
  const ip2 = `${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}`;
  const ip3 = `${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}`;

  document.getElementById("ip1").textContent = ip1;
  document.getElementById("ip2").textContent = ip2;
  document.getElementById("ip3").textContent = ip3;
}

window.addEventListener('load', function () {
  const initialColoredPaths = getRandomInt(15, 25);
  for (let i = 0; i < initialColoredPaths; i++) {
    const uncoloredPaths = Array.from(mapPoints).filter(path => !['#E23A45', '#FF881B', '#4C62E6'].includes(path.getAttribute('fill')));
    if (uncoloredPaths.length === 0) {
      break;
    }
    const randomPath = uncoloredPaths[Math.floor(Math.random() * uncoloredPaths.length)];
    randomPath.setAttribute('fill', getRandomColor());
  }
  setInterval(addRandomColors, 3000);
  mapPoints.forEach(point => {
    point.addEventListener('click', (event) => handlePointClick(point, event));
    point.addEventListener('mouseenter', () => handleMouseEnter(point));
  });
  watchPathColorChanges();
  setCurrentDateTime();
  updateRandomNumbers();
  updateEventsAndIPs();
});

setInterval(updateRandomNumbers, 3000);

setInterval(updateEventsAndIPs, 3000);


function updatePopupData(currentColor) {
  const timePopup = document.getElementById("time-popup");
  const latencyPopup = document.getElementById("latency-popup");
  const eventPopup = document.getElementById("event-popup");
  const ipPopup = document.getElementById("ip-popup");

  eventPopup.style.color = currentColor;

  const randomTime = getRandomInt(70, 150);
  const randomLatency = getRandomInt(-150000, -100000);
  const randomEvent = getRandomInt(1, 1);
  const randomIP = `${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}`;

  timePopup.textContent = randomTime;
  latencyPopup.textContent = randomLatency + "ms";
  eventPopup.textContent = ` +${randomEvent} `;
  ipPopup.textContent = randomIP;
}

function handlePointClick(point, event) {
  event.preventDefault();
  const currentColor = point.getAttribute('fill');
  const imageWrapperRect = document.querySelector('.image-wrapper').getBoundingClientRect();

  if (currentColor !== 'white' && currentColor !== '#1991E6') {
    const pointRect = point.getBoundingClientRect();

    if (comicPopup.style.display === 'block' && point === currentPoint) {
      comicPopup.style.display = 'none';
    } else {
      const topPosition = pointRect.top - imageWrapperRect.top - comicPopup.offsetHeight - 10;
      const minDistanceFromTop = 20;

      if (topPosition < 0) {
        comicPopup.style.top = minDistanceFromTop + 'px';
      } else {
        comicPopup.style.top = topPosition + 'px';
      }

      comicPopup.style.left = pointRect.left - imageWrapperRect.left + 'px';
      comicPopup.style.display = 'block';

      currentPoint = point;

      updatePopupData(currentColor);
    }
  } else {
    comicPopup.style.display = 'none';
    currentPoint = null;
  }
}
