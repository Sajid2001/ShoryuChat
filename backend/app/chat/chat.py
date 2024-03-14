from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA, ConversationalRetrievalChain
from ..vector_stores.chroma import vectorstore
from dotenv import load_dotenv

#failed attempt and creating memory
#from .memory import build_memory

load_dotenv()

chat = ChatOpenAI()

# def build_chat(conversation_id):
#     memory = build_memory(conversation_id)
#     return ConversationalRetrievalChain.from_llm(
#         chat,
#         vectorstore.as_retriever(),
#         memory=memory,
#     )

chain = RetrievalQA.from_chain_type(
    llm=chat,
    retriever=vectorstore.as_retriever(),
    chain_type="stuff",
)


