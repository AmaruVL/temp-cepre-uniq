FROM python:3.9.16

#RUN apt install gcc
RUN uname -a
RUN ls /etc/apt/
RUN echo 'Acquire::http::Proxy "http://192.168.1.36:9128";' > /etc/apt/apt.conf.d/50proxy.conf
RUN apt-get -y update && apt-get -y upgrade
RUN apt install -y python3-dev
RUN python -m venv cepreenv
RUN . cepreenv/bin/activate
COPY requirements.txt .
RUN pip install  -r requirements.txt


VOLUME /api
WORKDIR /api
CMD python manage.py runserver 0.0.0.0:8080
