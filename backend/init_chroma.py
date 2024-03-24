# separate file for initializing chroma
# run with python init_chroma.py

from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores.chroma import Chroma 
from app.chat.embedding import embeddings
import os
from dotenv import load_dotenv

load_dotenv()

# split text into chunks
text_splitter = RecursiveCharacterTextSplitter(
    separators=["\n\n"],
    chunk_size=500,
    chunk_overlap=0
)

folder_path = 'txt_files'

docs = []

# Loop through each file in the folder
for filename in os.listdir(folder_path):
    # Check if the file is a .txt file
    if filename.endswith('.txt'):
        print(filename.replace(".txt", ""))
        # Construct the full path to the file
        file_path = os.path.join(folder_path, filename)
        # load text and split
        loader = TextLoader(file_path, encoding="utf-8")
        char_docs = loader.load_and_split(
            text_splitter=text_splitter
        )
        for doc in char_docs:
            doc.metadata = {
                "text": doc.page_content,
                "character": filename.replace(".txt", ""),
            }

            #print(doc.metadata["character"])
        docs.extend(char_docs)
  
# for doc in docs:
#     if doc.metadata["character"] == "Ryu":
#         print(doc.page_content)
#         print("---------")

# store in chroma
# reinserts documents even if they already exist
# db = Chroma.from_documents(
#     docs, 
#     embedding=embeddings, 
#     persist_directory="emb"
# )
        
# db = Chroma(
#     embedding_function=embeddings,
#     persist_directory="emb",
# )

# #sample query
# results = db.similarity_search(
#     "What are Ryu's anti-airs?",
#     filter={"character": "Ryu"},
#     k=5
# )

# for result in results:
#     print("\n")
#     print(result.page_content)