const express = require('express');
const path = require('path');
const googleMaps = require('@google/maps');

const app = express();
const port = 3000;

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getCoordinates', async(req, res) => {
    const location = req.query.location || 'Kampala, Uganda';

    try {
        const coordinates = await getCoordinates(location);
        res.json(coordinates);
    } catch (error) {
        res.status(500).json({ error: 'Error getting coordinates' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});