import socketio
import time
import json
import threading
import cv2
import os

device_id = '111'
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def ws_download(url, ad_id):
    print("Downloading")
    print('url: ' + url)
    print('ad_id: ' + ad_id)

def ws_delete(ad_id):
    print("Deleting", ad_id)

def ws_upload():
    print("Uploading")

def ws_connect():
    global sio
    sio = socketio.Client()
    while True:
        try:
            # sio.connect('http://ws.marwiztech.com')
            sio.connect('http://20.204.100.126:3000')
            break
        except:
            print("Connection failed")
            time.sleep(5)

threading.Thread(target=ws_connect).start()

if sio.connected:
    print("Connected")
    sio.emit('message', device_id)

@sio.event
def connect():
    print('Connected to server')
    sio.emit('message', device_id)

@sio.event
def message(data):
    global filter_id
    message = json.loads(data)
    print(message)

    if message['action'] == 'Download Media':
        ws_download(message['data']['mediaurl'], message['data']['ad_id'])
    elif message['action'] == 'Delete Media':
        ws_delete(message['data']['ad_id'])
    elif message['action'] == 'Upload images':
        ws_upload()
    elif message['action'] == 'Take picture':
        take_picture()
    elif message['action'] == 'Update filter':
        filter_id = message['data']['filterId']
        print("Filter updated to", filter_id)


@sio.event
def disconnect():
    print('Disconnected from server')

@sio.on('imageReceived')
def on_image_received(data):
    print(data['message'])
    print('Image filename:', data['filename'])
    print('Image saved at:', data['imagePath'])

def take_picture():
    global frame_3
    image_name = f"image_{int(time.time())}.jpg"
    print("Taking image")
    cv2.imwrite("image/"+image_name, frame_3)

    time.sleep(0.2)
    with open(os.path.join('image/', image_name), 'rb') as file:
        sio.emit('image', {'data': file.read(), 'filename': image_name})

def camera():
    global frame_2

    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    print("Camera started")
    while True:
        ret, frame_2 = cap.read()
        if not ret:
            print("Web cam not found")
            break
    print("Camera stopped")

threading.Thread(target=camera).start()

def apply_snap_filter(face_img, filter_img, x, y, w, h, scale_factor):
    new_w = int(w * scale_factor)
    new_h = int(h * scale_factor)
    filter_img = cv2.resize(filter_img, (new_w, new_h))

    alpha_mask = filter_img[:, :, 3] / 255.0
    inv_alpha_mask = 1.0 - alpha_mask
    x_offset = int((w - new_w) / 2)
    y_offset = int((h - new_h) / 2)
    for c in range(0, 4):
        try:
            face_img[y+y_offset:y+y_offset+new_h, x+x_offset:x+x_offset+new_w, c] = (alpha_mask * filter_img[:, :, c] +
                                                                                  inv_alpha_mask * face_img[y+y_offset:y+y_offset+new_h, x+x_offset:x+x_offset+new_w, c])
        except:
            a = 0
    return face_img

def apply_snap_filter_to_image(image, scale_factor):
    global filter_id
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    for (x, y, w, h) in faces:
        snap_filter = cv2.imread(os.path.join('filter/', filter_id+".png"), -1)
        try:
            image = apply_snap_filter(image, snap_filter, x, y, w, h, scale_factor) #123
        except:
            a=0

    return image

filter_id = '4'
scale_factor = 1.1
time.sleep(2)
while True:
    frame = frame_2.copy()
    try:
        frame = apply_snap_filter_to_image(frame, scale_factor)  #123
    except:
        a=0

    frame_3 = frame.copy()
    cv2.imshow('frame', frame)
    key = cv2.waitKey(1) 
    if key == ord('q'):
        os._exit(0)
