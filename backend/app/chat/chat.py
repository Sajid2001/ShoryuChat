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

def build_retriever(character):
    search_kwargs = {"filter": {"character": character}}
    return vectorstore.as_retriever(search_kwargs=search_kwargs)

def build_chain(character):
    chain = RetrievalQA.from_chain_type(
        llm=chat,
        retriever=build_retriever(character),
        chain_type="stuff",
    )

    return chain


