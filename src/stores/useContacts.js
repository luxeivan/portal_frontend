import { useState, useEffect } from "react";
import axios from "axios";

// Кастомный хук для загрузки контактов
export const useContacts = () => {
  // Состояние для центров и процесса загрузки
  const [contactCenters, setContactCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Получаем адреса серверов из переменных окружения
  const backServer = process.env.REACT_APP_BACK_BACK_SERVER;
  const backPhotoServer = process.env.REACT_APP_BACK_API_SERVER;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Делаем запрос на сервер за контактами
        const response = await axios.get(`${backServer}/api/contacts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          withCredentials: true,
        });
        console.log("Полученные данные с API:", response.data);

        if (Array.isArray(response.data)) {
          // Обрабатываем данные и добавляем изображения и координаты
          const centersWithPhotos = response.data.map((center) => {
            console.log(center.photos)

            const images = center.photos
              ? center.photos.map((photo) => {
                return {
                  src: `${backPhotoServer}/public/${photo.ПутьКФайлу}`,
                  width: photo.width || 800,
                  height: photo.height || 600,
                }
              })
              : [];

            // Парсим координаты из строк в числа
            const latitude = parseFloat(center.latitude);
            const longitude = parseFloat(center.longitude);

            // Проверяем, есть ли валидные координаты
            const hasCoordinates =
              !isNaN(latitude) && !isNaN(longitude);

            return {
              ...center,
              images,
              // Если координаты валидны, сохраняем их, иначе null
              coordinates: hasCoordinates ? [latitude, longitude] : null,
            };
          });
          setContactCenters(centersWithPhotos);
        } else {
          console.error("Некорректные данные с бэка");
        }
      } catch (error) {
        console.error("Ошибка при получении данных из API:", error);
      } finally {
        // Ну наконец-то, загрузка закончена
        setLoading(false);
      }
    };

    fetchData();
  }, [backServer, backPhotoServer]);

  return { contactCenters, loading };
};


// import { useState, useEffect } from "react";
// import axios from "axios";

// export const useContacts = () => {
//   // Состояние для центров и процесса загрузки
//   const [contactCenters, setContactCenters] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Получаем адреса серверов из переменных окружения
//   const backServer = process.env.REACT_APP_BACK_BACK_SERVER;
//   const backPhotoServer = process.env.REACT_APP_BACK_API_SERVER;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Делаем запрос на сервер за контактами
//         const response = await axios.get(`${backServer}/api/contacts`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           withCredentials: true,
//         });
//         console.log("Полученные данные с API:", response.data);

//         if (Array.isArray(response.data)) {
//           // Обрабатываем данные и добавляем изображения
//           const centersWithPhotos = response.data.map((center) => {
//             const images = center.photos
//               ? center.photos.map((photo) => ({
//                   src: `${backPhotoServer}/public/${photo.ПутьКФайлу}`,
//                   width: photo.width || 800,
//                   height: photo.height || 600,
//                 }))
//               : [];
//             return { ...center, images };
//           });
//           setContactCenters(centersWithPhotos);
//         } else {
//           console.error("Некорректные данные с бэка");
//         }
//       } catch (error) {
//         console.error("Ошибка при получении данных из API:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [backServer, backPhotoServer]);

//   return { contactCenters, loading };
// };
