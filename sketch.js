let video;
let faceMesh;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 加載 FaceMesh 模型
  faceMesh = ml5.facemesh(video, () => {
    console.log('FaceMesh model loaded');
  });

  // 當模型有預測結果時，更新 predictions
  faceMesh.on('predict', (results) => {
    predictions = results;
  });
}

function draw() {
  // 顯示攝影機畫面
  image(video, 0, 0, width, height);

  // 如果有預測結果，繪製特徵線條
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    if (keypoints) {
      stroke(255, 0, 0); // 紅色線條
      strokeWeight(2); // 線條粗細

      // 繪製嘴唇
      drawLines(keypoints, [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184]);

      // 繪製左眼
      drawLines(keypoints, [243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112, 133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155]);

      // 繪製右眼
      drawLines(keypoints, [359, 467, 260, 259, 257, 258, 286, 414, 463, 341, 256, 252, 253, 254, 339, 255, 263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249]);
    } else {
      console.log('No keypoints detected');
    }
  }
}

// 繪製連接線的函式
function drawLines(keypoints, indices) {
  for (let i = 0; i < indices.length - 1; i++) {
    const start = keypoints[indices[i]];
    const end = keypoints[indices[i + 1]];

    if (start && end) {
      line(start[0], start[1], end[0], end[1]);
    }
  }
}
