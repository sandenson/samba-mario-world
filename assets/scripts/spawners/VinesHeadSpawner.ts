// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import VinesHead from '../objects/vines/VinesHead';

const { ccclass, property } = cc._decorator;

@ccclass
export default class VinesHeadSpawner extends cc.Component {
  @property(cc.Prefab)
  public vinesHeadPrefab: cc.Prefab = null;

  @property(cc.Integer)
  public nVines = 0;

  public spawn(node: cc.Node): void {
    const vinesHead = cc.instantiate(this.vinesHeadPrefab);
    vinesHead.getComponent(VinesHead).nVines = this.nVines;

    node.addChild(vinesHead);

    vinesHead.setPosition(cc.v3(0, 16, 0));
  }
}
