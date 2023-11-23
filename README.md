# Cloud Computing

Express JS rest-api for D-jahit application

## Prequisite

Built with :

- Node v18 (Express js)
- MySql RDBMS
- Google App Engine
- Google Cloud Storage
- Google Cloud SQL

# How to setup ?

## Install the Dependencies

```bash
npm install
```

### Start the app in development mode

```bash
npm start
```

## Add and configure app.yaml file

<pre>
runtime: nodejs18

env_variables:
  INSTANCE_UNIX_SOCKET: /cloudsql/{your-sql-instance-connection-name}
  DB_USER: {your-db-user}
  DB_NAME: {your-database-name}
  GCLOUD_STORAGE_BUCKET: {your-bucket}
</pre>

## Deployment

1. Setup Google App Engine standard environment
2. Setup Google Cloud SQL Instance, create the database named "d-jahit-db"
3. Configure App Engine Standard Environment to connect to Google Cloud SQL Instance
4. Deploy Expressjs rest-api to App Engine
5. After App Engine Deployment, the schema and data migration will auto migrate

## Detailed Google Cloud Documentation

1. Connect from App Engine standard environment : https://cloud.google.com/sql/docs/mysql/connect-app-engine-standard#node.js
2. Connect to Cloud SQL : https://cloud.google.com/sql/docs/mysql/connect-instance-cloud-shell

# Code Documentation

## API

1. For detailed API documentation, install this vscode extension : https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi
2. Open api-spec.yaml file and then open preview on your computer, or you can use online swagger editor : https://editor.swagger.io/

## For local development

- Use 'dev-migrate' branch
