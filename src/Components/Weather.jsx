import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'c3f0427a349448d8951adf0f989ab88b';

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );

      const currentTemperatureCelsius = response.data.main.temp - 273.15;

      const forecastData = forecastResponse.data.list.map((item) => ({
        ...item,
        main: {
          ...item.main,
          temp: item.main.temp - 273.15,
        },
      }));

      setWeatherData({
        current: {
          ...response.data,
          main: {
            ...response.data.main,
            temp: currentTemperatureCelsius,
          },
        },
        forecast: forecastData,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearchClick = () => {
    if (city !== '') {
      fetchWeatherData();
    }
  };
  
 
  return (
    <Container>
      <InputGroup className="mb-3 mt-4">
        <InputGroup.Text id="basic-addon1">
          <i className="bi bi-geo-alt-fill"></i>
        </InputGroup.Text>
        <Form.Control
          placeholder="Enter City"
          aria-label="Enter City"
          aria-describedby="basic-addon1"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </InputGroup>
        
      {weatherData && (
        <Row>
            <Col>
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Subtitle className="fs-6 text-muted">today</Card.Subtitle>
              <Card.Title className="fs-1">
                {weatherData.current.name}, {weatherData.current.sys.country}
              </Card.Title>
              <Card.Subtitle className="fs-3 mb-2 text-muted">
                Temperature: {weatherData.current.main.temp.toFixed(2)} °C
              </Card.Subtitle>
              <Card.Subtitle className="fs-3 mb-2 text-muted">
                Weather: {weatherData.current.weather[0].description}
              </Card.Subtitle>
            </Card.Body>
          </Card>
          </Col>
          <Col>
          <h2>Next 5 Days </h2>
          <div className="forecast-container">
            {weatherData.forecast.slice(0, 5).map((item, index) => (
              <Card style={{ width: '25rem' }} key={index} className="mb-3">
                <Card.Body>
                  <Card.Subtitle className="fs-3 mb-2 text-muted">
                    Temperature: {item.main.temp.toFixed(2)} °C
                  </Card.Subtitle>
                  <Card.Subtitle className="fs-3 mb-2 text-muted">
                    Weather: {item.weather[0].description}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
          </div>
          </Col>
            
        </Row>
        
      )}
    </Container>
  );
};

export default Weather;
