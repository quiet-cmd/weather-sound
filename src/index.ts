import './index.css'; 
import * as summerBg from '@assets/images/summer-bg.jpg';
import * as winterBg from '@assets/images/winter-bg.jpg';
import * as rainyBg from '@assets/images/rainy-bg.jpg';
import * as sunSvg from '@assets/icons/sun.svg';
import * as cloudRainySvg from '@assets/icons/cloud-rain.svg';
import * as cloudSnowSvg from '@assets/icons/cloud-snow.svg';
import * as pauseSvg from '@assets/icons/pause.svg';

import * as summerAudio from '@assets/sounds/summer.mp3';
import * as winterAudio from '@assets/sounds/winter.mp3';
import * as rainyAudio from '@assets/sounds/rain.mp3';

interface WeatherCardData {
    icon: string;
    background: string;
    audio: string;
}

interface WeatherCard extends HTMLDivElement {
    src: string;
}

const body = document.querySelector('body');
body.style.backgroundImage = `url(${summerBg})`;

const volumeSlider = document.querySelector('.volume-slider') as HTMLInputElement;
const audio = new Audio();
let currentCard: WeatherCard | null = null;

const weatherCardsData: WeatherCardData[] = [
    { icon: sunSvg, background: summerBg, audio: summerAudio },
    { icon: cloudRainySvg, background: rainyBg, audio: rainyAudio },
    { icon: cloudSnowSvg, background: winterBg, audio: winterAudio },
];

volumeSlider.addEventListener('input', (e: Event) => {
    const volume = +(e.target as HTMLInputElement).value / 100;
    audio.volume = volume;
});

function createWeatherCard(data: WeatherCardData): WeatherCard {
    const card = document.createElement('div') as WeatherCard;
    card.className = 'weather-card';
    card.style.backgroundImage = `url(${data.background})`;
    card.style.setProperty('--weather-icon', `url(${data.icon})`);
    card.src = data.audio;
    return card;
}

const container = document.querySelector('.weather-cards');

weatherCardsData.forEach(data => {
    container.appendChild(createWeatherCard(data));
});

container.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('weather-card')) {
        const card = target as WeatherCard;

        const cardData = weatherCardsData.find(data => data.audio === card.src);

        if (currentCard === card) {
            if (audio.paused) {
                audio.play();
                card.style.setProperty('--weather-icon', `url(${cardData?.icon})`);
            } else {
                audio.pause();
                card.style.setProperty('--weather-icon', `url(${pauseSvg})`);
            }
            return;
        }

        if (currentCard) {
            const previousCardData = weatherCardsData.find(data => data.audio === currentCard.src);
            currentCard.style.setProperty('--weather-icon', `url(${previousCardData?.icon})`);
        }

        audio.src = card.src;
        body.style.backgroundImage = card.style.backgroundImage
        audio.load();
        audio.play();
        if (cardData) {
            card.style.setProperty('--weather-icon', `url(${cardData.icon})`);
        }
        currentCard = card;
    }
});

