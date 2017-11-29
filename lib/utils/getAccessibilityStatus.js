"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getAccessibilityStatus(results, menuVisible, props) {
  var a11yNumResults = props.a11yNumResults,
      a11yNumSelected = props.a11yNumSelected,
      emptyLabel = props.emptyLabel,
      selected = props.selected;

  // If the menu is hidden, display info about the number of selections.

  if (!menuVisible) {
    return a11yNumSelected(selected);
  }

  // Display info about the number of matches.
  if (results.length === 0) {
    return emptyLabel;
  }

  return a11yNumResults(results);
}

exports.default = getAccessibilityStatus;