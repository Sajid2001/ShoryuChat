import React, { useEffect, useState } from 'react'
import { Conversation } from '../../models/Conversation'
import { Message } from '../../models/Message'
import ConversationsTab from './ConversationsTab'
import MessagesBox from './MessagesBox'
import MessageInput from './MessageInput'
import axios from 'axios'

const Chat = () => {

    const [newMessage, setNewMessage] = useState<string>('')
    const [messages, setMessages] = useState<Message[]>([])
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [conversation, setConversation] = useState<Conversation | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        axios.get('/api/conversations').then((res) => {
            console.log(res.data);
            if (res.data.length > 0) {
                setConversations(res.data);
                setConversation(localStorage.getItem('conversation') ? JSON.parse(localStorage.getItem('conversation')!) : res.data[0]);
            }
        })
        .then(() => {
            if (conversation === null) return
            axios.get(`/api/messages/${conversation.id}`).then((res) => {
                console.log(res.data);
                setMessages(res.data)
            })
        })
    },[])

    useEffect(() => {
        if(conversation === null) return
        
        axios.get(`/api/messages/${conversation.id}`).then((res) => {
            console.log(res.data);
            setMessages(res.data)
        })
    },[conversation])

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (newMessage === '') return
        if (conversation === null) return
        
        const newMessageObj = {
            text: newMessage,
            role: 'human'
        }
        
        setMessages([...messages, newMessageObj])
        setNewMessage('');
        setLoading(true)
        axios.post(`/api/messages/${conversation.id}`, newMessageObj)
        .then((res) => {
            console.log(res.data);
            setMessages([...messages, newMessageObj, res.data])
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })

    }

    const handleChangeConversation = ( conversation: Conversation) => {
        setConversation( conversation );
        localStorage.setItem('conversation', JSON.stringify(conversation));
    }

    return (
        <div className=' flex flex-col gap-3 w-2/3 my-[50px] m-auto p-2 min-h-[550px] text-center border-black border-4 rounded-md'>
            <h1 className='text-2xl font-bold'>{conversation ? conversation.name : 'No Conversation Selected'}</h1>
            <div className='flex flex-row h-full gap-4'>
                <ConversationsTab setMessages={setMessages} selectedConversation={conversation} setConversations={setConversations} handleChangeConversation={handleChangeConversation} conversations={conversations} />
                <div className='flex flex-col w-3/4'>
                    <MessagesBox loading={loading} messages={messages} />
                    <MessageInput hasConversations={conversations.length > 0} handleSubmit={handleSubmit} newMessage={newMessage} setNewMessage={setNewMessage} />
                </div>
            </div>
        </div>
    )
}

export default Chat