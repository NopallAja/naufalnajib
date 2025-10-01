import cv2
import mediapipe as mp

# Inisialisasi mediapipe
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

# Fungsi cek jari terbuka
def count_fingers(hand_landmarks):
    # Landmark jari (ujung jari: 4,8,12,16,20)
    tips = [4, 8, 12, 16, 20]
    fingers = []

    # Ibu jari (thumb) -> beda arah dari jari lain
    if hand_landmarks.landmark[tips[0]].x < hand_landmarks.landmark[tips[0]-1].x:
        fingers.append(1)  # terbuka
    else:
        fingers.append(0)

    # Jari telunjuk - kelingking
    for tip in tips[1:]:
        if hand_landmarks.landmark[tip].y < hand_landmarks.landmark[tip-2].y:
            fingers.append(1)
        else:
            fingers.append(0)

    return sum(fingers)

# Buka kamera
cap = cv2.VideoCapture(0)

with mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.7
) as hands:

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                # Hitung jari
                fingers_up = count_fingers(hand_landmarks)

                # Tampilkan jumlah jari
                cv2.putText(image, f"Jari Terbuka: {fingers_up}", (10, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        cv2.imshow("Deteksi Jari", image)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
