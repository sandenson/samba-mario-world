const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelHUD extends cc.Component {
  @property(cc.Label)
  private timerLabel: cc.Label = null;

  private remainingTime = 400;

  @property(cc.Label)
  private livesLabel: cc.Label = null;

  private lives = 5;

  public incrementLives(): void {
    this.lives += 1;

    this.livesLabel.string = this.lives.toString();
  }

  @property(cc.Label)
  private yoshiCoinsLabel: cc.Label = null;

  @property(cc.Node)
  private yoshiCoinsNode: cc.Node = null;

  private nYoshiCoins = 0;

  public incrementYoshiCoins(): void {
    this.nYoshiCoins += 1;

    if (this.yoshiCoinsNode.childrenCount - 1 === 0) {
      this.incrementLives();

      this.yoshiCoinsLabel.string = '';
    } else this.yoshiCoinsLabel.string += '$';
  }

  @property(cc.Label)
  private starsLabel: cc.Label = null;

  @property(cc.Label)
  private coinsLabel: cc.Label = null;

  private coins = 0;

  public incrementCoins(): void {
    this.coins += 1;

    let aux = '';

    if (this.coins < 10) aux += '   ';

    this.coinsLabel.string = aux + this.coins;
  }

  @property(cc.Label)
  private pointsLabel: cc.Label = null;

  private _points = 0;

  public get points(): number {
    return this._points;
  }

  public set points(value: number) {
    this._points += value;

    let aux = '';

    if (this.points < 100000) {
      aux += '  ';

      if (this.points < 10000) {
        aux += '  ';

        if (this.points < 1000) {
          aux += '  ';

          if (this.points < 100) {
            aux += '  ';

            if (this.points < 10) {
              aux += '  ';
            }
          }
        }
      }
    }

    this.pointsLabel.string = aux + this.points;
  }

  public start(): void {
    this.timeCounter();
  }

  private timeCounter(): void {
    cc.tween(this.node)
      .call(() => {
        let aux = '';

        if (this.remainingTime < 100) {
          aux += '    ';

          if (this.remainingTime < 10) {
            aux += '    ';
          }
        }

        this.timerLabel.string = aux + this.remainingTime;
      })
      .repeat(
        this.remainingTime,
        cc
          .tween()
          .delay(1)
          .call(() => {
            this.remainingTime -= 1;

            let aux = '';

            if (this.remainingTime < 100) {
              aux += '    ';

              if (this.remainingTime < 10) {
                aux += '    ';
              }
            }

            this.timerLabel.string = aux + this.remainingTime;
          })
      )
      .start();
  }
}
