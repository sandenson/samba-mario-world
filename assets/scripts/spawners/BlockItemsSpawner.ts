const { ccclass } = cc._decorator;

@ccclass
export default class BlockItemsSpawner extends cc.Component {
  public spawn(itemPrefab: cc.Prefab): void {
    const item = cc.instantiate(itemPrefab);

    this.node.addChild(item);

    item.setPosition(cc.v3(0, (this.node.height * this.node.scaleY) / 2 + (item.height * item.scaleY) / 2, 0));
  }
}
