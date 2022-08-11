import React from 'react';

function Welcome({setemail, load, setgender}){
  return (
    <div id="surv">
      <br />

      <h2>welcome to survey app</h2>
      <div className="container">
        <div className="divid1">
          <br />
          <input
            type="text"
            className="input"
            name=""
            placeholder="Email address"
            onChange={(event) => setemail(event.target.value)}
          />
          <br />
          <br />

          <label>Select language</label>
          <select
            className="input"
            onChange={(event) => load(event.target.value)}
          >
            <option>Select Language</option>
            <option value="en">English</option>
            <option value="sk-SK">Slovak</option>
          </select>
          <br />
          <br />
        </div>

        <div className="divid2">
          <br />
          <input
            type="text"
            className="input"
            name=""
            placeholder="Gender"
            onChange={(event) => setgender(event.target.value)}
          />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Welcome;