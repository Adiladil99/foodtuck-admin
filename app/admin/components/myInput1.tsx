
import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import { Box, BasePropertyProps } from '@adminjs/design-system'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ['1 часов', '4 часа', '6 часов', '25 часов', 'Неделья'],
//   datasets: [
//     {
//       label: 'Количество заказов',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };


const MyInput: React.FC<BasePropertyProps> = (props) => {
  const { record } = props
  const [datas, setData] = useState(null)
  useEffect(() => {
    axios.get('https://admin-Foodtuck.devup.kz/api/cars/chart1')
    .then(response => {
      const result = {
        labels: [],
        datasets: [{
          label: 'Количество заказов',
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        }]
      };
      
      // Получаем уникальные значения type_tariff из заказов
      const uniqueTypeTariffs = [...new Set(response.data.orders.map(order => order.type_tariff))];
      
      // Для каждого уникального type_tariff
      uniqueTypeTariffs.forEach(typeTariff => {
        // Находим соответствующий объект tariff
        const tariff = response.data.tarrif.find(tariff => tariff.id === typeTariff);
      
        // Если найден tariff
        if (tariff) {
          // Добавляем тип в labels
          result.labels.push(tariff.type);
      
          // Находим количество заказов с данным type_tariff
          const count = response.data.orders.filter(order => order.type_tariff === typeTariff).length;
      
          // Добавляем количество заказов в data
          result.datasets[0].data.push(count);
      
          // Генерируем случайные цвета для backgroundColor и borderColor
          const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
      
          // Добавляем цвета в backgroundColor и borderColor
          result.datasets[0].backgroundColor.push(randomColor);
          result.datasets[0].borderColor.push(randomColor);
        }
      });
      
      setData(result)
    })
    .catch(error => {
      // Обработка ошибки
      console.error(error);
    });
  }, []);

  return (
  <Box
    mt={['xl', 'xl', '50px']}  
    p="lg"
    mb="xl"
    mx={[0, 0, 0, 'auto']}
    px={['default', 'lg', 'xxl', '0']}
    position="relative"
    flex
    flexDirection="row"
    flexWrap="wrap"
    width={[1, 1, 1, 1024]}
   >
      {datas ? (<Pie data={datas} />) : "Мәліметтер жүктелуде"} 
    </Box>
  )
}

export default MyInput
