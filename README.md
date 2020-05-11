# Welcome to Trackit 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> Employee Mileage Tracking Application

## About

Trackit is an mileage tracking application created with Django & React and the Google Maps API. The application contains 3 sub apps, the frontend, user_auth, and trips apps. Frontend contains the React app with all of the files that are for the front frontend. User_auth contains the user authentication api. Lastly, the trips app contains the trips api.

Each app contains a urls.py file for the routes, api.py/views.py file with api logic, serializers.py for serializing and parsing JSON data, and test.py file with the apps' tests.

The trips app contains models.py which contains the Trips database model and googleapi.py for setting up the Google Maps API.

The frontend contains the src directory with all of the React source files, the static directory with the static files and the template directory containing the root HTML file served by the frontend app.

All other files are basic Django and React configuration files.

Other techologies used to build the app are: Django Rest Framework(API), Django-Rest-Knox(token auth), Redux (Frontend State Management), Axios(Frontend HTTP requests), React-toastify(Frontend alerts), React-Router-Dom(Frontend navigation), JS-File-Download(Frontend file downloading)

## Install

```sh
npm install
```

```sh
pipenv install
```

## Run tests

```sh
cd trackit
```

```sh
python manage.py test
```

## Usage

```sh
cd trackit
```

```sh
python manage.py runserver
```

```sh
npm run dev
```

## Author

👤 **Rafi Olaverria**

- LinkedIn: [@Rjolaverria](https://linkedin.com/in/Rjolaverria)
