// 自分でクラスを作成する
class CirclePainter {

  // static get inputPropertiesゲッターを定義する。
  // ここで配列として返したプロパティを取得できる。
  static get inputProperties() {
    return [
      '--circle-color',
    ];
  }


  // context: コンテキスト（canvasのcontextとほぼ同じ！）
  // geometry: 描画領域の情報(width, heightsのみ)
  // propeties: CSSプロパティ
  paint(context, geometry, properties) {

    // propertiesのgetメソッドを使って値を取得する
    // CSSStyleValueが返ってくるのでtoStringで文字列にしてやる
    const color = properties.get('--circle-color').toString();
    context.fillStyle = color;

    const size = Math.min(geometry.width, geometry.height);

    const centerX = geometry.width / 2;
    const centerY = geometry.height / 2;
    const radius = size / 2;

    console.log(properties);
    // 普通のcanvasのように使える
    context.fillStyle = 'lightgray';
    context.fillRect(0, 0, geometry.width, geometry.height);
    context.fillStyle = color;
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
    context.fill();

    console.log(geometry);
  }
}

// paint(circle)として登録する
registerPaint('circle', CirclePainter);