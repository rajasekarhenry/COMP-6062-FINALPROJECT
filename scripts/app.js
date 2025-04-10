
const app = Vue.createApp({
    data() {
        return {
            myFullName: 'Rohan Rajasekar Henry',
            user: {
                name: '',
                age: '',
                photo: ''
            },
            weatherInput: {
                city: 'London',
                province: 'Ontario',
                country: 'Canada'
            },
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            dictionaryInput: '',
            dictionary: {
                word: '',
                phonetic: '',
                definition: ''
            }
        };
    },
    mounted() {
        this.getUserProfile();
        this.getWeather();
    },
    methods: {
        getUserProfile() {
            fetch('http://comp6062.liamstewart.ca/random-user-profile')
                .then(response => response.json())
                .then(data => {
                    this.user.name = data.first_name + ' ' + data.last_name;
                    this.user.age = data.age;
                    this.user.photo = data.photo;
                });
        },
        getWeather() {
            const url = `http://comp6062.liamstewart.ca/weather-information?city=${this.weatherInput.city}&province=${this.weatherInput.province}&country=${this.weatherInput.country}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                });
        },
        getDefinition() {
            fetch(`https://comp6062.liamstewart.ca/define?word=${this.dictionaryInput}`)
                .then(response => response.json())
                .then(data => {
                    this.dictionary.word = data.word;
                    this.dictionary.phonetic = data.phonetic;
                    this.dictionary.definition = data.definition;
                });
        }
    }
});
app.mount('#app');
