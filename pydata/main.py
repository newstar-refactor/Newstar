from fastapi import FastAPI

from category_crawling import do_crawling

app = FastAPI()


@app.get("/")
async def root():
  return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
  return {"message": f"Hello {name}"}

@app.get("/crawling")
async def start_crawling():
  do_crawling()
  return {"message": "complete crawling"}
