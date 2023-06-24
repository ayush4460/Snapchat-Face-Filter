# Snapchat-Face-Filter

Welcome to the frontend repository of the "Snapchat-Face-Filter" project! This repository contains the code for the frontend application that works in conjunction with the "Snapchat-Face-Filter-Backend" repository to provide a face filter experience.

## Prerequisites

Before running the application, ensure that you have the following installed:

- Python3: [Download and install Python](https://www.python.org/downloads/)
- Web browser: Any modern web browser like Chrome, Firefox, or Safari.
- OpenCV Python: `pip install opencv-python`
- Python SocketIO: `pip install python-socketio`
- Requests: `pip install requests`
- Websocket Client: `pip install websocket-client`

## Installation & Running the Application

1. **Clone the repository:**

   - Open your preferred Code Editor (I recommend using VS Code).
   - Click `Terminal` -> `New Terminal`.
   - Run the command `git clone https://github.com/ayush4460/Snapchat-Face-Filter.git` in the Terminal.
   - Git will start cloning the repository to your local machine.
   - Once the cloning process is complete, you will have a local copy of the repository in the specified directory.
   - Navigate to the project directory: `cd Snapchat-Face-Filter`.

2. **Run the Python script:**

   - Open a terminal or command prompt.
   - Navigate to the project directory: `cd Snapchat-Face-Filter`.
   - Run the command `python a.py`or directly run the python file.
   - This will start the Python script and open the camera with applied face filters.

3. **Open the web page:**

   - Open a web browser (Chrome, Firefox, or Safari).
   - In the address bar, enter the path to the `index.html` file located in the cloned repository, e.g., `file:///path/to/Snapchat-Face-Filter/index.html`.
   - If you have Live Server extension on VS Code just click "Go Live" present on the bottom right.
   - The web page will open, displaying the available face filters.

4. **Select and apply filters:**

   - On the web page, you will see a variety of face filters.
   - Click on a filter to apply it to the camera feed.
   - Swiping the filter will also apply it to the camera feed.

   - For Swipe functionality, follow these steps:
   1) Click `Ctrl+Shift+i` in the keyboard to open Console.
   2) Now, Click `Ctrl+Shift+m` in the keyboard to open Toggle Device Toolbar.
   3) On the top, Select `Dimensions -> Click on any device mentioned there`.
   4) Hover on the filters and `Swipe right or left` to apply that filter to the camera feed .

5. **Capture an image:**

   - Once you are satisfied with the selected filter, click the "Capture" button on the web page.
   - The captured image will be saved in the "image" folder of the repository.

NOTE:
- Note that you need to open both the frontend and backend code on Local Machine ie. both should have a HTTP connection
- Don't forget to run the backend files present in my `Snapchat-Face-Filter-Backend` repository
<br>
Feel free to explore and modify the code to customize the filters and add new functionalities to enhance your Snapchat face filter experience.

## Contributing

Contributions to the project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

To contribute:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make the necessary changes and commit them.
5. Push your changes to your forked repository.
6. Submit a pull request to the original repository.

## License

This project is licensed under the [MIT License](LICENSE).


## Community Guidelines( Code of Conduct )

[Code of Conduct](CODE_OF_CONDUCT.md)


## Security Policy

Go through the [Security Policy](SECURITY.md) of this Project

Feel free to update the content of this README file to match your project structure and provide additional information as needed.
