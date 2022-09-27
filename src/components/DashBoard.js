import axios from 'axios';
import React, { useEffect, useState } from 'react'
import loadings from '../loading.svg'

function DashBoard() {
  let [mentor,setMentor] = useState([]);
  let [student,setStudent] = useState([]);
  const [dsloding,setdsloding] = useState(false);
  const [dmloding,setdmloding] = useState(false);
  const [Studentloading,studentsetloading] = useState(false);
  const [mentorLoadind,setMentorloadind] = useState(false);

  
 
 

  useEffect(() => {
    loadingMentor();
    loadingStudent();
  }, []);



  // get mentor data from mock api
  const loadingMentor = async () => {
    setMentorloadind(true)
    try {
      let value = await axios.get('https://630f267c379256341888b141.mockapi.io/mentor');
    setMentor(value.data);
    if(value.status===200){
      setMentorloadind(false)
    }
  }
     catch (error) {
      console.log(error);
    }
  }
  // get student data from mock api
  const loadingStudent = async () => {
    studentsetloading(true)
    try {
      let value = await axios.get('https://630f267c379256341888b141.mockapi.io/student');
    setStudent(value.data);
    if(value.status===200){
      studentsetloading(false)
    }
    } catch (error) {
      console.log(error);
    }
  }







  // student delete data from mock api
  async function studentDelete(id,name,name1) {
    setdsloding(true)
   try {
   
  
    if(mentor.assignStudent === ""){
      await axios.delete(`https://630f267c379256341888b141.mockapi.io/student/${id}`)

    setdsloding(false)
    loadingMentor();
    loadingStudent();
      
  
     
  }
  else{
    await axios.delete(`https://630f267c379256341888b141.mockapi.io/student/${id}`)
    setdsloding(false)
    loadingMentor();
    loadingStudent();


        let stu = mentor.filter((item)=>{
      
          return item.name === name});
        
          let index = stu[0].assignStudent.findIndex((item)=>item === name1)
          stu[0].assignStudent.splice(index, 1)
         
         console.log("index:",index);
         console.log("id:",stu[0].id);
         await axios.put(`https://630f267c379256341888b141.mockapi.io/mentor/${stu[0].id}`,{
          
          name:stu[0].name,
          email:stu[0].email,
          mobile:stu[0].mobile,
          assignStudent:stu[0].assignStudent,
          id:stu[0].id,
      
         })
         setdsloding(false)
         loadingMentor();
         loadingStudent();
     }

   } catch (error) {
    console.log(error);
   }
       
  }

// mentor detete data from mock api
  async function deleteMentor(id,name) {
    setdmloding(true)
    
    if(student.assignMentor > 0){
      let v1 = await axios.delete(`https://630f267c379256341888b141.mockapi.io/mentor/${id}`)
   
        setdmloding(false)
        loadingStudent();
        loadingMentor();
      
    }
    else{
      let v1 = await axios.delete(`https://630f267c379256341888b141.mockapi.io/mentor/${id}`)
      let data = student.filter((item)=>item.assignMentor === name);
      console.log(data);
      let v2;
   for (let i = 0; i < data.length; i++) {
    console.log(data[i].id);
     v2 = await axios.put(`https://630f267c379256341888b141.mockapi.io/student/${data[i].id}`,{
      id:data[i].id,
      name:data[i].name,
      email:data[i].email,
      mobile:data[i].mobile,
      assignMentor:""
    })
   }

    setdmloding(false)
    loadingStudent();
    loadingMentor();
  
    }

 
   
  }
  return (
   
    <>
    <div>
      {/* Display student details */}
      <div>

        

      <h3 className='p-5'>Student details : -</h3>
  {Studentloading ? <div className='d-flex justify-content-center mb-5'><img src={loadings} alt="load" style={{width:"3rem",paddingLeft:"10px"}} /></div>: 

     <table className="table w-50 mx-auto">    
     <thead>
       <tr>
         <th scope="col">#</th>
         <th scope="col">Name</th>
         <th scope="col">Email</th>
         <th scope="col">Mobile</th>
         <th scope="col">Mentor Name</th>
         <th scope="col"> Action</th>
         <th></th>
       </tr>
     </thead>
  <tbody>
   {
    student.map((item,index)=>{
      return  <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.mobile}</td>
      <td>{item.assignMentor}</td>
      <td> <button onClick={()=>{studentDelete(item.id,item.assignMentor,item.name)}} className="btn">Delete</button> </td>
      <td>
      {dsloding && item.id ? <img src={loadings} alt="load" style={{width:"3rem",paddingLeft:"10px"}} />: null }
      </td>
    </tr>
    })
   }
   
  </tbody>
  </table> }
  

      </div>

      {/* Display mentor details */}
      <div>
      <h3 className='p-5'>Mentor details : -</h3>
    
        {mentorLoadind ? <div className='d-flex justify-content-center mb-5'><img src={loadings} alt="load" style={{width:"3rem",paddingLeft:"10px"}} /></div>: 
          <table className="table w-50 mx-auto">
        
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col"> Student name</th>
              <th scope="col"> Action</th>
              <th></th>
            </tr>
          </thead>
        <tbody>
         {
          mentor.map((item,index)=>{
            return  <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.mobile}</td>
            <td>{item.assignStudent.join(" ")}</td>
            <td> <button onClick={()=>deleteMentor(item.id,item.name)} className="btn">Delete</button></td>
            <td>
      {dmloding ? <img src={loadings} alt="load" style={{width:"3rem",paddingLeft:"10px"}} />: null }
      </td>
          </tr>
          
          })
         }
         
        </tbody>
           </table>
        }
        
    
      </div>
    </div>
    </>
  )
}

export default DashBoard