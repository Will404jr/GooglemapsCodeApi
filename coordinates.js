const googleMaps = require('@google/maps');

const googleMapsClient = googleMaps.createClient({
    key: 'AIzaSyCTQJJmkkyfLHl4ZGbomuxyUVu_0co6zy8'
});

const getCoordinates = (location) => {
    return new Promise((resolve, reject) => {
        googleMapsClient.geocode({
            address: location
        }, (err, response) => {
            if (err) {
                reject(err);
            } else {
                const result = response.json.results[0];
                const coordinates = result.geometry.location;
                resolve(coordinates);
            }
        });
    });
};

getCoordinates('Makerere University, Kampala')
    .then((coordinates) => {
        console.log(coordinates);
    })
    .catch((err) => {
        console.error(err);
    });