import { useEffect, useRef } from "react";
import { Message } from "../../models/Message"

type Props = {
    messages: Message[],
    loading: boolean
}



const MessagesBox = (props: Props) => {
    const { messages, loading } = props

    const messagesBoxRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesBoxRef.current) {
            messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div ref={messagesBoxRef} className='h-[400px] w-full my-4 m-auto border-black border-4 rounded-md flex flex-grow flex-col'style={{ overflowY: 'auto' }}>
            {messages.map((message, index) => (
                <p key={index} className={`text-xl leading-relaxed px-2 py-4 ${message.role === 'human' ? 'text-right text-white bg-slate-900' : 'text-left text-black bg-white dark:bg-slate-800 dark:text-white'}`}>{message.text}</p>
            ))}
       {loading && <div className='text-xl text-left p-2 animate-pulse flex flex-col justify-left gap-3 my-4'>
                            <div className="rounded-lg bg-slate-200 h-3 w-full"></div>
                            <div className="rounded-lg bg-slate-200 h-3 w-full"></div>
                            <div className="rounded-lg bg-slate-200 h-3 w-full"></div>
                        </div>}
        </div>
    )
}

export default MessagesBox