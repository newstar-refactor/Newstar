FROM python:3.9.13-slim AS builder

RUN apt-get update && \
    apt-get install git -y

RUN python -m venv /venv

WORKDIR /code

COPY requirements.txt .

RUN /venv/bin/pip install -r requirements.txt

FROM python:3.9.13-slim

COPY --from=builder /venv/ /venv/

COPY app /app
ENV PATH=/venv/bin:$PATH

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezone

ENV APP_ENV=prod

CMD uvicorn --host=0.0.0.0 --port 8000 app.main:app