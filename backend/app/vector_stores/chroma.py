from langchain.vectorstores.chroma import Chroma
from ..chat.embedding import embeddings

# Specify the path to the persisted Chroma database
persist_directory = "./emb"

vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)

def build_retriever(character):
    search_kwargs = {"filter": {"character": character}}
    return vectorstore.as_retriever(search_kwargs=search_kwargs)