
import React, {useEffect, useState} from 'react'  // Imports the React library


function Table({ title, columns, data }) {
  return (
      <div>
          <h2>{title}</h2>
          <table className="styled-table">
              <thead>
                  <tr>
                      {columns.map((col, idx) => (
                          <th key={idx}>{col}</th>
                      ))}
                  </tr>
              </thead>
              <tbody>
                  {data.map((item, i) => (
                      <tr key={i}>
                          {Object.values(item).map((value, j) => (
                              <td key={j}>{value}</td>
                          ))}
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

function App() {
    const [data, setData] = useState([])            //  Initializes a state variable called data and a function setData to update this state.
    const [joins, setJoins] = useState([])
    useEffect(() => {                               // define the userEffect hook, useEffect(() => { ... }, [])
       fetch('http://localhost:8081/listall')       // call backend route
       .then(response => response.json())           // Converts the response from the fetch request into JSON format.
       .then(data => setData(data))                 // Updates the state variable data with the fetched data using the setData function.
       .catch(err => console.log(err));             // logs the error msg to the console.
    }, [])
    
    useEffect(() => {                               // define the userEffect hook, useEffect(() => { ... }, [])
       fetch('http://localhost:8081/joins')       // call backend route
       .then(response => response.json())           // Converts the response from the fetch request into JSON format.
       .then(data => setJoins(data))                 // Updates the state variable data with the fetched data using the setData function.
       .catch(err => console.log(err));             // logs the error msg to the console.
    }, [])                                          // The empty dependency array [] means it only runs once when the component is first rendered.

    const joinConfig = [
      {
          title: 'Join 1',
          columns: ['Store Name', 'Location', 'Collection Name', 'Description'],
          data: joins[0]?.join1 || [],
      },
      {
          title: 'Join 2',
          columns: ['Store Name', 'Location', 'Collection Name', 'Description'],
          data: joins[1]?.join2 || [],
      },
      {
          title: 'Join 3',
          columns: ['Shop Name', 'Item Name', 'Location', 'Price'],
          data: joins[2]?.join3 || [],
      },
      {
        title: 'Join 4',
        columns: ['Shop Name', 'Item Name', 'Location', 'Price'],
        data: joins[3]?.join4 || [],
      },
      {
        title: 'Join 5',
        columns: ['Agency Name', 'Package Name', 'Location', 'Description'],
        data: joins[4]?.join5 || [],
      },
      {
        title: 'Join 6',
        columns: ['Agency Name', 'Package Name', 'Location', 'Description'],
        data: joins[5]?.join6 || [],
      },
      {
        title: 'Join 7',
        columns: ['Agent Name', 'Property Type', 'Address', 'Location'],
        data: joins[6]?.join7 || [],
      },
      {
        title: 'Join 8',
        columns: ['Agent Name', 'Property Type', 'Address', 'Location'],
        data: joins[7]?.join8 || [],
      },
      {
        title: 'Join 9',
        columns: ['Garden Name', 'Species Name', 'Description', 'Location'],
        data: joins[8]?.join9 || [],
      },
      {
        title: 'Join 10',
        columns: ['Garden Name', 'Species Name', 'Description', 'Location'],
        data: joins[9]?.join10 || [],
      }
  ];

return(                                             // to be rendered in the UI
    <div>
      <h2>The Listall Table</h2>
       <table class="styled-table">
       <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Location</th>
        </tr>
       </thead>
       <tbody>
             {data.map((d, i) => (                 // Maps over the data array to create a table row (<tr>) for each item d in data. The index i is used as a unique key for each row.
                  <tr key={i}>
                    <td>{d.GardenID}</td>
                    <td>{d.GardenName}</td>
                    <td>{d.Location}</td>
                  </tr>
             ))}
       </tbody>
       </table>

       {joinConfig.map((join, index) => (
        <Table key={index} title={join.title} columns={join.columns} data={join.data}/>
       ))}
    </div>
)
}

export default App                               // so it can be imported in other files.