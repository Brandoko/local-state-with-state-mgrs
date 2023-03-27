import { atom, Provider, useAtomValue, useSetAtom } from "jotai";

const messagesAtom = atom<string[]>([]);
const messageCountAtom = atom((get) => get(messagesAtom).length);
const currentMessageAtom = atom("");

const useMessages = () =>
  useAtomValue(messagesAtom);
const useCurrentMessage = () =>
  useAtomValue(currentMessageAtom);
const useMessageCount = () =>
  useAtomValue(messageCountAtom,);
const useSetCurrentMessage = () =>
  useSetAtom(currentMessageAtom);
const useSetMessages = () =>
  useSetAtom(messagesAtom);

const Chat = () => {
  const currentMessage = useCurrentMessage();
  const messages = useMessages();
  const messageCount = useMessageCount();
  const setCurrentMessage = useSetCurrentMessage();
  const setMessages = useSetMessages();

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} className="chat-message">
          {message}
        </div>
      ))}
      <div className="chat-count">Message Count: {messageCount}</div>
      <div className="chat-input">
        <input
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
      </div>
      <div className="chat-button">
        <button
          onClick={() => {
            setMessages([...messages, currentMessage]);
            setCurrentMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const ChatContainer = () => {
  return (
    <div className="chat">
      <Provider>
        <Chat />
      </Provider>
    </div>
  );
};

function App() {
  return (
    <div className="chat-area">
      <ChatContainer />
      <ChatContainer />
      <ChatContainer />
      <ChatContainer />
    </div>
  );
}

export default App;
