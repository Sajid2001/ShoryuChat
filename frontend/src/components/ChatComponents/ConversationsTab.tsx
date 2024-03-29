import { useState } from 'react'
import { Conversation } from '../../models/Conversation'
import { Message } from '../../models/Message'
import axios from 'axios'
import Dialog from '../Dialog'

const SFCharacters: string[] = [
    "A.K.I.",
    "Blanka",
    "Chun-Li",
    "Dee_Jay",
    "Dhalsim",
    "E.Honda",
    "Ed",
    "Guile",
    "Jamie",
    "JP",
    "Juri",
    "Ken",
    "Kimberly",
    "Lily",
    "Luke",
    "Marisa",
    "Rashid",
    "Ryu",
    "Zangief"
];

type Props = {
    conversations: Conversation[],
    handleChangeConversation: (conversation: Conversation) => void,
    setConversations: (conversations: Conversation[]) => void,
    selectedConversation: Conversation | null,
    setMessages: (messages: Message[]) => void,
    isOpen: boolean
}

const ConversationsTab = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [newConversation, setNewConversation] = useState<string>('')
    const [selectedCharacter, setSelectedCharacter] = useState<string>('A.K.I.')
    const { conversations, handleChangeConversation, setConversations, selectedConversation, setMessages, isOpen} = props

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newConversation === '') return
        const conversation = {
            name: newConversation, character: selectedCharacter
        }
        setLoading(true)
        axios.post('/api/conversations', conversation)
            .then((res) => {
                console.log(res.data)
                setConversations([...conversations, res.data]);
                handleChangeConversation(res.data);
                setNewConversation('');
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })

    }

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog);
    }

    const handleDelete = () => {
        if (!selectedConversation) return
        let index = 0
        for (let i = 0; i < conversations.length; i++) {
            if (conversations[i].id === selectedConversation.id) {
                index = i
            }
        }
        axios.delete(`/api/conversations/${selectedConversation.id}`).then((res) => {
            setConversations(conversations.filter((c) => c.id !== selectedConversation.id))
            setMessages([])
            if (selectedConversation.id === selectedConversation?.id)
                handleChangeConversation(conversations[index - 1] || conversations[index])
            localStorage.setItem('conversation', JSON.stringify(conversations[index - 1] || conversations[index]))
            console.log(res.data)
        })
    }
    return (
        <>
            {isOpen &&
            <div className='w-full md:w-1/4 my-3 m-auto flex flex-col'>
                <div className=' border-black border-4 rounded-md h-[400px]' style={{ overflowY: 'auto' }}>
                    {conversations.map((conversation, index) => (
                        <div
                            onClick={() => handleChangeConversation(conversation)}
                            key={index}
                            className=
                            {`text-xl flex flex-row justify-between items-center w-full p-2 hover:bg-slate-900 hover:text-white ${conversation.id === selectedConversation?.id ? 'bg-slate-900 text-white' : ''}`}
                        >
                            {conversation.character} - {conversation.name.length > 10 ? conversation.name.slice(0, 10) + '...' : conversation.name}
                            <button className='z-10 ml-2' onClick={() => handleOpenDialog()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='text-xl w-full flex flex-col gap-2 my-2'>
                    <select value={selectedCharacter} onChange={(e) => setSelectedCharacter(e.target.value)} className='border-4 border-black dark:gray-600 rounded-md p-1 dark:bg-slate-800'>
                        {SFCharacters.map((char, index) => (
                            <option key={index} value={char}>{char}</option>
                        ))}
                    </select>
                    <input value={newConversation} onChange={(e) => setNewConversation(e.target.value)} className='border-4 border-black rounded-md p-1 dark:bg-slate-800 dark:text-white' placeholder='Conversation Name' />
                    <button
                        disabled={loading}
                        onClick={(e) => handleSubmit(e)}
                        className='border-4 border-black rounded-md text-xl w-full p-1 hover:bg-slate-900 hover:text-white'>
                        New Conversation
                    </button>
                </div>
                <Dialog
                    title='Delete Conversation'
                    message='Are you sure you want to delete this conversation? This action cannot be undone.'
                    action={handleDelete}
                    isOpen={openDialog}
                    setIsOpen={handleOpenDialog}
                    handleClose={handleOpenDialog}
                />
            </div>
            }
        </>
    )
}

export default ConversationsTab