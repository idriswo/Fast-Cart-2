---
description: Saqlash — корро дар PROGRESS.md сабт кун, ба GitHub commit ва push кун
---

Ту бояд ҳолати лоиҳаро нигоҳ дорӣ. Қадамҳо:

1. **PROGRESS.md-ро нав кун** — ҳамаи корҳое, ки дар ин session кардӣ, бо тафсилот сабт кун:
   - Чӣ кор иҷро шуд (фаза ва вазифаҳои тамомшуда).
   - Ҳолати ҳозираи лоиҳа.
   - Қадами навбатӣ (next steps) — то ҳангоми `/start` корро давом дода тавонӣ.
   - Санаи имрӯза.

2. **GitHub repository** — агар ҳанӯз remote (`origin`) пайваст нашуда бошад:
   - Аввал санҷ: `git remote -v`.
   - Агар набошад, GitHub repository бисоз ва пайваст кун (gh CLI ё дастӣ бо token).
   - Агар auth набошад, аз корбар token/login пурс.

3. **Commit ва push**:
   - `git add -A`
   - `git commit -m "<паёми мухтасари корҳои ин session>"`
   - `git push -u origin main`

Дар охир ба корбар ҳисобот деҳ: чӣ commit шуд ва ба кадом repo push шуд.
