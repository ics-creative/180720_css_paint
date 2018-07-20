import {Color} from './three/Color.js';

/**
 * CSS Paint APIのためのクラスです。
 *
 * @author ICS-Ikeda
 */
class DotPainter {

  /**
   * 入力してのプロパティーを定義します。
   * 配列として返したプロパティーが取得できます。
   * @returns {string[]}
   */
  static get inputProperties() {
    return [
      '--color-tl',
      '--color-tr',
      '--color-bl',
      '--color-br',
      '--grid-span',
      '--grid-size',
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
    const colorTL = properties.get('--color-tl').toString().trim();
    const colorTR = properties.get('--color-tr').toString().trim();
    const colorBL = properties.get('--color-bl').toString().trim();
    const colorBR = properties.get('--color-br').toString().trim();


    const dotSize = parseInt(properties.get('--grid-size').toString().trim());
    const span = parseInt(properties.get('--grid-span').toString().trim());

    const rgbTL = new Color(colorTL);
    const rgbTR = new Color(colorTR);
    const rgbBL = new Color(colorBL);
    const rgbBR = new Color(colorBR);

    const gridNumHorizontal = Math.ceil(geometry.width / (dotSize + span));
    const gridNumVertical = Math.ceil(geometry.height / (dotSize + span));

    for (let h = 0; h < gridNumHorizontal; h++) {
      for (let v = 0; v < gridNumVertical; v++) {
        const dx = h * (dotSize + span);
        const dy = v * (dotSize + span);

        const r = DotPainter.calc4PointColor(rgbTL.r, rgbTR.r, rgbBL.r, rgbBR.r, h / gridNumHorizontal, v / gridNumVertical);
        const g = DotPainter.calc4PointColor(rgbTL.g, rgbTR.g, rgbBL.g, rgbBR.g, h / gridNumHorizontal, v / gridNumVertical);
        const b = DotPainter.calc4PointColor(rgbTL.b, rgbTR.b, rgbBL.b, rgbBR.b, h / gridNumHorizontal, v / gridNumVertical);

          context.fillStyle = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
        context.fillRect(dx, dy, dotSize, dotSize);
      }
    }
  }

  /**
   *
   * @param {number} colorTL
   * @param {number} colorTR
   * @param {number} colorBL
   * @param {number} colorBR
   * @param {number} rateH
   * @param {number} rateV
   */
  static calc4PointColor(r1,
                         r2,
                         r3,
                         r4,
                         a,
                         b) {
    return ((r1 - r2 - r3 + r4) * a * b
      - (r1 - r2) * a
      - (r1 - r3) * b + r1);
  }
}

// ペイントを登録します
registerPaint('dot', DotPainter);