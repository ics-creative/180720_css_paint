// 自分でクラスを作成する
class CirclePainter {

  /**
   * 入力してのプロパティーを定義します。
   * 配列として返したプロパティが取得できます。
   * @returns {string[]}
   */
  static get inputProperties() {
    return [
      "--circle-color",
    ];
  }


  /**
   * 描画時に呼び出される関数です。
   * @param context {CanvasRenderingContext2D} コンテキストです。
   * @param geometry {{width:number, height:number}} 描画領域の情報(width, heightsのみ)です。
   * @param properties {Object} CSSプロパティです。
   */
  paint(context, geometry, properties) {

    console.log(geometry);

    // propertiesのgetメソッドを使って値を取得する
    // CSSStyleValueが返ってくるのでtoStringで文字列にしてやる
    const color = properties.get("--circle-color").toString();
    context.fillStyle = color;

    const size = Math.min(geometry.width, geometry.height);

    const centerX = geometry.width / 2;
    const centerY = geometry.height / 2;
    const radius = size / 2;


    // 普通のcanvasのように使える
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, 10, geometry.height);
    context.fillRect(0, 0, geometry.width, 10);

    context.fillRect(geometry.width - 10, 0, 10, geometry.height);
    context.fillRect(0, geometry.height - 10, geometry.width, 10);

    context.fill();
  }
}

// paint(circle)として登録する
registerPaint("circle", CirclePainter);