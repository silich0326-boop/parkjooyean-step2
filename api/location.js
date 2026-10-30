// 제주 역사문화 위치정보 (위도·경도·주소)
const fetchRows = require("./_odcloud");
module.exports = (req, res) => fetchRows(
  "https://api.odcloud.kr/api/15109570/v1/uddi:8781448b-81a8-487c-bc95-d26335bafa82",
  "JEJU_CULTURE_LOCATION_KEY", res);