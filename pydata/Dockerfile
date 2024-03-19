FROM python:3.9.13

WORKDIR /app/

COPY . /app/

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8000 app.main:app
