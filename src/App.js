// New comment
import React, {useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Radio from './Radio';
import Welcome from './Welcome';
import End from './End.js';

function App() {
  const [email, setemail] = useState('2');
  const [gender, setgender] = useState('3');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [currentRender, setCurrentRender] = useState();
  const [responses, setResponses] = useState({});
  const [lang, setLang] = useState('en');
  const [button, setButton] = useState('Next');

  const getsurvey = async (value) => {
    setQuestions([]);
    let Tasks = await axios.get('http://localhost:1337/api/surveys?locale=' + value);
    for(let i in Tasks.data.data){
      setQuestions((prev) => [...prev, Tasks.data.data[i]["attributes"]]);
    }
  }

  const load = (value) => {
    getsurvey(value);
  }

  // const [checkbox, setCheckbox] = useState({box1: "", box2: "", box3: ""});

  // const updateBox = (box, value) => {
  //   if(box === "1"){
  //     if(checkbox.box1 === value) {
  //       value = '';
  //     }
  //     setCheckbox(previousState => {
  //       return{...previousState, box1: value}
  //     });
  //   }

  //   if(box === "2"){
  //     if(checkbox.box2 === value){
  //       value = "";
  //     }
  //     setCheckbox(previousState => {
  //       return{...previousState, box2: value}
  //     })
  //   }

  //   if(box === "3"){
  //     if(checkbox.box3 === value){
  //       value = ""
  //     }
  //     setCheckbox(previuosState => {
  //       return{...previuosState, box3: value}
  //     })
  //   }
  // }

  // const [page, setpage] = useState(1);
  // const [page0, set0page] = useState('view');
  // const [page1, set1page] = useState('hid');
  // const [page2, set2page] = useState('hid');
  // const [page3, set3page] = useState('hid');
  // const [page4, set4page] = useState('hid');

  const sendRespons = async (value) => {
    await axios
      .post('http://localhost:1337/api/responses/', {
        'data': {'Email' : email, 'Answers': value}
      })
      .catch((err) => console.log(err));
  }

  // useEffect(() => {
  //   let checkboxResp = "";
  //   if (checkbox.box1 !== "") {
  //     checkboxResp = checkbox.box1;
  //   }
  //   if (checkbox.box2 !== "") {
  //     checkboxResp = checkboxResp + ", " + checkbox.box2;
  //   }
  //   if (checkbox.box3 !== "") {
  //     checkboxResp = checkboxResp + ", " + checkbox.box3;
  //   }
  //   console.log("Checkboxes " + checkboxResp);
  //   setResponse3(prev => checkboxResp);
  // }, [checkbox])

  const next = () => {
    if(current < questions.length){
      setCurrent(prev => ++prev);
    }else if(current === questions.length){
      setCurrent(prev => ++prev);
      console.log("Responses:");
      console.log(responses);
      sendRespons(responses);
      setButton(prev => 'New survey');
    }else{
      setCurrent((prev) => 0);
      setButton((prev) => "Next");
    }
    // if(current === 1){
    //   set0page(prev => 'hid');
    //   set1page(prev => 'view');
    //   setpage(prev => prev + 1);
    //   setButton(prev => 'Next Question');
    // }
    // if(page === 2){
    //   set1page(prev => 'hid');
    //   set2page(prev => 'view');
    //   setpage(prev => page + 1);
    //   setButton(prev => 'Next Question');
    // }
    // if(page === 3){
    //   set2page(prev => 'hid');
    //   set3page(prev => 'view');
    //   setpage(prev => page + 1);
    //   setButton(prev => 'Next Question');
    // }
    // if(page === 4){
    //   set3page(prev => 'hid');
    //   set4page(prev => 'view');
    //   setpage(prev => 5);
    //   setButton(prev => 'New survey');
    //   let result = {};
    //   result[question1.question] = response1;
    //   result[question2.question] = response2;
    //   result[question3.question] = response3;
    //   console.log(result);
    //   sendRespons(result);
    //   getsurvey(lang);
    // } 
    // if(page === 5){
    //   set4page(prev => 'hid');
    //   set1page(prev => 'view');
    //   setpage(prev => 2);
    //   setButton(prev => 'Next Question');
    // }
  }

  return (
    <div className="App">
      <div>
        {current === 0 ? (
          <Welcome setemail={setemail} load={load} setgender={setgender} />
        ) : current > questions.length ? (
          <End />
        ) : (
          <Radio
            question={questions[current - 1]}
            setResponse={setResponses}
            name={current}
          />
        )}
      </div>
      <button className="btn" onClick={() => next()}>
        {button}
      </button>
      {/* <div className="main">
        <div className="bar1">
          <center>
            <span>Progress</span>
            <div className="bar2">
              <div className="bar3">
                {page}/5
              </div>
            </div>
          </center>
        </div>

        <div id="surv" className={page3} hidden>
          <br/>
          <h2>{question3.question}</h2>
          <div className="radio_option">
            <input type="checkbox" name="e" className="checkbox" onClick={(event) => updateBox('1', question3.a)} />
            <label className="font1">{question3.a}</label>
            <br/><br/>
            <input type="checkbox" onClick={(event) => updateBox('2', question3.b)} value="22" name="e" className="checkbox"/>
            <label className="font1">{question3.b}</label>
            <br/><br/>
            <input type="checkbox" onClick={(event) => updateBox('3', question3.c)} value="." name="r" className="checkbox"/>
            <label className="font1">{question3.c}</label>
            <br/><br/>
          </div>
        </div> 
        <button className="btn" onClick={() => next()}>{button}</button>
      </div>*/}
    </div>
  );
}

export default App;
