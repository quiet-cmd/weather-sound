import './index.css'; 
import * as summerBg from '@assets/images/summer-bg.jpg';
import * as winterBg from '@assets/images/winter-bg.jpg';
import * as rainyBg from '@assets/images/rainy-bg.jpg';
import * as sunSvg from '@assets/icons/sun.svg';
import * as cloudRainySvg from '@assets/icons/cloud-rain.svg';
import * as cloudSnowSvg from '@assets/icons/cloud-snow.svg';

import * as summerAudio from '@assets/sounds/summer.mp3';
import * as winterAudio from '@assets/sounds/winter.mp3';
import * as rainyAudio from '@assets/sounds/rain.mp3';


interface WeatherCard extends HTMLDivElement {
    src: string;
}

const body = document.querySelector('body');
body.style.backgroundImage = `url(${summerBg})`;

const volumeSlider = document.querySelector('.volume-slider');
const audio = new Audio();
let currentCard: WeatherCard | null = null;


volumeSlider.addEventListener('input', (e: Event) => {
    const volume = +(e.target as HTMLInputElement).value / 100;
    audio.volume = volume;
});


function createWeatherCard(icon: string, background: string, audio: string): WeatherCard {
    const card = document.createElement('div') as WeatherCard;
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

document.querySelectorAll('.weather-card').forEach((card: WeatherCard) => {
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



