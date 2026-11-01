// Search the embedded KB corpora in public/Saathy.html
const fs = require("fs");
const html = fs.readFileSync("/home/z/my-project/public/Saathy.html", "utf8");
const grab = (id) => {
  const start = html.indexOf(`id="${id}">`) + id.length + 6;
  const end = html.indexOf("</script>", start);
  return JSON.parse(html.slice(start, end));
};
const term = (process.argv[2] || "photosynthesis").toLowerCase();
for (const id of ["KB_gm", "KB_sc", "KB_us"]) {
  const chapters = grab(id);
  console.log(`\n=== ${id}: ${chapters.length} chapters ===`);
  for (const ch of chapters) {
    for (const sec of ch.sections || []) {
      const title = String(sec.title || "");
      const content = String(sec.content || "");
      const tc = title.toLowerCase().split(term).length - 1;
      const cc = content.toLowerCase().split(term).length - 1;
      if (tc || cc >= 2) {
        console.log(`ch ${ch.number} "${String(ch.title).slice(0, 42)}" | §${sec.id} "${title.slice(0, 48)}" | title-x${tc} body-x${cc} len=${content.length}`);
      }
    }
  }
}
