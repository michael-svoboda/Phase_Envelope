FROM python:3.11

# Install OpenJDK 11
RUN apt-get update && apt-get install -y default-jdk

# Set JAVA_HOME
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

WORKDIR /server

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY app ./app
COPY start.py ./

EXPOSE 5000

CMD ["python", "start.py","0.0.0.0:5000"]

