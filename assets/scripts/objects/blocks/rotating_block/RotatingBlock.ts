// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import VinesHeadSpawner from '../../../spawners/VinesHeadSpawner';
import Block from '../Block';

const { ccclass, property } = cc._decorator;

@ccclass
export default class RotatingBlock extends Block {
  @property(cc.SpriteFrame)
  public inactiveSpriteProperty: cc.SpriteFrame;

  private spawner: VinesHeadSpawner = null;

  private canRotate = true;

  private onBeginContact(contact: cc.PhysicsContact, self: cc.Collider, other: cc.Collider) {
    if (self.tag === 2 && other.tag === 1 && this.isActive) {
      if (this.spawner !== null) this.spawner.spawn(this.node);
      this.isActive = false;
    }
  }

  public onLoad(): void {
    const spawner = this.getComponent(VinesHeadSpawner);
    if (spawner !== null) {
      this.canRotate = false;
      this.spawner = spawner;
    }
  }
}