Simple RMM Client (Second Iteration)
This is an alternative implementation for https://github.com/mhaji007/devices-clientapp. A system that partially mimics a simple RMM client. This version uses modals instead of separate routes for displaying add, edit and delete forms and displays devices in a paginated table.

Application Architecture
This application is built using ReactJS. Each screen is divided into separate components. Each component has a JS file and (optionally) a CSS file.

Styling
CSS modules are used for styling to reduce side effects and conflicts. All styles are custom written.

React Router
React router v6 is used to create the following routes:

/ ==> (Home, displays list of all devices)
In the first implementation routes were used instead of modals for adding, editing and deleting confirmation. That was to take advantage of browser's built-in back/forward functionality to change views. The current implementation makes use of modals and displays devices in a paginated table.

Other npm modules
axios
react-multi-select-component
react-icons
react-modal
react-paginate
Installation
⚠️ Please download or clone the following repository in order to use the server for this client app before you proceed. https://github.com/NinjaMSP/devicesTask_serverApp ⚠️

Extract the devices-clientapp-v2-main.zip file.
Open the terminal and navigate to devices-clientapp project directory by entering the following command
cd devices-clientapp-v2-main
Run the following command to install dependencies
npm install 
To run the application:

Open the terminal and navigate to devices-clientapp project directory
cd devices-clientapp-v2-main
Run the following command to spin up the server
npm start 
To Do
Add unit/integration tests
Add loading indicators
Responsive design
Contributing
Pull requests are welcome.

License
MIT
