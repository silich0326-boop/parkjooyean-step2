// odcloud(공공데이터포털) API 공통 호출 - 키는 환경변수에서만 읽고, 응답/오류에 키를 넣지 않음
module.exports = async function fetchRows(base, keyName, res) {
  let key = process.env[keyName] || "";
  if (!key) return res.status(500).json({ error: keyName + " 가 설정되지 않았어요" });
  if (key.includes("%")) { try { key = decodeURIComponent(key); } catch (e) {} }
  const qs = new URLSearchParams({ page: "1", perPage: "200", serviceKey: key });
  try {
    const r = await fetch(base + "?" + qs, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) return res.status(502).json({ error: "API 응답 오류 (" + r.status + ")" });
    const j = await r.json();
    res.setHeader("Cache-Control", "s-maxage=3600");
    return res.status(200).json({ totalCount: j.totalCount, data: j.data });
  } catch (e) {
    return res.status(502).json({ error: "API 호출에 실패했어요" });
  }
};