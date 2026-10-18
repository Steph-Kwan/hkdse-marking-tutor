/**
 * DSE 判分助手 · HKDSE Marking Scheme Tutor
 * Powered by Stephen Kwan · © 2026
 * All rights reserved.
 */

import math from "./math.js";
import m1 from "./m1.js";
import m2 from "./m2.js";
import physics from "./physics.js";
import ict from "./ict.js";

// 想加科目（例如化学、生物、经济），写一个新档案再加进这个物件就好，
// 侧栏和下拉选单会自动出现。
export const SUBJECTS = {
  [math.id]: math,
  [m1.id]: m1,
  [m2.id]: m2,
  [physics.id]: physics,
  [ict.id]: ict,
};

export const SUBJECT_LIST = Object.values(SUBJECTS);
