import { YANDEX_API_KEY } from '@constants/apiKeys';

export const getMapHtml = (): string => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        html, body, #map {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU"></script>
      <script>
        console.log("Загрузка API Яндекс.Карт...");
        try {
          ymaps.ready(function () {
            console.log("API Яндекс.Карт успешно загружен");
            const myMap = new ymaps.Map("map", {
              center: [55.7558, 37.6173],
              zoom: 10,
              controls: ['zoomControl', 'geolocationControl'],
            });

            let selectedPlacemark;

            myMap.events.add('click', function (e) {
              console.log("Клик по карте");
              const coords = e.get('coords');
              const latitude = coords[0];
              const longitude = coords[1];

              if (selectedPlacemark) {
                myMap.geoObjects.remove(selectedPlacemark);
              }

              selectedPlacemark = new ymaps.Placemark([latitude, longitude], {}, {
                preset: 'islands#redDotIcon',
              });
              myMap.geoObjects.add(selectedPlacemark);

              const data = {
                latitude: latitude,
                longitude: longitude,
                address: "Координаты: " + latitude + ", " + longitude,
              };
              console.log("Отправка сообщения в React Native:", data);
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            });

            ymaps.geolocation.get().then(function (res) {
              const userLocation = res.geoObjects.position;
              if (userLocation) {
                myMap.setCenter(userLocation, 15);
                console.log("Местоположение пользователя:", userLocation);
              }
            }, function (err) {
              console.error("Ошибка геолокации:", err);
            });
          }, function (err) {
            console.error("Не удалось загрузить API Яндекс.Карт:", err);
            window.ReactNativeWebView.postMessage(JSON.stringify({
              error: "Не удалось загрузить Яндекс.Карты: " + (err.message || "Неизвестная ошибка")
            }));
          });
        } catch (err) {
          console.error("Глобальная ошибка в скрипте:", err);
          window.ReactNativeWebView.postMessage(JSON.stringify({
            error: "Глобальная ошибка в скрипте: " + (err.message || "Неизвестная ошибка")
          }));
        }
      </script>
    </body>
  </html>
`;