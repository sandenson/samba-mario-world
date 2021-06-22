// import Item from '../../Item';
import LevelHUD from '../../../hud/LevelHUD';
import CCoin from '../CCoin';

const { ccclass } = cc._decorator;

@ccclass
export default class LuckyBlockCoin extends CCoin {
  public start(): void {
    cc.tween(this.node)
      .call(() => {
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 200);
      })
      .delay(0.3)
      .call(() => {
        const levelHUD = cc.find('Canvas/Main Camera/LevelHUD').getComponent(LevelHUD);

        levelHUD.incrementCoins();
        levelHUD.points = this.value;

        this.node.destroy();
      })
      .start();
  }
}
