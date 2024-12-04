import { ChatDisplay, InputFieldNew } from '../components/components.js';
import { useEffect, useState } from 'react';
import { createSession } from '../utils/utils.js';
import {
  googleQueryPrompt,
  headPrompt,
} from '../systemPrompts/aiMatePrompts/aiMatePrompts.js';

function AIMatePage() {
  const [loading, setLoading] = useState(false); // Keeps the track of the loading state
  const [input, setInput] = useState(''); // Chat textarea state
  const [messages, setMessages] = useState([]); // Chat messages state
  const [headSession, setHeadSession] = useState(null); // Head session
  const [googleSession, setGoogleSession] = useState(null); // Google session

  // Send message to the promptAPI
  const messageAI = async (message) => {
    try {
      if (headSession?.tokensLeft < 50 || googleSession?.tokensLeft < 50) {
        // Create a new session on less tokens left
        activateAI();
      }
      setLoading(true);

      // Append the user message
      setMessages((prev) => [...prev, { sender: 'user', text: message }]);

      // Asking headSession for the right agent
      const headResp = await headSession?.prompt(
        `I need help with this task: ${message}`
      );
      console.log('Head AI response:', headResp);

      if (headResp === 'queryAgent') {
        // Asking googleSession for more details
        const googleResp = await googleSession?.prompt(
          `Create a URL that can fulfil this return empty string if you can not do that ${message}`
        );
        console.log('Google AI response:', googleResp);
        await chrome.tabs.create({
          url: `${googleResp}`,
        });
      }
    } catch (error) {
      console.log('Failed to message AI:', error);
    } finally {
      // Reset the states
      setInput('');
      setLoading(false);
    }
  };

  const activateAI = async () => {
    try {
      const GoogleQueryPrompt = googleQueryPrompt();
      const HeadPrompt = headPrompt();
      // Create the agent sessions
      const { session: aiMateHeadSession } = await createSession({
        systemPrompt: HeadPrompt,
      });
      const { session: googleQuerySession } = await createSession({
        systemPrompt: GoogleQueryPrompt,
      });
      // Update the sessions state
      setHeadSession(aiMateHeadSession);
      setGoogleSession(googleQuerySession);
    } catch (error) {
      console.log('Failed to activate the prompt AI in DsaPage.jsx:', error);
      return;
    }
  };

  useEffect(() => {
    activateAI();
  }, []);

  return (
    <div>
      <div className="my-4 space-y-2">
        <ChatDisplay messages={messages} />
        <InputFieldNew
          input={input}
          setInput={setInput}
          messageAI={messageAI}
          inputLoading={loading}
        />
      </div>
    </div>
  );
}

export default AIMatePage;
