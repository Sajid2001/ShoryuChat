import React from 'react'

type Props = {
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void,
    newMessage: string,
    setNewMessage: (value: string) => void,
    hasConversations: boolean
}

const MessageInput = (props: Props) => {
    const { handleSubmit, newMessage, setNewMessage, hasConversations } = props
    return (
        <div className='flex flex-row'>
            <input disabled={!hasConversations} placeholder={hasConversations ? 'Enter Message' : 'Chat Disabled! Please create a conversation'} type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className='mr-2 w-5/6 p-2 mb-4 m-auto border-4 border-black rounded-md ' />
            <button disabled={!hasConversations} onClick={(e) => handleSubmit(e)} className={`w-1/6 p-2 mb-4 m-auto border-4 border-black rounded-md ${!hasConversations ? 'cursor-not-allowed' : 'cursor-pointer'} ${hasConversations && 'hover:bg-black hover:text-white'}`}>Send</button>
        </div>
    )
}

export default MessageInput