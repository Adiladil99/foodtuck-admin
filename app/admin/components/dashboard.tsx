import React, { useEffect, useState } from 'react'
import { ApiClient } from 'adminjs'
import styled from 'styled-components'
import {
 Box,
 H2,
 H5,
 H6,
 H4,
 Icon,
 Text,
 Table, TableBody, TableCell, TableHead, TableRow,
 Illustration,
 IllustrationProps,
 Button,
} from '@adminjs/design-system'

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const pageHeaderHeight = 284
const pageHeaderPaddingY = 74
const pageHeaderPaddingX = 250

export const DashboardHeader: React.FC = () => {
 return (
  <Box position="relative" overflow="hidden" data-css="default-dashboard">
   <Box
    position="absolute"
    top={50}
    left={-10}
    opacity={[0.2, 0.4, 1]}
    animate
   >
    <img style={{width: "250px"}} src="/phar1.png" />
    {/* <Illustration variant="FileSearch" /> //  'Moon' | 'Rocket' | 'Astronaut' | 'DocumentCheck' | 'DocumentSearch' | 'FileSearch' | 'FlagInCog' | 'Folders' | 'Launch' | 'Planet' | 'AdminJSLogo' | 'GithubLogo' | 'SlackLogo' | */}
   </Box>
   <Box
    position="absolute"
    top={10}
    right={15}
    opacity={[0.2, 0.4, 1]}
    animate
   >
   <img style={{width: "250px"}} src="/phar2.png" />
   </Box>
   <Box
    bg="grey100"
    height={pageHeaderHeight}
    py={pageHeaderPaddingY}
    px={['default', 'lg', pageHeaderPaddingX]}
   >
    <Text textAlign="center" color="white">
     <H2>Foodtuck жүйесін басқару жүйесі</H2>
     <Text opacity={0.8}>
     Foodtuck үшін басқару тақтасы жоба параметрлерін басқаруға, жаңа беттерді қосуға және ескілерін жоюға, ресурстың сыртқы көрінісін өзгертуге және мазмұнды өңдеуге мүмкіндік береді.
     </Text>
    </Text>
   </Box>
  </Box>
 )
}

type BoxType = {
 variant: string;
 title: string;
 subtitle: string;
 href: string;
}

const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
  color: ${({ theme }): string => theme.colors.grey100};
  text-decoration: none;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${({ theme }): string => theme.colors.primary100};
    box-shadow: ${({ theme }): string => theme.shadows.cardHover};
  }
`

Card.defaultProps = {
 variant: 'white',
 boxShadow: 'card',
}

export const Dashboard: React.FC = () => {
  const datas = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
 const [data, setData] = useState(null)
 const api = new ApiClient()
 useEffect(() => {
  api.getDashboard()
   .then((response) => {  
    console.log(response.data);
    
    setData(response.data.length) // { message: 'Hello World' }
   })
   .catch((error) => {
    // handle any errors
   });
 }, []);
 return (
  <Box>
   <DashboardHeader />
  </Box>
 )
}


export default Dashboard