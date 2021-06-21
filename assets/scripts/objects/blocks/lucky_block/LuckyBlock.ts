import BlockItemsSpawner from '../../../spawners/BlockItemsSpawner';
import Block from '../Block';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LuckyBlock extends Block {
  @property(cc.Prefab)
  public mushroom: cc.Prefab = null;

  @property(cc.Prefab)
  public yoshi: cc.Prefab = null;

  @property(cc.Prefab)
  public coin: cc.Prefab = null;

  @property(cc.Integer)
  public type = 1;

  private onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
    if (self.tag === 2 && other.tag === 1 && this.isActive) {
      this.isActive = false;
      this.bonk();
      if (this.type === 0) this.getComponent(BlockItemsSpawner).spawn(this.coin);
      if (this.type === 1) this.getComponent(BlockItemsSpawner).spawn(this.mushroom);
    }
  }
}
