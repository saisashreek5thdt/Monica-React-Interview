import logo from './logo.svg';
import './App.css';
import react, { useEffect, useState } from "react"

function App() {

  const [data,setData] = useState([])
  const [pagination,setpagination] = useState(10)
  const [startPagination,setStartPagination  ] = useState(0)
  const [dynamicApiValue,setDynamicApiValue] = useState("")

  const countryFunc = async ()=>{
    let api = `http://universities.hipolabs.com/search?country=${dynamicApiValue}`;
  let response = await fetch(api)
  let result = await response.json()
  setData(result)
  console.log(result)
  }

  // useEffect(()=>{
  //   countryFunc()

  // },[])

  const addPagination = () =>{
    console.log("pagination")

   
    setStartPagination(pagination)
    setpagination(pagination + 10)

  }
 const getSearchValue = (e)=>{

  setDynamicApiValue(e.target.value)

 }


  return (
    <>
    <div>
      <input value = {dynamicApiValue || ""} onChange = {(e)=>getSearchValue(e)}/>
      <button onClick= {()=>{countryFunc()}}> getResult</button>
      {  data.length>0?
        <table>
          <tr>
            <th>
              country Name
            </th>
            <th>
              name
            </th>
            <th>
              domain
            </th>
          </tr>
    {    data.map((item,index)=>{ 
  
            return startPagination < index && pagination>index? ( <tr>
              <td>
          {item.country}
        </td>
        <td>
          {item.name}
        </td>
        <td>
          {item.domains}
        </td>
      </tr>):null
          
        })}
        </table>
    :null  }
    

    </div>
  {pagination>1?  <button type = "button" onClick = {()=> addPagination()}> next Record</button>:null}
    </>
  );
}

export default App;
