// script.js
let currentAdIndex = 0;
const ads = document.querySelectorAll('.ads-slider .ad');

function showAd(index) {
    ads.forEach((ad, i) => {
        ad.style.display = i === index ? 'flex' : 'none';
    });
}

function nextAd() {
    currentAdIndex = (currentAdIndex + 1) % ads.length;
    showAd(currentAdIndex);
}

showAd(currentAdIndex);
setInterval(nextAd, 5000);

// script.js
