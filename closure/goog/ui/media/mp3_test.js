/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

goog.module('goog.ui.media.Mp3Test');
goog.setTestOnly();

const FlashObject = goog.require('goog.ui.media.FlashObject');
const Media = goog.require('goog.ui.media.Media');
const MediaModel = goog.require('goog.ui.media.MediaModel');
const Mp3 = goog.require('goog.ui.media.Mp3');
const TagName = goog.require('goog.dom.TagName');
const dom = goog.require('goog.dom');
const testSuite = goog.require('goog.testing.testSuite');
const testing = goog.require('goog.html.testing');

let mp3;
let control;
const MP3_URL = 'http://www.shellworld.net/~davidsky/surf-oxy.mp3';
const parent = dom.createElement(TagName.DIV);

testSuite({
  setUp() {
    mp3 = Mp3.getInstance();
    const flashUrl = Mp3.buildFlashUrl(MP3_URL);
    const model = new MediaModel(MP3_URL, 'mp3 caption', '');
    model.setPlayer(
        new MediaModel.Player(testing.newTrustedResourceUrlForTest(flashUrl)));
    control = new Media(model, mp3);
    control.setSelected(true);
  },

  tearDown() {
    control.dispose();
  },

  testBasicRendering() {
    control.render(parent);
    const el =
        dom.getElementsByTagNameAndClass(TagName.DIV, Mp3.CSS_CLASS, parent);
    assertEquals(1, el.length);
  },

  testParsingUrl() {
    assertTrue(Mp3.MATCHER.test(MP3_URL));
    assertFalse(Mp3.MATCHER.test('http://invalidUrl/filename.doc'));
  },

  testCreatingDomOnInitialState() {
    control.render(parent);
    const caption = dom.getElementsByTagNameAndClass(
        TagName.DIV, Mp3.CSS_CLASS + '-caption', parent);
    assertEquals(1, caption.length);

    const flash = dom.getElementsByTagNameAndClass(
        undefined, FlashObject.CSS_CLASS, parent);
    assertEquals(1, flash.length);
  },
});
