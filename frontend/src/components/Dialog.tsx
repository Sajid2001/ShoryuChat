

type Props = {
    title: string,
    message: string,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    handleClose: (response: boolean) => void,
    action: () => void
}

const Dialog = (props: Props) => {

    const { title, message, setIsOpen, isOpen, action} = props

    //const [isOpen, setIsOpen] = useState(false);
    const handleClose = (response: boolean) => {
        if (response) {
            action();
        }
        setIsOpen(false); // Close the dialog
    };

    return (
        <div>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="border-4 border-black inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-slate-800 dark:text-white">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-slate-800 dark:text-white">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                                            {title}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-slate-300">{message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={() => handleClose(true)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:ml-3 sm:w-auto sm:text-sm">
                                    Yes
                                </button>
                                <button onClick={() => handleClose(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border-2 border-black shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-slate-800 dark:text-white dark:hover:bg-black">
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dialog