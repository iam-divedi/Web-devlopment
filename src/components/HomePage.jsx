import React, { useEffect, useState } from 'react'
import axios from 'axios';
const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email:""
  });
  const addForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(e.target.name);
  }
  const addUser = () => {
    axios.post(`http://localhost:5000/users`,formData)
    .
      then(response => console.log(JSON.stringify(response.data))).
      catch(error => console.log(error));
    alert("User Inserted!");
  }
  const updateUser = () => {
    axios.put(`http://localhost:5000/users/${formData.id}`, formData)
    .
      then(() => alert("Update User!")).
      catch(error => console.log(error));
  }
  const deleteUser = async () => {
    try {
      let info = axios.delete(`http://localhost:5000/users/${formData.id}`);
      console.log(info.data);
      alert("User Deleted!");
    } catch (error) {
      console.log(error);
    }
    
    // fetch(`http://localhost:5000/users/${formData.id}`, {
    //   method: "DELETE",
    //   headers: { 'Content-Type': 'application/json' },
    // }).
    //   then(response => response.json()).
    //   then(() => alert("Deleted User")).
    //   catch(error => console.log(error));
  }
  useEffect(() => {
    const getData = async () => {
      try {
        let dataInfo = await axios.get("http://localhost:5000/users");
        let data = await dataInfo.data;
        setUsers(data)
         
      } catch (error) {
        console.log(error);
      }
    }
    getData();
    // fetch("http://localhost:5000/users").
    //   then(response => response.json()).
    //   then(data => setUsers(data)).
    //   catch(error => console.log(error));
  
},[users]);
  return (
    <div className='d-flex flex-column justify-content-center align-items-center m-3'>
      <form className='d-flex flex-column'>
        <input type="text" 
          value={formData.id}
          name="id"
          onChange={addForm}
          placeholder='Enter id'
          className='m-2'
        />
        <input type="text" 
          value={formData.name}
          name="name"
          onChange={addForm}
          placeholder='Enter name'
          className='m-2'
        />
        <input type="text" 
          value={formData.email}
          name="email"
          onChange={addForm}
          placeholder='Enter email'
          className='m-2'
        />
       <div>
        <button className='btn btn-warning m-2' onClick={addUser}>Add</button>
          <button className='btn btn-warning m-2' onClick={updateUser}>Update</button>
          <button className='btn btn-warning m-2' onClick={deleteUser}>Delete</button>
          </div>
      </form>
      <h2>User Info:</h2>
      <h2>{JSON.stringify(users)}</h2>
    </div>
  )
}

export default HomePage