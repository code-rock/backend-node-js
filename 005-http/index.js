const http = require('http');
const { argv } = require('yargs');
const { _ } = argv;
const weatherAPIKey = process.env.weatherAPIKey;
const url = `http://api.weatherstack.com/current?access_key=${weatherAPIKey}&query=${_[0]}`;
let data = {};

const getWeatherComponent = (current, location) => (`
    <link
        rel="stylesheet" 
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
        crossorigin="anonymous"
    />
    <div class="container">
        <div class="card" style="width: 10rem; margin-top: 20px">
            ${current.weather_icons ? `<img src=${current.weather_icons[0]} class="card-img-top" alt="...">` : ''}
            <div class="card-body">
                <h5 class="card-title">${location.name ? location.name : ''}</h5>
                <p class="card-text">${current.weather_descriptions ? current.weather_descriptions : ''}</p>
                <p class="card-text">${current.temperature ? current.temperature : ''}</p>
            </div>
        </div>
    </div>
`);

const getWeather = () => http.get(url, (res) => {
    const { statusCode } = res;

    if (statusCode !== 200) {
        console.error(`Status Code: ${statusCode}`);
        return;
    }

    res.setEncoding('utf8');

    let rawData = '';
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
        data = JSON.parse(rawData);
    })
}).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});

http.createServer((request, response) => {
    const { url } = request;

    response.setHeader("UserId", 12);
    response.setHeader("Content-Type", "text/html; charset=utf-8;");
    
    if (url === '/') {
        getWeather();
        response.write(data.current ? getWeatherComponent(data.current, data.location) :'<p>Грузится</p>');
    } else {
        response.statusCode = 404;
        response.write('<h2>Not found</h2>');
    }
    
    response.end()
}).listen(process.env.PORT)