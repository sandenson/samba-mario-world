// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {
  public physicsManager: cc.PhysicsManager;

  public collisionManager: cc.CollisionManager;

  public onLoad(): void {
    this.physicsManager = cc.director.getPhysicsManager();
    this.physicsManager.enabled = true;
    this.physicsManager.gravity = cc.v2(0, -2000);

    this.collisionManager = cc.director.getCollisionManager();
    this.collisionManager.enabled = true;
  }
}
