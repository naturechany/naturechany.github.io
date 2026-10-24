import type { EraId, Ruler } from '../types';

/**
 * 시대별 왕·정부 재위(집권) 기간과 대수.
 * 기원전은 음수, 월 단위가 필요하면 소수(1948.08 = 1948년 8월).
 * 출제 빈도가 높은 왕 위주로 수록 — 대수는 실제 왕계 순서 기준이라 중간 번호가 비어 있다.
 */
export const RULERS: Partial<Record<EraId, Ruler[]>> = {
  gojoseon: [
    { dynasty: '고구려', name: '동명성왕', order: '1대', aliases: ['주몽'], start: -37, end: -19, summary: '졸본에서 고구려 건국' },
    { dynasty: '고구려', name: '유리왕', order: '2대', start: -19, end: 18, summary: '국내성 천도' },
  ],
  'three-kingdoms': [
    { dynasty: '고구려', name: '태조왕', order: '6대', start: 53, end: 146, summary: '옥저 복속, 계루부 고씨 왕위 독점 세습' },
    { dynasty: '고구려', name: '고국천왕', order: '9대', start: 179, end: 197, summary: '왕위 부자 상속, 행정적 5부, 진대법(194)' },
    { dynasty: '고구려', name: '동천왕', order: '11대', start: 227, end: 248, summary: '서안평 공격, 위 관구검 침입으로 환도성 함락' },
    { dynasty: '고구려', name: '미천왕', order: '15대', start: 300, end: 331, summary: '서안평 점령, 낙랑군 축출(313)' },
    { dynasty: '고구려', name: '고국원왕', order: '16대', start: 331, end: 371, summary: '전연 침입, 백제 근초고왕 공격으로 전사' },
    { dynasty: '고구려', name: '소수림왕', order: '17대', start: 371, end: 384, summary: '불교 수용·태학(372), 율령(373)' },
    { dynasty: '고구려', name: '광개토대왕', order: '19대', start: 391, end: 413, summary: '영락 연호, 요동 확보, 신라 구원·왜 격퇴(400)' },
    { dynasty: '고구려', name: '장수왕', order: '20대', start: 413, end: 491, summary: '광개토대왕릉비(414), 평양 천도(427), 한성 함락(475)' },
    { dynasty: '고구려', name: '문자왕', order: '21대', aliases: ['문자명왕'], start: 491, end: 519, summary: '부여 완전 편입(494), 최대 영토' },
    { dynasty: '고구려', name: '영양왕', order: '26대', start: 590, end: 618, summary: '요서 선제 공격, 살수 대첩(612), 《신집》' },
    { dynasty: '고구려', name: '영류왕', order: '27대', start: 618, end: 642, summary: '천리장성 축조 시작(631)' },
    { dynasty: '고구려', name: '보장왕', order: '28대', start: 642, end: 668, summary: '연개소문 집권, 안시성 싸움(645), 멸망(668)' },
    { dynasty: '백제', name: '온조왕', order: '1대', start: -18, end: 28, summary: '위례성에서 백제 건국' },
    { dynasty: '백제', name: '고이왕', order: '8대', start: 234, end: 286, summary: '한강 유역 장악, 6좌평·16관등, 관복' },
    { dynasty: '백제', name: '근초고왕', order: '13대', start: 346, end: 375, summary: '마한 정복, 평양성 공격(371), 《서기》' },
    { dynasty: '백제', name: '침류왕', order: '15대', start: 384, end: 385, summary: '동진에서 불교 수용(384)' },
    { dynasty: '백제', name: '비유왕', order: '20대', start: 427, end: 455, summary: '나·제 동맹(433)' },
    { dynasty: '백제', name: '개로왕', order: '21대', start: 455, end: 475, summary: '북위에 국서(472), 한성 함락 때 전사' },
    { dynasty: '백제', name: '문주왕', order: '22대', start: 475, end: 477, summary: '웅진 천도(475)' },
    { dynasty: '백제', name: '동성왕', order: '24대', start: 479, end: 501, summary: '나·제 결혼 동맹(493)' },
    { dynasty: '백제', name: '무령왕', order: '25대', start: 501, end: 523, summary: '22담로에 왕족 파견, 양과 교류' },
    { dynasty: '백제', name: '성왕', order: '26대', start: 523, end: 554, summary: '사비 천도(538), 남부여, 관산성 전사(554)' },
    { dynasty: '백제', name: '무왕', order: '30대', start: 600, end: 641, summary: '익산 미륵사 창건' },
    { dynasty: '백제', name: '의자왕', order: '31대', start: 641, end: 660, summary: '대야성 함락(642), 멸망(660)' },
    { dynasty: '신라', name: '박혁거세', order: '1대', aliases: ['혁거세'], start: -57, end: 4, summary: '신라 건국' },
    { dynasty: '신라', name: '내물 마립간', order: '17대', aliases: ['내물왕'], start: 356, end: 402, summary: '김씨 왕위 세습, 마립간 칭호' },
    { dynasty: '신라', name: '눌지 마립간', order: '19대', aliases: ['눌지왕'], start: 417, end: 458, summary: '나·제 동맹(433), 왕위 부자 상속' },
    { dynasty: '신라', name: '소지 마립간', order: '21대', aliases: ['소지왕'], start: 479, end: 500, summary: '결혼 동맹(493), 우역·시장' },
    { dynasty: '신라', name: '지증왕', order: '22대', start: 500, end: 514, summary: '국호 신라·왕 칭호(503), 우산국 복속(512)' },
    { dynasty: '신라', name: '법흥왕', order: '23대', start: 514, end: 540, summary: '율령(520), 불교 공인(527), 금관가야 병합(532)' },
    { dynasty: '신라', name: '진흥왕', order: '24대', start: 540, end: 576, summary: '화랑도, 한강 유역(553), 대가야 정복(562)' },
    { dynasty: '신라', name: '진평왕', order: '26대', start: 579, end: 632, summary: '위화부 등 관청 정비' },
    { dynasty: '신라', name: '선덕여왕', order: '27대', start: 632, end: 647, summary: '첨성대, 황룡사 9층 목탑' },
    { dynasty: '신라', name: '진덕여왕', order: '28대', start: 647, end: 654, summary: '나·당 동맹(648), 집사부(651)' },
    { dynasty: '신라', name: '태종 무열왕', order: '29대', aliases: ['무열왕', '김춘추'], start: 654, end: 661, summary: '최초 진골 왕, 백제 멸망(660)' },
    { dynasty: '신라', name: '문무왕', order: '30대', start: 661, end: 681, summary: '고구려 멸망(668), 삼국 통일(676)' },
    { dynasty: '금관가야', name: '구형왕', order: '10대', start: 521, end: 532, summary: '신라 법흥왕에게 항복' },
  ],
  'north-south': [
    { dynasty: '신라', name: '문무왕', order: '30대', start: 661, end: 681, summary: '삼국 통일 완성(676)' },
    { dynasty: '신라', name: '신문왕', order: '31대', start: 681, end: 692, summary: '김흠돌의 난, 국학, 관료전(687), 녹읍 폐지(689)' },
    { dynasty: '신라', name: '성덕왕', order: '33대', start: 702, end: 737, summary: '정전 지급(722)' },
    { dynasty: '신라', name: '경덕왕', order: '35대', start: 742, end: 765, summary: '한화 정책, 녹읍 부활(757), 불국사·석굴암' },
    { dynasty: '신라', name: '혜공왕', order: '36대', start: 765, end: 780, summary: '96각간의 난, 피살로 중대 끝' },
    { dynasty: '신라', name: '선덕왕', order: '37대', aliases: ['김양상'], start: 780, end: 785, summary: '하대 첫 왕' },
    { dynasty: '신라', name: '원성왕', order: '38대', start: 785, end: 798, summary: '독서삼품과(788)' },
    { dynasty: '신라', name: '헌덕왕', order: '41대', start: 809, end: 826, summary: '김헌창의 난(822)' },
    { dynasty: '신라', name: '흥덕왕', order: '42대', start: 826, end: 836, summary: '청해진 설치(828)' },
    { dynasty: '신라', name: '문성왕', order: '46대', start: 839, end: 857, summary: '장보고 피살' },
    { dynasty: '신라', name: '진성여왕', order: '51대', start: 887, end: 897, summary: '원종·애노의 난(889), 최치원 시무 10여 조' },
    { dynasty: '신라', name: '경애왕', order: '55대', start: 924, end: 927, summary: '견훤에게 피살(927)' },
    { dynasty: '신라', name: '경순왕', order: '56대', aliases: ['김부'], start: 927, end: 935, summary: '고려에 귀순(935)' },
    { dynasty: '발해', name: '고왕', order: '1대', aliases: ['대조영'], start: 698, end: 719, summary: '동모산에서 건국(698)' },
    { dynasty: '발해', name: '무왕', order: '2대', start: 719, end: 737, summary: '인안 연호, 장문휴 등주 공격(732)' },
    { dynasty: '발해', name: '문왕', order: '3대', start: 737, end: 793, summary: '대흥 연호, 3성 6부, 상경 천도' },
    { dynasty: '발해', name: '선왕', order: '10대', start: 818, end: 830, summary: '건흥 연호, 5경 15부 62주, 해동성국' },
    { dynasty: '발해', name: '대인선', order: '15대', start: 906, end: 926, summary: '거란에 멸망(926)' },
    { dynasty: '후백제', name: '견훤', start: 900, end: 935, summary: '완산주에서 후백제 건국, 935 고려 귀순' },
    { dynasty: '후고구려', name: '궁예', start: 901, end: 918, summary: '송악에서 건국, 마진·태봉, 철원 천도' },
  ],
  goryeo: [
    { name: '태조', order: '1대', aliases: ['왕건'], start: 918, end: 943, summary: '호족 통합, 북진, 훈요 10조, 역분전' },
    { name: '혜종', order: '2대', start: 943, end: 945, summary: '왕규의 난' },
    { name: '정종', order: '3대', start: 945, end: 949, summary: '광군 조직(947), 서경 천도 추진' },
    { name: '광종', order: '4대', start: 949, end: 975, summary: '노비안검법(956), 과거제(958), 칭제건원' },
    { name: '경종', order: '5대', start: 975, end: 981, summary: '시정 전시과(976)' },
    { name: '성종', order: '6대', start: 981, end: 997, summary: '시무 28조, 12목, 2성 6부, 국자감, 서희 담판(993)' },
    { name: '목종', order: '7대', start: 997, end: 1009, summary: '개정 전시과(998), 강조의 정변' },
    { name: '현종', order: '8대', start: 1009, end: 1031, summary: '거란 2·3차 침입, 귀주 대첩(1019), 5도 양계' },
    { name: '문종', order: '11대', start: 1046, end: 1083, summary: '경정 전시과(1076), 공음전 완비' },
    { name: '숙종', order: '15대', start: 1095, end: 1105, summary: '별무반(1104), 주전도감·해동통보' },
    { name: '예종', order: '16대', start: 1105, end: 1122, summary: '동북 9성(1107), 7재·양현고' },
    { name: '인종', order: '17대', start: 1122, end: 1146, summary: '이자겸의 난(1126), 묘청의 난(1135), 《삼국사기》' },
    { name: '의종', order: '18대', start: 1146, end: 1170, summary: '무신 정변으로 폐위' },
    { name: '명종', order: '19대', start: 1170, end: 1197, summary: '망이·망소이, 김사미·효심의 난' },
    { name: '신종', order: '20대', start: 1197, end: 1204, summary: '만적의 난(1198)' },
    { name: '고종', order: '23대', start: 1213, end: 1259, summary: '몽골 침입, 강화 천도(1232), 팔만대장경' },
    { name: '원종', order: '24대', start: 1259, end: 1274, summary: '개경 환도(1270), 삼별초 항쟁' },
    { name: '충렬왕', order: '25대', start: 1274, end: 1308, summary: '원 간섭기 시작, 관제 격하, 《삼국유사》·《제왕운기》' },
    { name: '충선왕', order: '26대', start: 1308, end: 1313, summary: '사림원, 의염창, 만권당' },
    { name: '충목왕', order: '29대', start: 1344, end: 1348, summary: '정치도감' },
    { name: '공민왕', order: '31대', start: 1351, end: 1374, summary: '반원 개혁(1356), 전민변정도감(1366)' },
    { name: '우왕', order: '32대', start: 1374, end: 1388, summary: '화통도감(1377), 진포·황산 대첩, 위화도 회군' },
    { name: '공양왕', order: '34대', start: 1389, end: 1392, summary: '과전법(1391), 마지막 왕' },
  ],
  'joseon-early': [
    { name: '태조', order: '1대', aliases: ['이성계'], start: 1392, end: 1398, summary: '조선 건국, 한양 천도(1394)' },
    { name: '정종', order: '2대', start: 1398, end: 1400, summary: '개경 환도, 2차 왕자의 난' },
    { name: '태종', order: '3대', start: 1400, end: 1418, summary: '6조 직계제, 사병 혁파, 호패법' },
    { name: '세종', order: '4대', start: 1418, end: 1450, summary: '집현전, 훈민정음, 4군 6진, 공법' },
    { name: '문종', order: '5대', start: 1450, end: 1452, summary: '《고려사》 완성' },
    { name: '단종', order: '6대', start: 1452, end: 1455, summary: '계유정난(1453)' },
    { name: '세조', order: '7대', start: 1455, end: 1468, summary: '6조 직계제 부활, 직전법(1466)' },
    { name: '성종', order: '9대', start: 1469, end: 1494, summary: '《경국대전》(1485), 홍문관' },
    { name: '연산군', order: '10대', start: 1494, end: 1506, summary: '무오·갑자사화' },
    { name: '중종', order: '11대', start: 1506, end: 1544, summary: '조광조 개혁, 기묘사화, 삼포왜란' },
    { name: '명종', order: '13대', start: 1545, end: 1567, summary: '을사사화, 을묘왜변, 직전법 폐지' },
    { name: '선조', order: '14대', start: 1567, end: 1608, summary: '동서 분당, 임진왜란·정유재란' },
    { name: '광해군', order: '15대', start: 1608, end: 1623, summary: '대동법(경기), 중립 외교' },
    { name: '인조', order: '16대', start: 1623, end: 1649, summary: '인조반정, 정묘·병자호란, 영정법' },
  ],
  'joseon-late': [
    { name: '인조', order: '16대', start: 1623, end: 1649, summary: '영정법(1635), 병자호란' },
    { name: '효종', order: '17대', start: 1649, end: 1659, summary: '북벌, 나선 정벌, 시헌력' },
    { name: '현종', order: '18대', start: 1659, end: 1674, summary: '기해·갑인예송' },
    { name: '숙종', order: '19대', start: 1674, end: 1720, summary: '환국, 상평통보, 대동법 전국, 백두산정계비' },
    { name: '경종', order: '20대', start: 1720, end: 1724, summary: '신임사화' },
    { name: '영조', order: '21대', start: 1724, end: 1776, summary: '탕평비, 균역법(1750), 《속대전》' },
    { name: '정조', order: '22대', start: 1776, end: 1800, summary: '규장각, 장용영, 수원 화성, 신해통공' },
    { name: '순조', order: '23대', start: 1800, end: 1834, summary: '세도 정치, 공노비 해방, 홍경래의 난' },
    { name: '헌종', order: '24대', start: 1834, end: 1849, summary: '풍양 조씨 세도, 기해박해' },
    { name: '철종', order: '25대', start: 1849, end: 1863, summary: '임술 농민 봉기(1862), 동학 창시' },
  ],
  modern: [
    { name: '고종', order: '26대', start: 1863, end: 1907, summary: '흥선 대원군 섭정 → 친정, 개항, 대한 제국 황제(1897)' },
    { name: '순종', order: '27대', start: 1907, end: 1910, summary: '정미 7조약, 군대 해산, 국권 피탈' },
  ],
  colonial: [
    { name: '무단 통치기', start: 1910.08, end: 1919.08, summary: '데라우치·하세가와 총독, 헌병 경찰, 토지 조사 사업' },
    { name: '문화 통치기', start: 1919.09, end: 1931.08, summary: '사이토 마코토 총독, 보통 경찰, 산미 증식 계획' },
    { name: '민족 말살 통치기', start: 1931.09, end: 1945.08, summary: '우가키·미나미·고이소·아베 총독, 병참 기지화, 황국 신민화' },
  ],
  contemporary: [
    { name: '미군정', start: 1945.09, end: 1948.08, summary: '38선 이남 직접 통치' },
    { name: '이승만 정부', order: '1~3대 대통령', aliases: ['이승만'], start: 1948.08, end: 1960.04, summary: '정부 수립, 발췌·사사오입 개헌, 4·19로 하야' },
    { name: '허정 과도 정부', aliases: ['허정'], start: 1960.04, end: 1960.08, summary: '3차 개헌(의원 내각제)' },
    { name: '장면 내각', order: '국무총리', aliases: ['장면'], start: 1960.08, end: 1961.05, summary: '의원 내각제, 5·16으로 붕괴' },
    { name: '군정', aliases: ['국가 재건 최고 회의'], start: 1961.05, end: 1963.12, summary: '5·16 군사 정변 후 국가 재건 최고 회의' },
    { name: '박정희 정부', order: '5~9대 대통령', aliases: ['박정희'], start: 1963.12, end: 1979.10, summary: '경제 개발, 한일 협정, 유신, 7·4 공동 성명' },
    { name: '최규하 정부', order: '10대 대통령', aliases: ['최규하'], start: 1979.12, end: 1980.08, summary: '12·12 사태, 5·18' },
    { name: '전두환 정부', order: '11~12대 대통령', aliases: ['전두환'], start: 1980.09, end: 1988.02, summary: '8차 개헌, 3저 호황, 6월 민주 항쟁' },
    { name: '노태우 정부', order: '13대 대통령', aliases: ['노태우'], start: 1988.02, end: 1993.02, summary: '북방 외교, 유엔 동시 가입, 남북 기본 합의서' },
    { name: '김영삼 정부', order: '14대 대통령', aliases: ['김영삼'], start: 1993.02, end: 1998.02, summary: '금융 실명제, 지방 자치제, OECD 가입, 외환 위기' },
    { name: '김대중 정부', order: '15대 대통령', aliases: ['김대중'], start: 1998.02, end: 2003.02, summary: '햇볕 정책, 6·15 남북 공동 선언' },
    { name: '노무현 정부', order: '16대 대통령', aliases: ['노무현'], start: 2003.02, end: 2008.02, summary: '개성 공단 가동, 10·4 선언, 한·칠레 FTA' },
    { name: '문재인 정부', order: '19대 대통령', aliases: ['문재인'], start: 2017.05, end: 2022.05, summary: '판문점 선언, 9·19 평양 공동 선언' },
  ],
};

/** 1948.08 → 1948, -37 → 기원전 37 */
const fmtYear = (n: number) => {
  const y = Math.floor(Math.abs(n));
  return n < 0 ? `기원전 ${y}` : `${Math.floor(n)}`;
};

export function formatReign(r: Pick<Ruler, 'start' | 'end'>): string {
  const s = fmtYear(r.start);
  const e = fmtYear(r.end);
  if (s === e) return s;
  // 기원전~기원전은 접두어 한 번만
  if (r.start < 0 && r.end < 0) return `${s}~${Math.floor(Math.abs(r.end))}`;
  return `${s}~${e}`;
}

/** 대수 표기: 고구려 20대 / 15대 / 5~9대 대통령 */
export function formatOrder(r: Ruler): string {
  return [r.dynasty, r.order].filter(Boolean).join(' ');
}

/** 본문 표기: 장수왕(고구려 20대, 413~491) */
export function formatRulerTag(r: Ruler): string {
  return [formatOrder(r), formatReign(r)].filter(Boolean).join(', ');
}