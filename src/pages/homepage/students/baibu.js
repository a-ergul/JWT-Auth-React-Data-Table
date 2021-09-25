import React, { useState, useEffect } from "react"
import MaterialTable from 'material-table'
import AddIcon from '@material-ui/icons/AddBox';
import { MuiThemeProvider, createTheme, FormControlLabel, Switch } from "@material-ui/core";

function BaibuStudents() {

    //texts const&link
    const title="Öğrenci Listesi"
    const url="http://localhost:5000/baibu"
    const name="Öğrenci Adı Soyadı:"
    const year="Doğum Yılı:"
    const gender="Cinsiyeti:"
    const place="Doğduğu Yer:"
    const phone="Telefon Numarası:"

    const [data, setData]= useState([])
    useEffect(() => {
        getStudents()
        
    }, [])
    const getStudents =() => {
        fetch(url).then(resp=>resp.json())
        .then(resp=>setData(resp))
    }

    //set DarkMode
    const [preferDarkMode, setPreferDarkMode]=useState(() =>{
      const mode=localStorage.getItem('_tableDarkMode')
      return mode==="true" || false
  })

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
    const columns= [

        //api inputs
        {title:"Öğrenci Adı", field:"name", validate:rowData=>rowData.name===undefined || rowData.name===""?"Doldurulması Zorunludur":true, headerStyle:{color:"#fff"}},
        {title:"Öğrenci Soyadı", field:"surname",validate:rowData=>rowData.surname===undefined || rowData.surname===""?"Doldurulması Zorunludur":true,headerStyle:{color:"#fff"}},
        {title:"Doğum Yılı", field:"year",headerStyle:{color:"#fff"}},
        {title:"Cinsiyeti", field:"gender",headerStyle:{color:"#fff"}},
        {title:"Doğduğu Yer", field:"place",headerStyle:{color:"#fff"}},
        {title:"Telefon Numarası", field:"phone",headerStyle:{color:"#fff"}},
       
        ]

    return(
        <div className="baibüList">
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
                      icon: 'sticky_note_2',
                      tooltip: 'Notu Göster',
                      render: rowData => {
                        return (
                          <div
                            style={{
                              fontSize: 35,
                              textAlign: 'center',
                              color: 'white',
                              backgroundColor: '#E67B68',
                            }}
                          >
                            Sınav Notu:{rowData.point}
                          </div>
                        )
                      },
                    },{
                        icon: 'info',
                        tooltip: 'Öğrenci Bilgileri',
                        render: rowData => {
                          return (
                            <div
                              style={{
                                fontSize: 25,
                                textAlign: 'center',
                                color: 'white',
                                backgroundColor: '#8194A8',
                              }}
                            ><div>{name}  {rowData.name} {rowData.surname}</div>
                              <div>{year}  {rowData.year}</div>
                              <div>{gender}  {rowData.gender}</div>
                              <div>{place}  {rowData.place}</div>
                              <div>{phone}  {rowData.phone}</div>
                            </div>
                          )
                        },
                      },
                    
                  ]}
            columns={columns} 
            data={data} 
            icons={{ Add: () => <AddIcon /> }}
            title={title}
            localization = {{
                header: {
                    actions: ''
                },
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
                    .then(resp=>{getStudents()
                    resolve()
                    })
               
                }),
                //Edit Button
                onRowUpdate:(newData,oldData)=> new Promise((resolve,reect)=>{

                    fetch(url+"/"+oldData.id,{
                        method:"PUT",
                        headers:{
                            'Content-type':"application/json"
                        },
                        body:JSON.stringify(newData)
                    }).then(resp=>resp.json())
                    .then(resp=>{getStudents()
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
                    .then(resp=>{getStudents()
                    resolve()
                    })
                    
                }),
               
                    
           }}
           //Style Options
            options={{actionsColumnIndex: -1,addRowPosition:"first",
            rowStyle:(data,index)=>index%2==0?{background:"#9B9BB6"}:null ,
            filtering:true, paging:true, pageSize:15,pageSizeOptions:[,15,30,45],
            headerStyle:{background:"#647c96", fontSize:"22px"},
            exportButton:true
            }}
            
            />
            </MuiThemeProvider>
           </div>
        )
}

export default BaibuStudents;