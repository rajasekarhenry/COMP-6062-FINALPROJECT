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
    computed: {
        fullName() {
            return this.user.name ? this.user.name : this.myFullName;
        }
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
                    this.user.photo = data.profile_picture;
                });
        },
        getWeather() {
            const { city, province, country } = this.weatherInput;
            const url = `http://comp6062.liamstewart.ca/weather-information?city=${city}&province=${province}&country=${country}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind_speed;
                    this.weather.description = data.weather_description;
                });
        },
        getDefinition() {
            const url = `https://comp6062.liamstewart.ca/define?word=${this.dictionaryInput}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const result = data[0];
                    this.dictionary.word = result.word;
                    this.dictionary.phonetic = result.phonetic;
                    this.dictionary.definition = result.definition;
                });
        }
    }
});

app.mount('#app');
