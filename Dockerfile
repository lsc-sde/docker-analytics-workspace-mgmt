FROM node:lts AS build
WORKDIR /code

COPY site/analytics-workspace-mgmt/package.json ./
COPY site/analytics-workspace-mgmt/package-lock.json ./

RUN npm install

COPY site/analytics-workspace-mgmt/src/ ./src/
COPY site/analytics-workspace-mgmt/public/ ./public/

RUN npm run build

FROM python:alpine as python

RUN pip install --upgrade pip
RUN pip install kubernetes
RUN pip install fastapi
RUN pip install uvicorn
RUN pip install lscsde-workspace-mgmt==0.1.13
RUN pip install logger
RUN pip install jinja2
ADD ./src /src/
COPY --from=build /code/build/*.html /src/templates/
COPY --from=build /code/build/*.json /src/templates/
COPY --from=build /code/build/*.png /src/templates/
COPY --from=build /code/build/*.ico /src/templates/
COPY --from=build /code/build/*.txt /src/templates/
COPY --from=build /code/build/static/ /src/static/

WORKDIR /src
EXPOSE 8000
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

ENV NAMESPACE="jupyterhub"