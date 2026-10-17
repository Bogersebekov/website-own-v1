#!/usr/bin/env python3
"""Export the three built site editions with relative links and embedded fonts. Run npm run build first."""
from pathlib import Path
import re,shutil,zipfile,base64,sys
r=Path(__file__).resolve().parents[1]
out=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else r.parent/'artifacts/haze-site/offline'
out.mkdir(parents=True,exist_ok=True)
assets=out/'assets';shutil.copytree(r/'dist/_astro',assets,dirs_exist_ok=True)
if (r/'dist/favicon.svg').exists():shutil.copyfile(r/'dist/favicon.svg',assets/'favicon.svg')
for p in assets.glob('*.css'):
 s=p.read_text().replace('/_astro/','')
 def embedFont(match):
  raw=match.group(1).strip('\"\'')
  file=assets/raw
  if file.exists() and file.suffix in ['.ttf','.woff2','.woff']:
   mime={'.ttf':'font/ttf','.woff2':'font/woff2','.woff':'font/woff'}[file.suffix]
   return 'url("data:'+mime+';base64,'+base64.b64encode(file.read_bytes()).decode()+'")'
  return match.group(0)
 s=re.sub(r'url\(([^)]+)\)',embedFont,s)
 p.write_text(s)
selected=len(sys.argv)>2 and sys.argv[2]=='selected'
refinements=len(sys.argv)>2 and sys.argv[2]=='refinements'
routeRoot='refine' if refinements else 'preview'
editions=['glow','line','facet'] if refinements else ['glass','type','diagram']
routeMap={}
for edition in editions:
 routeMap[f'/{routeRoot}/{edition}/']=edition+'.html'
 for page in ['firm','agency','interviews','life-os']:routeMap[f'/{routeRoot}/{edition}/{page}/']=f'{edition}-{page}.html'
if selected:routeMap={'/':'index.html', **{f'/{page}/':f'{page}.html' for page in ['firm','agency','interviews','life-os']}}
for route,name in routeMap.items():
 s=(r/'dist'/route.strip('/')/'index.html').read_text()
 # Astro emits inline bundled scripts here; keep any explicit local script self-contained as well.
 s=re.sub(r'(<script\b[^>]*?)\s+src="(/_astro/[^\"]+)"[^>]*>(</script>)',lambda m:'<script type="module">'+(r/'dist'/m.group(2).lstrip('/')).read_text()+'</script>',s)
 s=s.replace('/_astro/','assets/').replace('href="/favicon.svg"','href="assets/favicon.svg"')
 for old,new in sorted(routeMap.items(),key=lambda pair:len(pair[0]),reverse=True):s=s.replace('href="'+old,'href="'+new)
 (out/name).write_text(s)
if not selected:shutil.copyfile(out/(editions[0]+'.html'),out/'index.html')
readme='JETIX — три оформления\n\nРаспакуйте архив целиком и откройте index.html в браузере.\nСверху — переключатель: стеклянные плашки, типографика, схемы.\nКарточки проектов ведут на внутренние страницы в том же оформлении.\nСкриншоты кейса открываются крупно.\nПапку assets оставляйте рядом с HTML-файлами. Установка и сервер не требуются.\nЭто локальное превью, сайт не опубликован.\n'
if refinements:readme=readme.replace('стеклянные плашки, типографика, схемы','мягкое свечение, тонкий контур, срезанные углы')
if selected:readme='JETIX — выбранный стиль «Срезанные углы»\n\nРаспакуйте архив целиком и откройте index.html.\nГлавная, фирма, агентство, интервью и Life.OS связаны ссылками.\nСкриншоты кейса открываются крупно.\nПапку assets оставляйте рядом с HTML-файлами. Установка и сервер не требуются.\n'
(out/'README.txt').write_text(readme)
(assets/'licenses').mkdir(exist_ok=True)
for file in (r/'src/assets/fonts').glob('LICENSE*'):shutil.copyfile(file,assets/'licenses'/file.name)
archive=out.parent/('jetix-site.zip' if selected else 'jetix-typography-three-options.zip' if refinements else 'jetix-three-sites.zip')
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for p in out.rglob('*'):
  if p.is_file():z.write(p,p.relative_to(out))
with zipfile.ZipFile(archive) as z:assert z.testzip() is None
print('Exported',len(routeMap),'pages;',archive.stat().st_size,'bytes')
