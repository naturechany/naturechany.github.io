import type { MockExam } from '../types';
import { r74 } from './exams/r74';
import { r75 } from './exams/r75';
import { r76 } from './exams/r76';

/**
 * 기출 변형 모의고사. 최신 회차가 앞.
 * 문항은 실제 회차의 번호별 출제 주제·정답 논리를 따르되 자료와 선지는 새로 썼다(원문 저작권 보호).
 */
export const MOCK_EXAMS: MockExam[] = [r76, r75, r74];

/** 국사편찬위원회 공식 기출 자료실 — 원본 문제지·정답표 */
export const OFFICIAL_ARCHIVE_URL = 'https://www.historyexam.go.kr/pst/list.do?bbs=dat';
