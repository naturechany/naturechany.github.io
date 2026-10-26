import type { ExamImage } from '../types';

const COMMONS = 'https://commons.wikimedia.org/wiki/File:';

/**
 * 문항 자료 사진. key = `${examId}:${no}`, 파일은 public/exams/{file}.avif·.webp.
 * 표시 최대 높이 320px의 2배(긴 변 720·640px 이내)로 줄여 AVIF(q42)·WebP(q66)로 인코딩했다.
 * 실제 기출 사진은 저작권이 있어 위키미디어 공용의 자유 라이선스 사진을 골라 크기만 줄여 썼다.
 * CC BY·BY-SA·공공누리 1유형은 저작자·라이선스·출처 표시가 조건이므로 credit을 반드시 화면에 보여 준다.
 */
export const EXAM_IMAGES: Record<string, ExamImage> = {
  'r76:1': {
    file: 'r76-01',
    width: 397,
    height: 640,
    alt: '연천 전곡리에서 출토된 주먹도끼',
    credit: 'Ismoon · CC BY-SA 4.0',
    href: `${COMMONS}Handaxe._Jeongok_ri._Gyeonggi_do._National_Museum_of_Korea.jpg`,
  },
  'r76:4': {
    file: 'r76-04',
    width: 427,
    height: 640,
    alt: '부여 능산리 절터에서 출토된 금동 대향로',
    credit: 'Gary Todd · CC0',
    href: `${COMMONS}Baekje_Gilt_Bronze_Incense_Burner,_6th-7th_Cent._(30165906226).jpg`,
  },
  'r76:29': {
    file: 'r76-29',
    width: 720,
    height: 480,
    alt: '경복궁 근정전',
    credit: 'Brady Bellini · CC0',
    href: `${COMMONS}Gyeongbokgung(palace)_Geunjeongjeon(hall).jpg`,
  },
  'r75:3': {
    file: 'r75-03',
    width: 466,
    height: 640,
    alt: '경주 금관총 금관',
    credit: '국가유산청 · 공공누리 제1유형',
    href: `${COMMONS}%EA%B8%88%EA%B4%80%EC%B4%9D%EA%B8%88%EA%B4%80.jpg`,
  },
  'r75:4': {
    file: 'r75-04',
    width: 720,
    height: 540,
    alt: '능선을 따라 늘어선 고령 지산동 고분군',
    credit: '하늘도깨비 · CC BY 4.0',
    href: `${COMMONS}2014-04-06_Goryeong_Jisan-dong_Tombs.jpg`,
  },
  'r75:9': {
    file: 'r75-09',
    width: 720,
    height: 540,
    alt: '공주 송산리 고분군 1~4호분',
    credit: 'Ryuch · CC BY-SA 3.0',
    href: `${COMMONS}Tomb_No._1,2,3,4_of_Songsan-ri,_Gongju,_Korea.JPG`,
  },
  'r75:18': {
    file: 'r75-18',
    width: 427,
    height: 640,
    alt: '논산 관촉사 석조 미륵보살 입상',
    credit: 'Kwkhh · CC BY-SA 4.0',
    href: `${COMMONS}%EA%B4%80%EC%B4%89%EC%82%AC_%EC%84%9D%EC%A1%B0%EB%AF%B8%EB%A5%B5%EB%B3%B4%EC%82%B4%EC%9E%85%EC%83%81.jpg`,
  },
  'r75:50': {
    file: 'r75-50',
    width: 720,
    height: 540,
    alt: '밭 가운데 남아 있는 알뜨르 비행장 격납고, 뒤로 산방산이 보인다',
    credit: 'Mztourist · CC BY-SA 3.0',
    href: `${COMMONS}Alddreu_Airfield.JPG`,
  },
  'r74:1': {
    file: 'r74-01',
    width: 720,
    height: 480,
    alt: '바닥이 뾰족한 빗살무늬 토기',
    credit: '국립중앙박물관 · 공공누리 제1유형',
    href: `${COMMONS}%EB%B9%97%EC%82%B4%EB%AC%B4%EB%8A%AC%ED%86%A0%EA%B8%B0.jpg`,
  },
  'r74:3': {
    file: 'r74-03',
    width: 720,
    height: 575,
    alt: '돌을 계단식으로 쌓은 지안의 장군총',
    credit: 'Prcshaw · CC BY-SA 4.0',
    href: `${COMMONS}Southeast_of_Tomb_of_the_General.jpg`,
  },
  'r74:5': {
    file: 'r74-05',
    width: 720,
    height: 540,
    alt: '부여 능산리 고분군',
    credit: 'Ryuch · CC BY-SA 3.0',
    href: `${COMMONS}Tombs_in_Neungsan-ri,_Buyeo,_Korea.jpg`,
  },
  'r74:6': {
    file: 'r74-06',
    width: 720,
    height: 480,
    alt: '경주 앞바다의 대왕암',
    credit: 'Junho Jung · CC BY-SA 3.0',
    href: `${COMMONS}Korea-Gyeongju-Daewangam-Underwater_tomb_of_King_Munmu_of_Silla-01.jpg`,
  },
  'r74:8': {
    file: 'r74-08',
    width: 480,
    height: 640,
    alt: '장흥 보림사 철조 비로자나불 좌상',
    credit: 'Endurodoug · CC BY-SA 2.0',
    href: `${COMMONS}Seated_Iron_Vairocana_Buddha_of_Borimsa_Temple(%EC%9E%A5%ED%9D%A5_%EB%B3%B4%EB%A6%BC%EC%82%AC_%EC%B2%A0%EC%A1%B0%EB%B9%84%EB%A1%9C%EC%9E%90%EB%82%98%EB%B6%88%EC%A2%8C%EC%83%81).jpg`,
  },
  'r74:27': {
    file: 'r74-27',
    width: 431,
    height: 640,
    alt: '김정호가 그린 한양 지도 수선전도',
    credit: '김정호 · 퍼블릭 도메인',
    href: `${COMMONS}Korea-Joseon_map-Suseon_jeondo.jpg`,
  },
};
