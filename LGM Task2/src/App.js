import React, { useEffect, useState } from "react"
import "./App.css"
import Button from "./Button/Button";
import Loading from "./Loading/loading";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] =useState(false)
  const fetchData = () => {
    console.log("clicked")
    setLoading(true)
    fetch('https://reqres.in/api/users?page=1')
      .then(resp => {
        setLoading(false)
        if (resp) return resp.json();
      })
      .then(data => setData(data.data))
      .catch(err => {
        setLoading(false)
        console.error(err)
      })
  }

  return (
    <>
      {loading ? <Loading /> :null}
      <nav className="nav">
        <h1>LGM</h1>
        <Button value="Get Users" onClick={fetchData} />
      </nav>
      <article className="divContainer">
        {data ? (
          <>
            <header><h1 className="h1"> Users List </h1></header>
            <div className="listCardContainer">
              {data.map(listItem =>
                <div className="listCard" key={listItem.id}>
                  <h2>
                    <img src={listItem.avatar} alt="avatar" className="image" />
                  </h2>
                  <p className="name">{listItem.first_name} {listItem.last_name} </p>
                  <div className="email"><b>Email:</b> {listItem.email} </div>
                </div>
              )}
            </div>
          </>
        )
          : <div className="unfetched">Click on Get Users button to fetch User List</div>
        }
      </article>
    </>
  );
}

export default App;