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

    //inital state for marquee
    let initalState = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

    //initial state for pulse
    // let initalState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


    const [state, setState] = useState(initalState);

    //creating an interval to update the state every half second
    useEffect(() => {
        const interval = setInterval(() => {
            let prevState = JSON.parse(JSON.stringify(state));
            setState(pulse(prevState));
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

    //pulse currently only works if all lights start off...
    //marquee will work something like this we just have to manage the inital state better
    function pulse(prevState) {
        let newState = []

        prevState.forEach((element, index) => {
            const pulse = !element
            newState[index] = pulse
        })
        return newState
    }

    //will have to modify chase chase logic to allow for double chase but you get the point
    function chase(prevState){
        let newState = []

        let pointer = 0
        prevState.forEach((element, index) => {
            if (element){
                pointer = index
            }
        })
        if (pointer < 9){
            pointer++
        }
        else{
            pointer = 0
        }
        newState[pointer] = 1

        console.log(pointer)
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
