/**
 * This class is for DND Code in Quill HTML Editor
 */
export default class QuillDND {
  private quill = null;
  private options: any = {};

  /**
   * @param {Quill} quill
   * @param {Object} options
   */
  constructor(quill, options = {}) {
    this.quill = quill;
    this.options = options ?? {};

    this.insert = this.insert.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);

    this.quill.root.addEventListener(
      'dragover',
      this.handleDragOver,
      false,
    );

    this.quill.root.addEventListener(
      'drop',
      this.handleDrop,
      false,
    );
  }

  setCaret(evt) {
    if (document.caretRangeFromPoint) {
      const selection = document.getSelection();
      const range = document.caretRangeFromPoint(
        evt.clientX,
        evt.clientY,
      );
      if (selection && range) {
        selection.setBaseAndExtent(
          range.startContainer,
          range.startOffset,
          range.startContainer,
          range.startOffset,
        );
      }
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  handleDragOver(evt) {
    evt.preventDefault();
    this.setCaret(evt);
  }

  /**
   * @param {Event} evt
   */
  handleDrop(evt) {
    evt.preventDefault();
    if (!this.options.dataName) {
      return;
    }
    const dataText = evt.dataTransfer.getData(
      this.options.dataName,
    );
    if (!dataText) {
      return;
    }
    this.setCaret(evt);
    this.insert(dataText ?? '');
  }

  /**
   * @param {String} value
   */
  insert(value) {
    const index =
      (this.quill.getSelection() || {}).index ??
      this.quill.getLength();
    this.quill.insertText(index, value);
    this.quill.setSelection(index + value.length);
  }
}
