/** オリジナル角を持つ矩形描画クラスです。 */
class RectPainter {

  /**
   * 入力してのプロパティーを定義します。
   * 配列として返したプロパティーが取得できます。
   * @returns {string[]}
   */
  static get inputProperties() {
    return [
      '--rect-round',
      '--rect-color',
    ];
  }

  /**
   * 描画時に呼び出される関数です。
   * @param context {CanvasRenderingContext2D} コンテキストです。
   * @param geometry {{width:number, height:number}} 描画領域の情報(width, heightsのみ)です。
   * @param properties {Object} CSS変数です。
   */
  paint(context, geometry, properties) {

    // properties の get メソッドを使って値を取得
    // CSSStyleValue の値を取得
    const round = parseInt(properties.get('--rect-round').toString());
    const color = properties.get('--rect-color').toString().trim();

    // 四角形の頂点を定義
    const points = [
      // 左上
      {x: 0, y: round},
      {x: 0 + round, y: 0},
      // 右上
      {x: geometry.width - round, y: 0},
      {x: geometry.width, y: round},
      // 右下
      {x: geometry.width, y: geometry.height - round},
      {x: geometry.width - round, y: geometry.height},
      // 左下
      {x: 0 + round, y: geometry.height},
      {x: 0, y: geometry.height - round},
    ];


    // 三角形の形状を作成
    context.beginPath(); // パスの開始
    points.forEach((point, index) => {
      if (index === 0) {
        context.moveTo(point.x, point.y); // 最初の点
      } else {
        context.lineTo(point.x, point.y); // 2番目の点
      }
    });

    context.closePath(); // 最後の頂点を最初の頂点まで結ぶ

    // 塗りを描く
    context.fillStyle = color; //塗りつぶしの色
    context.fill();
  }
}

// paint(circle)として登録する
registerPaint('rect', RectPainter);