import logo from './logo.svg';
import {useState, useEffect, useRef} from "react";
import './App.css';

//here is their lightShowController_onCycle from the repo.
//I am using javascripts setInterval to emmulate their oncycle events.

//What I think we should do is pull out the for loop that goes through and sets
//the "state" for each light into its own function so we can do what I am doing here
//each function is passed a previous state and then returns the next state.

// static void lightShowController_onCycle(struct os_event *ev)
// {
//     // any more cycles for the canned animation?
//     if(m_remainingCycle > 0){
//         // yes, reset our cycle timer
//         m_remainingCycle--;
//         os_callout_reset_ms(&m_cycleTimer, LIGHTSHOW_CONTROLLER_CYCLE_INTERVAL_MS);
//     }
//     else{
//         // no, stop our frame timer.
//         os_callout_stop(&m_animationTimer);
//         // fire our callback if we have one
//         if(m_animationComplete.cb){
//             (m_animationComplete.cb)(m_animationComplete.cbArg);
//         }
//         return;
//     }
//
//     for(int i = 0; i < m_numChannels; i++){
//     bool shouldOn = lightShowController_randomOnOff();
//
//     if(shouldOn){
//         lightShowController_setDimAnimator(&m_dimAnimator[i], LIGHTSHOW_CONTROLLER_MAX_DIM_LEVEL);
//     }
//     else{
//         lightShowController_setDimAnimator(&m_dimAnimator[i], LIGHTSHOW_CONTROLLER_MIN_DIM_LEVEL);
//     }
// }
// }


function App() {

    // marquee and pulse are the same function with different initial states!!
    //same with chase and double chase

    //probably a mathier way to do inital states for all of these...

    //inital state for marquee
    // let initalState = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

    //initial state for pulse
    // let initalState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    //inital state for double chase
    // let initalState = [1, 0, 0, 0, 1, 0, 0, 0, 0, 0]

    //inital state for single chase
    // let initalState = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    //inital state for wave
    let initalState = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    const [state, setState] = useState(initalState);

    //need to keep track of direction for wave??
    const [direction, setDirection] = useState(1);

    //creating an interval to update the state every half second
    useEffect(() => {
        const interval = setInterval(() => {
            let prevState = JSON.parse(JSON.stringify(state));

            //call function here chase, pulse, rand etc
            setState(wave(prevState));
        }, 500);
        return () => clearInterval(interval)
    }, [state]);

    //rand function ... copies what they have currently
    function rand(prevState) {
        let newState = []

        prevState.forEach((element, index) => {
            const rand = Math.floor(Math.random() * 2)
            newState[index] = rand
        })
        return newState
    }


    //very simple
    function pulse(prevState) {
        let newState = []

        prevState.forEach((element, index) => {
            const pulse = !element
            newState[index] = pulse
        })
        return newState
    }

    //chase and double chase just shift everything to the right and index circularly

    //thought this might be easier than circlularly indexing pointers but
    // its also in c so idk
    function chase(prevState) {
        let newState = []

        prevState.forEach((element, index) => {
            if (index === 0) {
                newState[index] = prevState[prevState.length - 1]
            } else {
                newState[index] = prevState[index - 1]
            }
        })
        return newState
    }


    //weird bug here going backwards but I think this is the easiest way?
    //its also 10pm and im on the plane with no internet and bored so I
    //could be losing my mind
    function wave(prevState) {
        let newState = []

        prevState.forEach((element, index) => {

            if (direction) {
                if (index === 0) {
                    newState[index] = prevState[prevState.length - 1]
                } else {
                    newState[index] = prevState[index - 1]
                }
            } else {
                //backwards
                if (index === prevState.length){
                    newState[index] = prevState[0]
                }
                newState[index - 1] = prevState[index]

            }

            //switching directions
            if (index === prevState.length - 2 && element == 1) {
                setDirection(0)
            }
        })

        console.log(state)
        return newState
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="container">
                    <span className={state[0] ? "on" : "off"}></span>
                    <span className={state[1] ? "on" : "off"}></span>
                    <span className={state[2] ? "on" : "off"}></span>
                    <span className={state[3] ? "on" : "off"}></span>
                    <span className={state[4] ? "on" : "off"}></span>
                    <span className={state[5] ? "on" : "off"}></span>
                    <span className={state[6] ? "on" : "off"}></span>
                    <span className={state[7] ? "on" : "off"}></span>
                    <span className={state[8] ? "on" : "off"}></span>
                    <span className={state[9] ? "on" : "off"}></span>
                </div>
            </header>
        </div>
    );
}

export default App;
