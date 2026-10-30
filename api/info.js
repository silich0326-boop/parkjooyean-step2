// 제주 역사문화 일반정보 (분류·제목·설명 등)
const fetchRows = require("./_odcloud");
module.exports = (req, res) => fetchRows(
  "https://api.odcloud.kr/api/15109587/v1/uddi:56c2b3a4-4b4b-46cd-a1fa-f928ef731ffb",
  "JEJU_CULTURE_INFO_KEY", res);