# separate file for initializing chroma
# run with python init_chroma.py

from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores.chroma import Chroma 
from app.chat.embedding import embeddings
from dotenv import load_dotenv

load_dotenv()

# split text into chunks
text_splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=300,
    chunk_overlap=0
)

# load text and split
loader = TextLoader("facts.txt")
docs = loader.load_and_split(
    text_splitter=text_splitter
)

# store in chroma
# reinserts documents even if they already exist
db = Chroma.from_documents(
    docs, 
    embedding=embeddings, 
    persist_directory="emb"
)

#sample query
results = db.similarity_search(
    "What are Chun's anti-airs?",
)

for result in results:
    print("\n")
    print(result.page_content)