import React, { useContext, useEffect, useState,  } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loadings from '../loading.svg' 

function AssignMentor() {
  let navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [loadingss,setLoadings] = useState(false);
  let [mentor,setMentor] = useState([]);
  let [student,setStudent] = useState([]);
  let [assignMentor, setassignmentor] = useState("");
  let [assignStudent, setAssignstudent] = useState([]);
  let [mentorId, setMentorid] = useState(0);
  let [studentId, setStudentid] = useState([]);


  useEffect(() => {
    loadingMentor();
    loadingStudent(); 
  }, []);

// get mentor data from mock api
  const loadingMentor = async () => {
    try {
      setLoadings(true)
      let value = await axios.get('https://630f267c379256341888b141.mockapi.io/mentor');
    setMentor(value.data);
    if(value.status===200){
      setLoadings(false)
    }
  }
     catch (error) {
      console.log(error);
    }
  }
 // get student data from mock api
  const loadingStudent = async () => {
    try {
      setLoadings(true)
      let value = await axios.get('https://630f267c379256341888b141.mockapi.io/student');
    setStudent(value.data);
    if(value.status===200){
      setLoadings(false)
    }
    } catch (error) {
      console.log(error);
    }
  }

// update the state assignmentor and mentor id
  const handle = async (id,name)=>{
   setMentorid(id);
   setassignmentor(name);
  }



  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      e.preventDefault()
      let data = {
        assignStudent,
      }
      console.log("assignStudent : ",data);
     let v1 =  await axios.put(`https://630f267c379256341888b141.mockapi.io/mentor/${mentorId}`, data)
     
      
      let data1 = {
        assignMentor,
      }
      let v2;
      for (let i = 0; i < studentId.length; i++) {
       v2 = await axios.put(`https://630f267c379256341888b141.mockapi.io/student/${studentId[i]}`, data1)
      }
      
     
if(v1.status === 200 && v2.status === 200 ){
  setLoading(false)
  navigate('/');
}
    } catch (error) {
      console.log(error);
    }
  }
  let val = mentor.filter((item)=> item.id === mentorId).map((item)=>item.assignStudent)
  let check = (e, id) => {
    let { checked, value } = e.target
    if (checked) {
  setAssignstudent([...val[0],...assignStudent, value])
  setStudentid([...studentId, id])
    }
    else {
      setAssignstudent(assignStudent.filter((item) => item !== value))
      setStudentid(studentId.filter((item) => item !== id))
    }
  }


  return (
    <> 
      <div className=' w-50 mx-auto '>

        <form className='w-100 p-5' onSubmit={handleSubmit}>
         <div className='d-flex  align-items-center flex-column'> <h1 className='text-center'>Assign mentor for student</h1>
          <div className="row">
            <div className="col-md-6">
            <div className="form-check me-5">
            <label className="form-check-label" htmlFor="flexRadioDefault1">
            <h4>Mentor</h4>
                  </label><br />

                  {loadingss ? <img src={loadings} alt="load" style={{width:"2.5rem"}}/> :null}
                  { 
                 mentor.map((item) =>
                   {
                    
                    return  <><input className="form-check-input" type="radio" name="flexRadioDefault" onChange={()=>handle(item.id,item.name)} id="flexRadioDefault1"/>{item.name} <br /></> 
                  })
                }
               
                  
              </div>
            </div>
            <div className=" col-md-6">
              <label className="form-check-label mb-1" htmlFor="flexCheckChecked">
              <h4>Student</h4>
              </label> <br />
              {loadingss ? <img src={loadings} alt="load" style={{width:"2.5rem"}}/> :null}
              {
                student.map((item) => {
                  return <>{item.assignMentor === "" ? <><input className="form-check-input" type="checkbox" value={item.name} name={item.name} id="flexCheckChecked" onChange={(e) => check(e,item.id)} /> {item.name}<br /></> : null }</>
                })
              }
              
            </div>
          </div></div>
          <div className='d-flex justify-content-center align-items-center'>
            <button type="submit" className="btn mt-4" >Submit</button>  {loading ? <img src={loadings} alt="load" style={{width:"3rem",paddingTop:"15px",paddingLeft:"10px"}} />: null}
          </div>
        </form>
      </div>
    </>
  )
}

export default AssignMentor