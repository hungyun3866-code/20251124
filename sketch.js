let spriteSheet;
let animation = [];
const totalFrames = 18; // 圖片精靈中的總影格數
let frameWidth; // 第一個動畫的影格寬度
const frameHeight = 80; // 每個影格的高度

let spriteSheet2;
let animation2 = [];
const totalFrames2 = 6; // 第二個動畫的總影格數
let frameWidth2; // 第二個動畫的影格寬度
const frameHeight2 = 32; // 第二個動畫的影格高度

let currentFrameRate; // 用於儲存目前的動畫播放速度

function preload() {
  // 預先載入圖片精靈
  // 請確保 '資料夾1' 與您的 sketch.js 檔案在同一層級
  spriteSheet = loadImage('1/all.png');

  // 載入第二個動畫的圖片精靈
  // 請確保 '資料夾2' 也與您的 sketch.js 檔案在同一層級
  spriteSheet2 = loadImage('2/all.png');
}

function setup() {
  // 建立一個全螢幕的畫布
  createCanvas(windowWidth, windowHeight);

  // 計算每個影格的寬度
  frameWidth = spriteSheet.width / totalFrames; // 第一個動畫
  frameWidth2 = spriteSheet2.width / totalFrames2; // 第二個動畫

  // 從圖片精靈中提取每個影格
  for (let i = 0; i < totalFrames; i++) {
    let frame = spriteSheet.get(i * frameWidth, 0, frameWidth, frameHeight);
    animation.push(frame);
  }

  // 從第二個圖片精靈中提取每個影格
  for (let i = 0; i < totalFrames2; i++) {
    let frame = spriteSheet2.get(i * frameWidth2, 0, frameWidth2, frameHeight2);
    animation2.push(frame);
  }

  // 設定初始動畫播放速度
  currentFrameRate = 12; // 初始速度為每秒 12 幀
  frameRate(currentFrameRate);
}

function draw() {
  // 設定背景顏色
  background('#e9ecef');

  // 在左上角顯示提示文字
  fill(50); // 設定文字顏色為深灰色
  textSize(16); // 設定文字大小
  textAlign(LEFT, TOP); // 設定文字對齊方式為左上角
  text('點越多下滑鼠動畫會越來越快', 10, 10); // 在 (10, 10) 座標顯示文字

  // 取得兩個動畫的當前影格
  // 根據當前的 frameCount 來決定要顯示哪一個影格，實現循環播放
  let currentFrame1 = animation[frameCount % totalFrames];
  let currentFrame2 = animation2[frameCount % totalFrames2];

  // 計算兩個動畫並排後的總寬度 (中間加入 20px 的間距)
  const gap = 20;
  const totalCombinedWidth = frameWidth + frameWidth2 + gap;

  // 計算第一個動畫的起始 x 座標，以使兩個動畫整體置中
  const startX1 = (width - totalCombinedWidth) / 2;

  // 繪製兩個動畫，讓它們在垂直方向上各自置中
  image(currentFrame1, startX1, (height - frameHeight) / 2);
  image(currentFrame2, startX1 + frameWidth + gap, (height - frameHeight2) / 2);
}

function mousePressed() {
  // 每次點擊滑鼠，將幀率增加 5
  currentFrameRate += 5;
  // 更新動畫速度
  frameRate(currentFrameRate);
}

function windowResized() {
  // 當瀏覽器視窗大小改變時，自動調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
