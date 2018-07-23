class CirclePainter {

  /**
   * 入力してのプロパティーを定義します。
   * 配列として返したプロパティーが取得できます。
   * @returns {string[]}
   */
  static get inputProperties() {
    return [
      '--time',
    ];
  }

  constructor() {
    this._particles = [];
  }

  /**
   * 描画時に呼び出される関数です。
   * @param context {CanvasRenderingContext2D} コンテキストです。
   * @param geometry {{width:number, height:number}} 描画領域の情報(width, heightのみ)です。
   * @param properties {Object} CSSプロパティです。
   */
  paint(context, geometry, properties) {

    context.fillStyle = 'red';

    const centerX = geometry.width / 2;
    const centerY = geometry.height / 2;

    // 普通のcanvasのように使える
    this.addParticle(centerX, centerY, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);

    this.updateParticle();

    this._particles.forEach((particle) => {
      // 普通のcanvasのように使える
      context.fillRect(particle.x, particle.y, 10, 10);
    });
  }

  addParticle($x, $y, $vx, $vy) {
    this._particles.push({life: 0, x: $x, y: $y, vx: $vx, vy: $vy});
  }

  updateParticle() {
    console.log(this);

    for (let i = 0; i < this._particles.length; i++) {
      const obj = this._particles[i];
      obj.x += obj.vx;
      obj.y += obj.vy;
      obj.life++;
      if (obj.life > 180) {
        this._particles.splice(i, 1);
      }
    }
  }
}


// paint(circle)として登録する
registerPaint('circle', CirclePainter);