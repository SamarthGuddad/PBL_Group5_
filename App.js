import React ,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import KidLearn from './component/KidLearn';

import Fun from './component/fun';
import Games from './component/games';

import Navbar from './component/Navbar';

import Matching from './component/matching';
import About from './component/About';

import Count from './component/count';
import Crossword from './component/crossword';

import Arithmatic from './component/arithmatic';

import Addition from './component/addition';
import Substraction from './component/substraction';
import Multiplication from './component/multiplication';
import Division from './component/division';
import AuthForm from './component/AuthForm';
import Dashboard from './component/Dashboard';
import Read from './component/read';



function App() {

  const [mystyle,setMystyle]=useState({
    color:'black',
    backgroundColor:'white'
  })

  const [mytext,setmytext]=useState("Enable Dark Mode");


  const toggleStyle=()=>{
    if(mystyle.color==='white')
    {
        setMystyle({
            color:'black',
            backgroundColor:'white'
        })

        setmytext("Enable Dark Mode");
    }
    else{
        setMystyle({
            color:'white',
            backgroundColor:'black'
        })

        setmytext("Enable Light Mode");
    }
  }

  

  return (
      <>
        <Navbar title="Kids' Learning" aboutt="About Us" />
      <div className="container my-3">
        <Routes>

          <Route path="/" element=
          {
            <>
              <KidLearn  />
            </>

          } />

          <Route path="/fun" element=
          {
            <>
              <Fun />
            </>

          } />

          <Route path="/matching" element=
          {
            <>
              <Matching  />
            </>

          } />


          <Route path="/crossword" element=
          {
            <>
              <Crossword  /> 
            </>

          } />

          <Route path="/games" element=
          {
            <>
              <Games />
            </>

          } />


          <Route path="/count" element=
          {
            <>
              <Count /> 
            </>

          } />


          <Route path="/arithmatic" element=
          {
            <>
              <Arithmatic /> 
            </>

          } /> 


          <Route path="/addition" element=
          {
            <>
              <Addition /> 
            </>

          } /> 


          <Route path="/substraction" element=
          {
            <>
              <Substraction /> 
            </>

          } /> 


          <Route path="/multiplication" element=
          {
            <>
              <Multiplication /> 
            </>

          } /> 


          <Route path="/division" element=
          {
            <>
              <Division /> 
            </>

          } /> 

          <Route path='/read' element={
            <Read/>
          }/>




          <Route path="/about" element=
          {

            <About  />

          } />

          <Route path='/signup' element=
          {
            <AuthForm isSignUp={true}/>
          }
          />

          <Route path='/login' element={
            <AuthForm isSignUp={false}/>
          }/>

          <Route path='/dash' element={
            <Dashboard/>
          }/>

        </Routes>
      </div>

      </>
  );
}

export default App;