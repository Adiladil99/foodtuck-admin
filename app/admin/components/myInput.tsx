
import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import { Box, BasePropertyProps } from '@adminjs/design-system'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Көліктер бойынша тапсырыстар саны статистикасы',
    },
  },
};

const labels = ['Ағымдағы жыл'];

const data = {
  labels,
  datasets: [
    {
      label: 'Toyota Camry',
      data: [2],
      backgroundColor: 'red',
    },
    {
      label: 'Toyota Rav4',
      data: [1],
      backgroundColor: 'green',
    },
  ],
};

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const MyInput: React.FC<BasePropertyProps> = (props) => {
  const { record } = props
  const [datas, setData] = useState(null)
  useEffect(() => {
    axios.get('https://admin-Foodtuck.devup.kz/api/cars/chart1')
    .then(response => {
        const result = {};
        // Инициализируем счетчики в нулевыми значениями для всех автомобилей
        for (const car of response.data.cars) {
          result[car.id] = { id: car.id, name: car.name, count: 0 };
        }

        // Перебираем заказы и увеличиваем счетчик автомобиля, связанного с тарифом в заказе
        for (const order of response.data.orders) {
          const tariff = response.data.tarrif.find(t => t.id === order.type_tariff);
          if (tariff) {
            const carCount = result[tariff.car_id].count;
            result[tariff.car_id].count = carCount + 1;
          }
        }

        // Преобразуем объект результата в массив
        const finalResult = Object.values(result);
        const datasets = finalResult.map(item => {
          return {
            label: item.name,
            data: [item.count],
            backgroundColor: getRandomColor()
          };
        });
      // Обработка успешного ответа
      setData({
        labels,
        datasets,
      })
    })
    .catch(error => {
      // Обработка ошибки
      console.error(error);
    });
  }, []);
  
  return (<Box
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
    {datas ? (<Bar options={options} data={datas} />) : 'Мәліметтер жүктелуде'}
    </Box>
  )
}

export default MyInput
