import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

import MessageDisplay from './MessageDisplay';
import SubmitMessage from './SubmitMessage';
import GetMessages from './GetMessages';

function App() {

  //initialize a state for holding all the commit messages in an array
  const [commitMessagesArray, setCommitMessagesArray] = useState([]);

  //initialize a state to track whether to render a commit message
  const [renderMessage, setRenderMessage] = useState(true);

  //load the messages from the database on initial page render
  useEffect( () => {
    // getCommitMessages();
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      //parse the response from the db
      const data = response.val();
      //get the values from the commitMessages JSON object and parse it into an array
      const newArray = Object.values(data.commitMessages);
      //set the value of commitMessagesArray to the new array
      setCommitMessagesArray(newArray);
    });
  }, []);

  //return a random index number for an array
  const randomIndex = (arrayLength) => {
    return Math.floor(Math.random() * arrayLength);
  };

  //update render message - call this function within child components
  const showCommitMessage = (bool) => {
    setRenderMessage(bool);
  }
  
  return (
    <>
      <header>
        <h1>Take a commit, Leave a commit</h1>
      </header>
      <main>
        <MessageDisplay 
          messages={commitMessagesArray}
          showMessage={renderMessage}
          updateCommitMessage={showCommitMessage} 
          randomize={randomIndex} 
        />
        <SubmitMessage messages={commitMessagesArray}/>
        <GetMessages messages={commitMessagesArray} updateCommitMessage={showCommitMessage}/>
      </main>
      <footer>
        <p>Created at Juno College</p>
      </footer>
    </>
  );
}

export default App;
