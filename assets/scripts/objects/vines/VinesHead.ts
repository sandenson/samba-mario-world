// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { property, ccclass } = cc._decorator;

@ccclass
export default class VinesHead extends cc.Component {
  @property(cc.Prefab)
  public vinePrefab: cc.Prefab = null;

  private vinesNode: cc.Node = null;

  public nVines = 0;

  public start(): void {
    this.loop();
  }

  public onLoad(): void {
    this.vinesNode = this.node.getParent().children.find((node: cc.Node) => node.name === 'Vines');
  }

  private loop(): void {
    let aux = 1;
    let firstVineCollider: cc.BoxCollider = null;

    cc.tween(this.node)
      .parallel(
        cc
          .tween()
          .call(() => {
            const vine = cc.instantiate(this.vinePrefab);

            if (aux !== 1) {
              vine.getComponent(cc.BoxCollider).destroy();
              firstVineCollider.size.height += 16;
              firstVineCollider.offset.y += 8;
            } else {
              firstVineCollider = vine.getComponent(cc.BoxCollider);
            }

            this.vinesNode.addChild(vine);

            vine.setPosition(cc.v3(0, aux * 16, 0));

            aux += 1;
          })
          .repeat(
            this.nVines - 2,
            cc
              .tween()
              .delay(0.3)
              .call(() => {
                const vine = cc.instantiate(this.vinePrefab);

                if (aux !== 1) {
                  vine.getComponent(cc.BoxCollider).destroy();
                  firstVineCollider.size.height += 16;
                  firstVineCollider.offset.y += 8;
                } else {
                  firstVineCollider = vine.getComponent(cc.BoxCollider);
                }

                this.vinesNode.addChild(vine);

                vine.setPosition(cc.v3(0, aux * 16, 0));

                aux += 1;
              })
          )
          .delay(0.3)
          .call(() => {
            const vine = cc.instantiate(this.vinePrefab);

            vine.getComponent(cc.BoxCollider).destroy();
            firstVineCollider.size.height += 16;
            firstVineCollider.offset.y += 8;

            this.vinesNode.addChild(vine);

            vine.setPosition(cc.v3(0, aux * 16, 0));

            this.node.destroy();
          }),
        cc
          .tween()
          .to(0.3 * (this.nVines - 1), { position: cc.v2(0, this.node.getPosition().y + 16 * (this.nVines - 1)) })
      )
      .start();
  }
}
