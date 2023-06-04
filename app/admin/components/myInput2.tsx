
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

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Тапсырыс саны бойынша клиенттер статистикасы',
    },
  },
};

// export const data = {
//   labels: ['Адилет', 'Test2', 'Murat', 'Dauren', 'Yelzhas', 'Akerke', 'Adil'],
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [11, 10, 8, 6, 5, 3, 3],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//   ],
// };

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


const MyInput: React.FC<BasePropertyProps> = (props) => {
  const { record } = props
  
  const [datas, setData] = useState(null)
  useEffect(() => {
    axios.get('https://admin-Foodtuck.devup.kz/api/cars/chart1')
    .then(response => {
      const groupedOrders = {};

      // Группировка заказов по идентификаторам клиентов
      for (const order of response.data.orders) {
        const clientId = order.client_id;
        if (!groupedOrders[clientId]) {
          groupedOrders[clientId] = [];
        }
        groupedOrders[clientId].push(order);
      }

      // Создание результирующего объекта в требуемом формате
      const result = {
        labels: [],
        datasets: [
          {
            label: 'Dataset 1',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

      // Заполнение результирующего объекта данными из клиентов и групп заказов
      for (const client of response.data.clients) {
        const clientId = client.id;
        result.labels.push(`${client.name} ${client.surname}`);

        if (groupedOrders[clientId]) {
          result.datasets[0].data.push(groupedOrders[clientId].length);
        } else {
          result.datasets[0].data.push(0);
        }
      }
      setData(result)
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
