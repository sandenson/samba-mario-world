const { ccclass } = cc._decorator;

@ccclass
export default class LevelController extends cc.Component {
  private pauseScreen: cc.Node = null;

  public pauseGame(): void {
    if (!cc.director.isPaused()) {
      this.pauseScreen.opacity = 255;
      cc.director.pause();
    } else {
      this.pauseScreen.opacity = 0;
      cc.director.resume();
    }
  }

  public onLoad(): void {
    this.pauseScreen = cc.find('Canvas/Main Camera/PauseScreen');
  }
}
