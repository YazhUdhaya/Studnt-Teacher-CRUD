import React, { useEffect, useState,  } from 'react'
import axios from 'axios';
import loadings from '../loading.svg' 
import { useNavigate } from 'react-router-dom';

function ChangeMentor() {
  let navigate = useNavigate();
  const [loadingss, setLoadings] = useState(false);
  const [loading,setLoading] = useState(false);
  let [mentor, setMentor] = useState([]);
  let [student, setStudent] = useState([]);
  let [assignMentor, setassignmentor] = useState("");
  let [assignStudent, setAssignstudent] = useState("");
  let [mentorId, setMentorid] = useState(0);
  let [studentId, setStudentid] = useState(0);
  let [name,SetName] = useState("");


  // console.log(" mssign:",assignMentor);
  // console.log("mid :",mentorId);
  // console.log(" astu:",assignStudent);
  
  // console.log(" stu:",studentId);

  useEffect(() => {
    loadingMentor();
    loadingStudent();
  }, []);
  // get mentor data from mock api
  const loadingMentor = async () => {
    setLoadings(true);
    try {
      let value = await axios.get(
        "https://630f267c379256341888b141.mockapi.io/mentor"
      );
      setMentor(value.data);
      if (value.status === 200) {
        setLoadings(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get student data from mock api
  const loadingStudent = async () => {
    setLoadings(true);
    try {
      let value = await axios.get(
        "https://630f267c379256341888b141.mockapi.io/student"
      );
      setStudent(value.data);
      if (value.status === 200) {
        setLoadings(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      e.preventDefault(); 

// delete the current in  student from mentor array
  let res = mentor.find((item) => {
    for (let cur in item.assignStudent) {
      if (item.assignStudent[cur] === name) {
        return true;
      }
    }
  });

 

  let index = res.assignStudent.findIndex((item)=>item === name)

 res.assignStudent.splice(index, 1)
     



     console.log(res.id);



let data = {
  assignStudent : res.assignStudent,
}

 let val = await axios.put(`https://630f267c379256341888b141.mockapi.io/mentor/${res.id}`,data);
   
    console.log(val);

 
    
      await axios.put(`https://630f267c379256341888b141.mockapi.io/mentor/${mentorId}`,{assignStudent});
        
        
      

     
      await axios.put(`https://630f267c379256341888b141.mockapi.io/student/${studentId}`,{assignMentor})

      setLoading(false)
            
        navigate("/");
     
      
      

    } catch (error) {
      console.log(error);
    }
  };



// update the mentorId and assignMentor
const getMentorname = (mentorid)=>{
  let mentorName = mentor.find((item)=> item.id === mentorid)
  setassignmentor(mentorName.name)
  setMentorid(mentorid)
}

// updte the studentId and assignstudent and old assignstudent
const getStudentname = (studentid)=>{

  // find the new assign student
  let studentName = student.find((item)=> item.id === studentid)
//find old assignstudent from mentor
  let mentorName = mentor.find((item)=> item.id === mentorId)
  setAssignstudent([studentName.name,...mentorName.assignStudent])
  setStudentid(studentid)
  SetName(studentName.name)
}



  return (
    <>
      <div className=" w-50 mx-auto ">
        <form className="w-100 p-5" onSubmit={handleSubmit}>
          <h1 className="text-center">Change mentor for student</h1>
          <div className="row">
            <div className=" col-md-6">
              <label className="form-check-label mb-1" for="flexCheckChecked">
                <h4>Mentor</h4>
              </label>{" "}
              <br />
              {loadingss ? (
                <img src={loadings} alt="load" style={{ width: "2.5rem" }} />
              ) : (
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) => getMentorname(e.target.value)}
                >
                  <option selected>Choose...</option>
                  {mentor.map((item) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              )}
            </div>
            <div className=" col-md-6">
              <label className="form-check-label mb-1" for="flexCheckChecked">
                <h4>Student</h4>
              </label>{" "}
              <br />
              {loadingss ? (
                <img src={loadings} alt="load" style={{ width: "2.5rem" }} />
              ) : (
                <select
                  id="inputState"
                  className="form-select"
                  onClick={(e) => {
                   try {
                    if (mentorId === 0) {
                      alert("First select mentor");
                    } else {
                      getStudentname(e.target.value);
                    }
                   } catch (error) {
                    
                   }
                  }}
                >
                  <option selected>Choose...</option>
                  {student.map((item) => {
                    return (
                      <>
                        {item.assignMentor !== "" ? (
                          <option value={item.id}>{item.name}</option>
                        ) : null}
                      </>
                    );
                  })}
                </select>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>{" "}
            {loading ? (
              <img
                src={loadings}
                alt="load"
                style={{
                  width: "3rem",
                  paddingTop: "15px",
                  paddingLeft: "10px",
                }}
              />
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
}

export default ChangeMentor;
