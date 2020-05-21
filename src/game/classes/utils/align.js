import gameConfig from '../../config'

class Align {
  static scaleToGameW(obj, per) {
    obj.displayWidth = window.innerWidth * per;
	  obj.scaleY = obj.scaleX;
  }
  static scaleToGameH(obj, per) {
    obj.displayHeight = window.innerHeight * per;
    obj.scaleX = obj.scaleY;
  }
  static centerH(obj) {
	obj.x = window.innerWidth / 2;
  }
  static centerV(obj) {
    obj.y = window.innerHeight / 2;
  }
  static bottom(obj) {
    obj.y = window.innerHeight;
    // obj.y = window.innerHeight - obj.displayHeight / 2;
  }
  static centerBottom(obj) {
    obj.y = window.innerHeight / 2 - obj.displayHeight / 2;
  }
  static center(obj) {
    obj.x = window.innerWidth / 2;
    obj.y = window.innerHeight / 2;
  }
  static left(obj) {
	  obj.x = obj.displayWidth / 2;
  }
  static right(obj) {
	  obj.x = window.innerWidth - obj.displayWidth / 2;
  }
  static outsideRight(obj) {
    obj.x = obj.displayWidth / 2 + window.innerWidth;
  }
}

export default Align;
