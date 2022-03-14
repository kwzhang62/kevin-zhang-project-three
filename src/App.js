import './App.css';
import firebase from './firebase';
//import react hooks
import { useEffect, useState } from 'react';
//import firebase modules
import { getDatabase, ref, onValue } from 'firebase/database';

function App() {

  //set and update the commit message to be displayed using state
  const [commitMessage, setCommitMessage] = useState("");

  //load the messages from the database on initial page render
  useEffect( () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      //parse the response from the db
      const data = response.val();
      
      //the messages are stored in the db as a single string with each message separated by semi-colons
      //parse the string into an array
      const commitMessagesArray = data.commitMessages.split(";");
      
      //choose a random message from the array and update the commitMessage state
      const index = randomIndex(commitMessagesArray.length);
      const randomMessage = commitMessagesArray[index];
      setCommitMessage(randomMessage);
    });
  }, []);

  //return a random index number for an array
  function randomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  return (
    <>
      <header>
        <h1>Take a commit, Leave a commit</h1>
      </header>
      <main>
        <p>check the console</p>
      </main>
    </>
  );
}

export default App;
