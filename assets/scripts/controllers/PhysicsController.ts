const { ccclass } = cc._decorator;

@ccclass
export default class PhysicsController extends cc.Component {
  public physicsManager: cc.PhysicsManager;

  public collisionManager: cc.CollisionManager;

  public onLoad(): void {
    this.physicsManager = cc.director.getPhysicsManager();
    this.physicsManager.enabled = true;
    this.physicsManager.gravity = cc.v2(0, -1000);
    // const Bits = cc.PhysicsManager.DrawBits;
    // this.physicsManager.debugDrawFlags = Bits.e_shapeBit;

    this.collisionManager = cc.director.getCollisionManager();
    this.collisionManager.enabled = true;
  }
}
