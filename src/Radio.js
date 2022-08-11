import React, {useState, useEffect} from 'react';

function Radio({question, setResponse, name}){
  const [checked, setChecked] = useState();
  const [questionPast, setQuestionPast] = useState(question);

  const updateRadio = (event, question, answer) => {
    setResponse((responses) => {
             responses[question] = answer;
             return responses;
    })
    setChecked(event.target.value);
    console.log(event.target.checked);
  }

  useEffect(() => {
    if(questionPast !== question){
      setQuestionPast(question);
      setChecked(null);
    }
  })

  return (
    <div id="surv">
      <br />
      <h2>{question.question}</h2>
      <div className="radio_option">
        <input
          type="radio"
          value="a"
          onChange={(event) =>
            updateRadio(event, question.question, question.a)
          }
          name={name}
          className="radio"
          checked={checked === "a"}
        />
        <label className="font1">{question.a}</label>
        <br />
        <br />
        <input
          type="radio"
          value="b"
          name={name}
          className="radio"
          onChange={(event) =>
            updateRadio(event, question.question, question.b)
          }
          checked={checked === "b"}
        />
        <label className="font1">{question.b}</label>
        <br />
        <br />
        <input
          type="radio"
          value="c"
          name={name}
          className="radio"
          onChange={(event) =>
            updateRadio(event, question.question, question.c)
          }
          checked={checked === "c"}
        />
        <label className="font1">{question.c}</label>
        <br />
        <br />
      </div>
    </div>
  );
}

export default Radio;