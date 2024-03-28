# Corona Health Management System

This is a FullStack system for managing a large health fund's database related to the COVID-19 pandemic. The system allows for managing members of the health fund, including editing and deleting them, and maintains records in the database. Additionally, the system aggregates key data regarding the COVID-19 outbreak in the context of the health fund's members.
# Client Side
## Features

    Display a list of all health fund members entered into the system (manual entry).
    When selecting a member, open their card and display various details (see attachment).
    For each health fund member, display information about their COVID-19 vaccination date, illness date (if applicable), and recovery date.

# Server Side
## Features

    Full CRUD operations and access to the database.
    Ensure input validity and prevent errors.
    Expose API endpoints for client-side access.

# Technologies Used

    Client Side: [Angular CLI] version 17
    Server Side:  .Net 6.0 needed VS 2022 version
    DB: SQL With a connection to C# .Net by EF in the CODE FIRST methodology.

# Run App
1. Run server code with VS 2022,
2. Create DB schema with 'NuGet Package Manager/package Manager Console' and run the command 'update-database' **Note : Defalt Project should be DAL**
  ![image]      (https://user-images.githubusercontent.com/116121959/197694234-4ed48578-3107-4724-aa41-5555d88c6108.png)
  ![image](https://user-images.githubusercontent.com/116121959/197694305-28df96da-7681-4241-9c22-fb01e4a48962.png)
3. now run the program
4. for client code run on CovidWebApp npm commands: Run in Terminal 'npm i' && 'npm start'
  ![image](https://user-images.githubusercontent.com/116121959/197694535-0b2e5859-4268-40bb-85f5-3ff8c703e678.png)
  ![image](https://user-images.githubusercontent.com/116121959/197694733-267434e8-3b33-448a-be3f-e866b49eed86.png)

5. Open the app in browser with "localhost:4200"  url
  ![image](https://user-images.githubusercontent.com/116121959/197694955-ebfd1678-301d-4932-bc20-dfc5d90cd26d.png)
  
  YOU BECOME TO APPLICATION!!!
  
