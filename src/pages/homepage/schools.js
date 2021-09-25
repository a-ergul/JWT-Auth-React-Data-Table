import React, { useState, useEffect } from "react"
import MaterialTable from 'material-table'
import AddIcon from '@material-ui/icons/AddBox';
import {Link,} from '@material-ui/core';
import { MuiThemeProvider, createTheme, FormControlLabel, Switch } from "@material-ui/core";
import './schools.css'


function SchoolList() {

    //texts const&link
    const title="Türkiye'deki Üniversiteler"
    const url="http://localhost:4000/schools"

    const isLoginTrue = JSON.parse(localStorage.getItem("login"));

    //set DarkMode
    const [preferDarkMode, setPreferDarkMode]=useState(() =>{
        const mode=localStorage.getItem('_tableDarkMode')
        return mode==="true" || false
    })
    
    const [data, setData]= useState([])
    useEffect(() => {
        getSchools()
        
    }, [])
    const getSchools =() => {
        fetch(url).then(resp=>resp.json())
        .then(resp=>setData(resp))
    }
    const columns= [

        //api inputs
        {title:"Şehir", field:"city", validate:rowData=>rowData.city===undefined || rowData.city===""?"Doldurulması Zorunludur":true, headerStyle:{color:"#fff"}},
        {title:"Okul İsmi", field:"name",validate:rowData=>rowData.name===undefined || rowData.name===""?"Doldurulması Zorunludur":true,headerStyle:{color:"#fff"}},
        {title:"Tür", field:"tur",headerStyle:{color:"#fff"}},
        {title:"Kuruluş", field:"date",headerStyle:{color:"#fff"}},
        {title:"Kısaltma", field:"url", headerStyle:{color:"#fff"},validate:rowData=>rowData.name===undefined || rowData.name===""?"Doldurulması Zorunludur":true},
        {title:"Liste", headerStyle:{color:"#fff"},render:rowData=><Link href={`/${rowData.url}`} target="_blank">Öğrenci Listesi</Link>}
       
        ]

    //dark mode
    const theme=createTheme({
        palette:{
            type:preferDarkMode? 'dark' : 'light'
        }
    })

    //darkmodestate change
const handleDarkModeChange=()=>{
    setPreferDarkMode(!preferDarkMode)
    localStorage.setItem('_tableDarkMode',!preferDarkMode)
}
return(
        <div className="SchoolList">
            <FormControlLabel
          value="top"
          onChange={handleDarkModeChange}
          control={<Switch color="primary" checked={preferDarkMode}/>}
          label="Koyu Mod"
          labelPlacement="start"
        />
            <MuiThemeProvider theme={theme}>
            <MaterialTable 
            detailPanel={[
                {
                  tooltip: 'Detaylı Bilgi',
                  render: rowData => {
                    return (
                      <div
                        style={{
                          fontSize: 15,
                          textAlign: 'center',
                          color: 'white',
                          backgroundColor: '#647c96',
                        }}
                      >
                        {rowData.content}
                      </div>)
                  },},
                ]}
            columns={columns} 
            data={data} 
            icons={{ Add: () => <AddIcon /> }}
            title={title}
            localization = {{
                header: {
                    actions: ''},
            }}
            
            //Add Button
            editable={{
                onRowAdd:(newData)=>new Promise((resolve,reject)=>{
                    fetch(url,{
                        method:"POST",
                        headers:{
                            'Content-type':"application/json"
                        },
                        body:JSON.stringify(newData)
                    }).then(resp=>resp.json())
                    .then(resp=>{getSchools()
                    resolve()
                    })
               }),
                //Edit Button
                onRowUpdate:(newData,oldData)=> new Promise((resolve,reect)=>{
                    fetch(url+"/"+oldData.id,{
                        method:"PUT",
                        headers:{
                            'Content-type':"application/json"},
                        body:JSON.stringify(newData)
                    }).then(resp=>resp.json())
                    .then(resp=>{getSchools()
                    resolve()
                    })
                }),
                //Delete Button
                onRowDelete:(oldData)=> new Promise((resolve,reect)=>{
                    fetch(url+"/"+oldData.id,{
                        method:"DELETE",
                        headers:{
                            'Content-type':"application/json"
                        },
                        body:JSON.stringify(oldData)
                    }).then(resp=>resp.json())
                    .then(resp=>{getSchools()
                    resolve()
                    })
                    }),}}
                //Style Options  
            options={{actionsColumnIndex: -1,addRowPosition:"first",
            rowStyle:(data,index)=>index%2==0?{background:"#9B9BB6"}:null ,
            filtering:true, paging:true, pageSize:15,pageSizeOptions:[,15,30,45],
            headerStyle:{background:"#647c96", fontSize:"22px"},
            exportButton:true}}

        //RowClick
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
            />
            </MuiThemeProvider>
             </div>)}

export default SchoolList;

//https://levelup.gitconnected.com/react-material-table-crud-operations-with-restful-api-data-ca1af738d3c5
//https://github.com/jbetancur/react-data-table-component
//https://mui.com/components/tables/