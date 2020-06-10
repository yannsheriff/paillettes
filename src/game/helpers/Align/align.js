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
  static top(obj) {
    obj.y = obj.displayHeight / 2;
  }
  static bottom(obj) {
    obj.y = window.innerHeight - obj.displayHeight / 2;
  }
  static bottomImg(obj) {
    obj.y = window.innerHeight;
  }
  static centerBottom(obj) {
    obj.y = window.innerHeight / 2 - obj.displayHeight / 2;
  }
  static center(obj) {
    obj.x = window.innerWidth / 2;
    obj.y = window.innerHeight / 2;
  }
  static centerSpine(obj, spine, scale) {
    obj.x = window.innerWidth / 2;
    obj.y = window.innerHeight / 2 + (spine.displayHeight * scale / 2);
  }
  static left(obj) {
	  obj.x = obj.displayWidth / 2;
  }
  static right(obj) {
	  obj.x = window.innerWidth - obj.displayWidth / 2;
  }
  static rightSpine(obj, spine, scale) {
    obj.x = window.innerWidth - (spine.displayWidth * scale) / 2;
  }
  static outsideRight(obj) {
    obj.x = window.innerWidth + obj.displayWidth / 2 + 10;
  }
  static outsideRightSpine(obj, spine, scale) {
    obj.x = window.innerWidth + (spine.displayWidth * scale) / 2;
  }
  static dragPosition(obj, spine, scale) {
    const placement = window.innerWidth / 2 - 280
    obj.x = placement + (spine.displayWidth * scale) / 2;
  }
  static crowdPosition(obj, spine, scale) {
    obj.x = window.innerWidth / 2 - 220;
  }
  static charactersOnGround(obj, spine, scale) {
    obj.y = window.innerHeight * 0.7;
  }
}

export default Align;
