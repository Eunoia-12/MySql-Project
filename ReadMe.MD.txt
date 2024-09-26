To get the sample project working:
Once you download the file, open it using VS Code.
Open an intergrated terminal that points to the backend folder of the downloaded folder.
Start the backend: 1) cd Backend, and run npm start.
Now you can access the Backend endoints directly. For example, you can point your brower to http://localhost:8081 and http://localhost:8081/listall. The later should show the content of the students table in JSON format.
At the project home directory, run npm create vite@latest, type Frontend as the project name, and choose react and javascript.
Open a new terminal to run the following commands.
cd Frontend
Run npm install
Run npm run dev and then point your browser to http://localhost:5173/ which should show the page that displays the query result of the students table.
