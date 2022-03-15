import firebase from "./firebase";
//import react hooks
import { useEffect, useState } from 'react';
//import firebase modules
import { getDatabase, ref, onValue, push } from 'firebase/database';

function SubmitMessage(props) {

    //track user input as a state
    const [userInput, setUserInput] = useState("");

    //updates userInput state whenever the value of the input field is changed
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    }

    //handles form submission when the Leave commit button is clicked
    const handleSubmit = (event) => {
        event.preventDefault();

        //create a reference to the db
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/commitMessages`);

        //push the string holding the new message submitted by the user to the db
        push(dbRef, userInput);

        //clear user input after submission
        setUserInput("");
    }

    return (
        <form action="submit">
            <label htmlFor="newMessage">Leave a commit message</label>
            <input type="text" id="newMessage" onChange={handleInputChange} value={userInput}/>
            <button onClick={handleSubmit}>Leave commit</button>
        </form>
    )
}

export default SubmitMessage;