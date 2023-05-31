// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const App = () => {
//   const [sensorValue, setSensorValue] = useState([]);

//   useEffect(() => {
//     const socket = io('http://localhost:5000');

//     socket.on('connect', () => {
//       console.log('WebSocket connection established');
//     });

//     socket.on('updateSensorData', (data) => {
//       console.log(data)
//       const { value } = data;

//       setSensorValue(` ${value}`);

//     });

//     socket.on('disconnect', () => {
//       console.log('WebSocket connection closed');
//     });
//     console.log(sensorValue)

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // const handleClick = () => {
//   //   const mes='reset'
//   //   socket.emit('reset',mes)
//   // };

//   return (
//     <div>
//       <div>{sensorValue}</div>
//       {/* <div>
//       <button onClick={handleClick}>Reset</button>
//       </div> */}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import "animate.css";
import {
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Heading,
  TableContainer,
  Image,
} from "@chakra-ui/react";
import "./assets/style.css";

const App = () => {
  const [sensorValue, setSensorValue] = useState([]);
  const socket = io("http://localhost:5000");
  const handleClick = () => {
    const mes = "reset";
    socket.emit("reset", mes);
  };

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("WebSocket connection established");
    });

    socket.on("updateSensorData", (event) => {
      // console.log(event)
      console.log(Object.values(event));
      setSensorValue(Object.values(event));
      // setSensorValue(event)
      // Process the received data as needed
      // console.log(recievedData);
      // setXbeeData(recievedData);
      // const { value } = data;

      // setSensorValue(` ${value}`);
    });
    const handleClick = () => {
      const mes = "reset";
      socket.emit("reset", mes);
    };
    // console.log(sensorValue)

    socket.on("disconnect", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 500, pv: 2500, amt: 2500 },
    { name: "Page C", uv: 600, pv: 2600, amt: 2600 },
  ];
  return (
    <div className="main_container">
      <Flex flexDir={"column"} alignItems={"center"}>
        <Flex
          w={"90%"}
          justifyContent={"space-between"}
          gap={"1em"}
          mt="2em"
          className="main_body"
        >
          <Flex
            flexDirection={"column"}
            w="60%"
            className="graph animate_animated animate_fadeInLeft"
            border="2px solid #D02323"
            borderRadius={"10px"}
            p={"1em"}
          >
            <Flex>
              <Heading fontFamily={"inherit"}>Telemetry</Heading>
            </Flex>
            <Flex gap={10} flexWrap={"wrap"}>
              <Box>
                <LineChart width={300} height={200} data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#d02323" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Altitude",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                </LineChart>
              </Box>
              <Box>
                <LineChart width={300} height={200} data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#d02323" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Speed",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                </LineChart>
              </Box>
              <Box>
                <LineChart width={300} height={200} data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#d02323" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </LineChart>
              </Box>
              <Box>
                <LineChart width={300} height={200} data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#d02323" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                </LineChart>
              </Box>
            </Flex>
          </Flex>
          <Flex
            flexDirection={"column"}
            w={"40%"}
            className="pictures animate_animated animate_fadeInRight"
            border="2px solid #D02323"
            borderRadius={"10px"}
            p="1em"
          >
            <Flex>
              <Heading fontFamily={"inherit"}>Pictures</Heading>
            </Flex>
            <Flex>
              <Image
                boxSize={"100%"}
                objectFit={"cover"}
                src="test.jpg"
                alt="test"
              />
            </Flex>
            <Flex gap={3} m={"1em auto 0 auto"}>
              <Box>
                <Button _hover={{ backgroundColor: "#d02323", color: "white" }}>
                  Initialize
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={handleClick}
                  _hover={{ backgroundColor: "#d02323", color: "white" }}
                >
                  Reset
                </Button>
              </Box>
              <Box>
                <Button _hover={{ backgroundColor: "#d02323", color: "white" }}>
                  Add Plot
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          m={"1em auto 0 auto"}
          className="table animate_animated animate_fadeInDown"
        >
          <TableContainer
            border="2px solid #D02323"
            borderRadius={"10px"}
            className="table-container" 
            maxH="20em"
            overflowY="scroll"
            overflowX={"hidden"}
            
          >
            <Table variant="simple">
              <Thead backgroundColor={"#D02323"}>
                <Tr>
                  <Th color="white">Team ID</Th>
                  <Th color="white">Packet ID</Th>
                  <Th color="white">Time</Th>
                  <Th color="white">Latitude</Th>
                  <Th color="white">Speed</Th>
                  <Th color="white">ALtitude</Th>
                  <Th color="white">Longitude</Th>
                  <Th color="white">Photos</Th>
                  <Th color="white">Longitude</Th>
                  <Th color="white">Photos</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* {sensorValue.map((element, index) => (
                    <Tr key={index}>
                      <Td>{element[0]}</Td>
                      <Td>{element[1]}</Td>
                      <Td>{element[2]}</Td>
                      <Td>{element[3]}</Td>
                       <Td>{element[4]}</Td>
                      <Td>{element[5]}</Td>
                      <Td>{element[6]}</Td>
                      <Td>{element[7]}</Td>
                      <Td>{element[8]}</Td>
                      <Td>{element[9]}</Td>
                    </Tr>
                  ))} */}
                <Tr>
                  <Td>a </Td>
                  <Td>b</Td>
                  <Td>c</Td>
                  <Td>d</Td>
                  <Td>e</Td>
                  <Td>q</Td>
                  <Td>w</Td>
                  <Td>e</Td>
                  <Td>r</Td>
                  <Td>t</Td>
                </Tr>
                <Tr>
                  <Td>a </Td>
                  <Td>b</Td>
                  <Td>c</Td>
                  <Td>d</Td>
                  <Td>e</Td>
                  <Td>q</Td>
                  <Td>w</Td>
                  <Td>e</Td>
                  <Td>r</Td>
                  <Td>t</Td>
                </Tr>
                <Tr>
                  <Td>a </Td>
                  <Td>b</Td>
                  <Td>c</Td>
                  <Td>d</Td>
                  <Td>e</Td>
                  <Td>q</Td>
                  <Td>w</Td>
                  <Td>e</Td>
                  <Td>r</Td>
                  <Td>t</Td>
                </Tr>
                <Tr>
                  <Td>a </Td>
                  <Td>b</Td>
                  <Td>c</Td>
                  <Td>d</Td>
                  <Td>e</Td>
                  <Td>q</Td>
                  <Td>w</Td>
                  <Td>e</Td>
                  <Td>r</Td>
                  <Td>t</Td>
                </Tr>
                <Tr>
                  <Td>a </Td>
                  <Td>b</Td>
                  <Td>c</Td>
                  <Td>d</Td>
                  <Td>e</Td>
                  <Td>q</Td>
                  <Td>w</Td>
                  <Td>e</Td>
                  <Td>r</Td>
                  <Td>t</Td>
                </Tr>
                <Tr>
                  <Td>a </Td>
                  <Td>b</Td>
                  <Td>c</Td>
                  <Td>d</Td>
                  <Td>e</Td>
                  <Td>q</Td>
                  <Td>w</Td>
                  <Td>e</Td>
                  <Td>r</Td>
                  <Td>t</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
      {/* <div><button onClick={handleClick}>reset</button></div> */}
    </div>
  );
};

export default App;
