import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

    let allOff = ["off", "off", "off", "off", "off", "off", "off", "off", "off", "off"]

    const [state, setState] = useState(allOff)

    useEffect(() => {
        const interval = setInterval(() =>{
            let newArray = []
            allOff.forEach((element,index) => {
                const rand = getRandomInt()
                if (rand)
                {
                    newArray[index] = "on"
                }
                else{
                    newArray[index] = "off"
                }
            })
            setState(newArray)
            }, 1000);
    },[]);

    function getRandomInt() {
        return Math.floor(Math.random() * 2);
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="container">
                    <span className={state[0]}></span>
                    <span className={state[1]}></span>
                    <span className={state[2]}></span>
                    <span className={state[3]}></span>
                    <span className={state[4]}></span>
                    <span className={state[5]}></span>
                    <span className={state[6]}></span>
                    <span className={state[7]}></span>
                    <span className={state[8]}></span>
                    <span className={state[9]}></span>
                </div>
            </header>
        </div>
    );
}

export default App;
