// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import FACING from '../../../characters/FACING';
import Mario from '../../../characters/mario/Mario';
import MARIO_STATES from '../../../characters/mario/MARIO_STATES';
import KeyboardController from '../../KeyboardController';

const { ccclass } = cc._decorator;

@ccclass
export default class MarioKeyboardController extends KeyboardController {
  private mario: Mario = null;

  private pressedKeys: Array<boolean> = [];

  public onKeyDown(event: cc.Event.EventKeyboard): void {
    switch (event.keyCode) {
      case cc.macro.KEY.z:
        this.mario.jump();
        break;
      case cc.macro.KEY.left:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['LEFT'] = true;
        break;
      case cc.macro.KEY.right:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['RIGHT'] = true;
        break;
      case cc.macro.KEY.down:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['DOWN'] = true;
        break;
      case cc.macro.KEY.up:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['UP'] = true;
        break;
      case cc.macro.KEY.c:
        // eslint-disable-next-line dot-notation
        this.pressedKeys['c'] = true;
        break;
      default:
        break;
    }
  }

  protected onKeyUp(event: cc.Event.EventKeyboard): void {
    switch (event.keyCode) {
      case cc.macro.KEY.left:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['LEFT'];
        break;
      case cc.macro.KEY.right:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['RIGHT'];
        break;
      case cc.macro.KEY.down:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['DOWN'];

        this.mario.state = MARIO_STATES.idle;
        break;
      case cc.macro.KEY.up:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['UP'];

        this.mario.state = MARIO_STATES.idle;
        break;
      case cc.macro.KEY.c:
        // eslint-disable-next-line dot-notation
        delete this.pressedKeys['c'];
        this.mario.runHoldDown = false;
        break;
      default:
        break;
    }
  }

  public onLoad(): void {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    this.mario = this.getComponent(Mario);
  }

  public update(dt: number): void {
    if ('LEFT' in this.pressedKeys) {
      this.mario.move(FACING.left);
    }
    if ('RIGHT' in this.pressedKeys) {
      this.mario.move(FACING.right);
    }
    if ('DOWN' in this.pressedKeys) {
      this.mario.duck();
    }
    if ('UP' in this.pressedKeys) {
      this.mario.lookUp();
    }
    if ('c' in this.pressedKeys) {
      this.mario.runHoldDown = true;
    }
  }
}
