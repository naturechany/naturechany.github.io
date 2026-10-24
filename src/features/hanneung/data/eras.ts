import type { Era } from '../types';
import { prehistory } from './content/prehistory';
import { gojoseon } from './content/gojoseon';
import { threeKingdoms } from './content/three-kingdoms';
import { northSouth } from './content/north-south';
import { goryeo } from './content/goryeo';
import { joseonEarly } from './content/joseon-early';
import { joseonLate } from './content/joseon-late';
import { modern } from './content/modern';
import { colonial } from './content/colonial';
import { contemporary } from './content/contemporary';
import { themes } from './content/themes';

/**
 * 시대별 개념 데이터 (정적 콘텐츠). 시대 순서 = 학습 순서.
 * 실서비스에서는 CMS/API로 분리하고 이 구조를 그대로 응답 스키마로 쓰면 된다.
 */
export const ERAS: Era[] = [
  prehistory,
  gojoseon,
  threeKingdoms,
  northSouth,
  goryeo,
  joseonEarly,
  joseonLate,
  modern,
  colonial,
  contemporary,
  themes,
];