FROM python:3.9.13

WORKDIR /app/

COPY . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezone

CMD uvicorn --host=0.0.0.0 --port 8000 app.main:app
