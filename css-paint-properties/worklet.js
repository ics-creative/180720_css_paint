/** 三角形を描くペインタークラスです。 */
class TrianglePainter {

  /**
   * 入力してのプロパティーを定義します。
   * 配列として返したプロパティーが取得できます。
   * @returns {string[]}
   */
  static get inputProperties() {
    return [
      '--fill-color',
    ];
  }

  /**
   * 描画時に呼び出される関数です。
   * @param context {CanvasRenderingContext2D} コンテキストです。
   * @param geometry {{width:number, height:number}} 描画領域の情報(width, heightのみ)です。
   * @param properties {Object} CSS変数です。
   */
  paint(context, geometry, properties) {

    // properties の get メソッドを使って値を取得
    // CSSStyleValue の値を取得
    const color = properties.get('--fill-color').toString();

    // 三角形の頂点を定義
    const points = [
      {x: 0, y: geometry.height}, // 左下
      {x: geometry.width, y: geometry.height},// 右下
      {x: geometry.width / 2, y: 0}, // 上
    ];

    // 三角形の形状を作成
    context.beginPath(); // パスの開始
    context.moveTo(points[0].x, points[0].y); // 最初の点
    context.lineTo(points[1].x, points[1].y); // 2番目の点
    context.lineTo(points[2].x, points[2].y); // 3番目の点
    context.closePath(); // 最後の頂点を最初の頂点まで結ぶ

    // 塗りを描く
    context.fillStyle = color; //塗りつぶしの色
    context.fill();
  }
}

// paint(triangle)メソッドとして登録
registerPaint('triangle', TrianglePainter);
