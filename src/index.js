import './index.css'; 
import summerBg from '@assets/images/summer-bg.jpg';
import winterBg from '@assets/images/winter-bg.jpg';
import rainyBg from '@assets/images/rainy-bg.jpg';
import sunSvg from '@assets/icons/sun.svg';
import cloudRainySvg from '@assets/icons/cloud-rain.svg';
import cloudSnowSvg from '@assets/icons/cloud-snow.svg';
import summerAudio from '@assets/sounds/summer.mp3';
import winterAudio from '@assets/sounds/winter.mp3';
import rainyAudio from '@assets/sounds/rain.mp3';

const body = document.querySelector('body');
body.style.backgroundImage = `url(${summerBg})`;

const volumeSlider = document.querySelector('.volume-slider');
const audio = new Audio();
let currentCard = null;

volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audio.volume = volume;
});

function createWeatherCard(icon, background, audio) {
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.style.backgroundImage = `url(${background})`;
    card.style.setProperty('--weather-icon', `url(${icon})`);
    card.src = audio;
    return card;
}

const container = document.querySelector('.weather-cards');

container.appendChild(createWeatherCard(sunSvg, summerBg, summerAudio));
container.appendChild(createWeatherCard(cloudRainySvg, rainyBg, rainyAudio));
container.appendChild(createWeatherCard(cloudSnowSvg, winterBg, winterAudio));

document.querySelectorAll('.weather-card').forEach(card => {
    card.addEventListener('click', () => {
        if (currentCard === card) {
            if (audio.paused) {
                audio.play();
                card.classList.add('playing');
            } else {
                audio.pause();
                card.classList.remove('playing');
            }
            return;
        }

        if (currentCard) {
            currentCard.classList.remove('playing');
        }

        audio.src = card.src;
        audio.load();
        audio.play();
        card.classList.add('playing');
        currentCard = card;
    });
});



