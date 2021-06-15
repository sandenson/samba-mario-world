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

  public nVines = 0;

  public start(): void {
    this.loop();
  }

  private loop(): void {
    let aux = 1;

    cc.tween(this.node)
      .parallel(
        cc
          .tween()
          .repeat(
            this.nVines - 1,
            cc
              .tween()
              .delay(0.3)
              .call(() => {
                const vine = cc.instantiate(this.vinePrefab);

                this.node.parent.addChild(vine);

                vine.setPosition(cc.v3(0, aux * 16, 0));

                // eslint-disable-next-line no-console
                console.log(aux);

                aux += 1;
              })
          )
          .delay(0.3)
          .call(() => {
            const vine = cc.instantiate(this.vinePrefab);

            this.node.parent.addChild(vine);

            vine.setPosition(cc.v3(0, aux * 16, 0));

            this.node.destroy();
          }),
        cc
          .tween()
          .to(0.3 * (this.nVines - 1), { position: cc.v2(0, this.node.getPosition().y + 16 * (this.nVines - 1)) })
        // .to(0.3, { position: cc.v3(position.x, position.y + 16, 0) })
      )
      .start();

    // this.node.runAction(
    //   cc.sequence(
    //     cc.repeat(
    //       cc.sequence(
    //         cc.callFunc(() => {
    //           position = this.node.getPosition();
    //         }),
    //         cc.moveTo(0.5, cc.v2(position.x, position.y + 16)),
    //         cc.callFunc(() => {
    //           const vine = cc.instantiate(this.vinePrefab);

    //           this.node.parent.addChild(vine);

    //           vine.setPosition(cc.v3(0, aux * 16, 0));

    //           // eslint-disable-next-line no-console
    //           console.log(aux);

    //           aux += 1;
    //         })
    //       ),
    //       this.nVines - 1
    //     ),
    //     cc.callFunc(() => {
    //       const vine = cc.instantiate(this.vinePrefab);

    //       this.node.parent.addChild(vine);

    //       vine.setPosition(cc.v3(0, aux * 16, 0));

    //       this.destroy();
    //     })
    //   )
    // );

    // eslint-disable-next-line no-console
    console.log('pão');
  }
}
