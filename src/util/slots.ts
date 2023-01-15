/**
 * Generates a slot element with reference to other DOM node, based on `name` attribute value
 * @returns HTMLSlotElement
 */
export function generateSlot(targetName: string): HTMLSlotElement{
  const wrapper = document.createElement('slot');
  wrapper.setAttribute('name', targetName);
  return wrapper;
}
