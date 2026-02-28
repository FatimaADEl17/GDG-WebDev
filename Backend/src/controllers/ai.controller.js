const fs = require("fs");
const path = require("path");

const { generateFamilyFeudRawJSON } = require("../services/gemini.service");
const { validateFamilyFeud } = require("../utils/validateJSON");

async function getFamilyFeud(req, res, next) {
  try {
    // 1) طلب من Gemini
    const raw = await generateFamilyFeudRawJSON();

    // 2) تحويل إلى JSON
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error("Gemini did not return valid JSON only (parsing failed).");
    }

    // 3) Double check
    validateFamilyFeud(data);

    // 4) حفظ ملف داخل Backend
    const outPath = path.join(process.cwd(), "family_feud_cs_ar.json");
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf8");

    // 5) رجّع النتيجة
    return res.status(200).json({
      savedTo: "family_feud_cs_ar.json",
      ...data,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getFamilyFeud };