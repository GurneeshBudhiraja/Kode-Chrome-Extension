import { useEffect, useState } from 'react';
import { ChatDisplay, InputFieldNew } from '../components/components.js';
import { recommendationAgentPrompt } from '../systemPrompts/dsaPrompts/dsaPrompts.js';
import { createSession } from '../utils/utils.js';

function RecommendationPage() {
  const [loading, setLoading] = useState(false); // Keeps the track of the loading state
  const [messages, setMessages] = useState([]); // Chat messages state
  const [recommendationAgentSession, setRecommendationAgentSession] =
    useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    activateAI();
    setLoading(false);
  }, []);

  const activateAI = async () => {
    try {
      const recommendationPrompt = recommendationAgentPrompt();

      const recommendationSession = await createSession({
        systemPrompt: recommendationPrompt,
      });

      // Checks the valid session object
      if (!Object.keys(recommendationSession).length) {
        console.log('Empty prompt session object');
        return;
      }

      const { session } = recommendationSession;
      setRecommendationAgentSession(session);
    } catch (error) {
      console.log(
        'Failed to activate the Recommendation AI Tool in RecommendationPage.jsx:',
        error
      );
      return;
    }
  };

  const messageAI = async (message) => {
    try {
      setLoading(true);
      if (recommendationAgentSession?.tokensLeft < 50) {
        await activateAI();
      }
      setMessages((prev) => [...prev, { sender: 'user', text: message }]);
      console.log('Generating recommendations');
      const recommendationResp = await recommendationAgentSession.prompt(
        message
      );
      console.log(recommendationResp);
      let jsonData = JSON.parse(recommendationResp.replace(/'/g, '"'));
      const { response } = jsonData;

      // Modifies to match the coding question on leetcode URL
      const modifiedResponse = response.map((item) =>
        item.includes('-')
          ? item.toLowerCase()
          : item.toLowerCase().replace(/ /g, '-')
      );
      console.log(modifiedResponse);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: modifiedResponse },
      ]);
      setInput('');
      setLoading(false);
    } catch (error) {
      console.log('Failed to message AI:', error);
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className='mt-3 space-y-2'>
      <ChatDisplay messages={messages} type="recommendation" />
      <InputFieldNew
        input={input}
        setInput={setInput}
        inputLoading={loading}
        messageAI={messageAI}
      />
    </div>
  );
}

export default RecommendationPage;
