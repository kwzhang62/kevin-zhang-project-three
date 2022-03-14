import './App.css';
import firebase from './firebase';
//import react hooks
import { useEffect, useState } from 'react';
//import firebase modules
import { getDatabase, ref, onValue } from 'firebase/database';
//import SubmitMessage component
import SubmitMessage from './SubmitMessage';

function App() {

  //set and update the commit message to be displayed using state
  const [commitMessage, setCommitMessage] = useState("");

  //declare an array for holding all the commit messages
  const [commitMessagesArray, setCommitMessagesArray] = useState([]);

  //load the messages from the database on initial page render
  useEffect( () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      //parse the response from the db
      const data = response.val();

      //the messages are stored in the db as a single string with each message separated by semi-colons
      //parse the string into an array
      const newArray = data.commitMessages.split(";");
      //set the value of commitMessagesArray to the new array
      setCommitMessagesArray(newArray);
    });
  }, []);

  //select a random message to display once commitMessagesArray has been updated
  useEffect( () => {
      //choose a random message from the array
      const index = randomIndex(commitMessagesArray.length);
      const randomMessage = commitMessagesArray[index];
      //update commitMessage
      setCommitMessage(randomMessage);
  }, [commitMessagesArray])

  //return a random index number for an array
  const randomIndex = (arrayLength) => {
    return Math.floor(Math.random() * arrayLength);
  }

  return (
    <>
      <header>
        <h1>Take a commit, Leave a commit</h1>
      </header>
      <main>
        <h2>{commitMessage}</h2>
        <SubmitMessage messages={commitMessagesArray}/>
      </main>
    </>
  );
}

export default App;
