// cs.resize.js
// automatically resize bpatchers

/*
//////    G L O B A L    //////
//////   M E T H O D S   //////
*/

/* exported loadbang */
function loadbang () {
  // Call resize function using Task. This delays execution sufficiently for the
  // patcher box to be available (it isn’t available in loadbang otherwise).
  var resizeTask = new Task(resize);
  resizeTask.schedule();
}

/*
//////     L O C A L     //////
//////   M E T H O D S   //////
*/

resize.local = 1;
/**
 * Resize the frame of the `bpatcher` that contains this `js` object.
 */
function resize () {
  if (!this.patcher || !this.patcher.box || !this.patcher.box.rect) return;

  var size = parseSize();
  if (!size) return;

  var rect = this.patcher.box.rect;
  var x = rect[0];
  var y = rect[1];
  var w = rect[2] - x;
  var h = rect[3] - y;

  // bpatchers are by default created as 128×128 frames (tested in Max 6, 7 & 8)
  // testing for a match to this size approximates only resizing on creation
  var defaultWH = 128;
  if (w === defaultWH && h === defaultWH) {
    w = size[0];
    h = size[1];
    this.patcher.box.rect = [x, y, x + w, y + h];
  }
}

parseSize.local = 1;
/**
 * Parse the target size from the `js` object’s arguments.
 * @returns {[number, number]|null} Width–height tuple if parsing successful.
 */
function parseSize () {
  var objectArguments = jsarguments
  var argumentCount = objectArguments.length;

  switch (argumentCount) {
    case 2:
      var wh = objectArguments[1];
      if (typeof wh === 'number') return [wh, wh];
      return null;
    case 3:
    default:
      var w = objectArguments[1];
      var h = objectArguments[2];
      if (typeof w === 'number' && typeof h === 'number') return [w, h];
      return null;
  }
}
