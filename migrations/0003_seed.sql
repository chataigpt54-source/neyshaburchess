-- Initial data: site settings, static pages, and eight Champions Cup tournaments.
-- No fake news, players, galleries, dates, or results.

insert into site_settings (
  id, site_title, description, email, phone, address,
  instagram_url, eitaa_url, telegram_url, tally_suggestions_url, map_embed_url
) values (
  1,
  'هیأت شطرنج شهرستان نیشابور',
  'مرجع رسمی اخبار، مسابقات و فعالیت‌های شطرنج شهرستان نیشابور',
  'chesskhayam@gmail.com',
  null,
  'خراسان رضوی، نیشابور، خیابان فلسطین، درب ورودی هیأت فوتبال، طبقه دوم',
  'https://www.instagram.com/chessneyshabur.official',
  'https://eitaa.com/CHESSABARSHAHR',
  'https://t.me/Chesskhayyam',
  null,
  null
) on conflict (id) do nothing;

insert into static_pages (slug, title, content) values
  ('about', 'درباره هیأت', ''),
  ('contact', 'تماس با ما', '')
on conflict (slug) do nothing;

insert into tournaments (title, slug, description, status, chess_results_url, sort_order)
values
  (
    'اولین دوره جام قهرمانان شطرنج نیشابور',
    'jam-ghahramanan-1',
    '',
    'finished',
    'https://s3.chess-results.com/tnr1233602.aspx?lan=4&art=0&fed=IRI&SNode=S0',
    1
  ),
  (
    'دومین دوره جام قهرمانان شطرنج نیشابور',
    'jam-ghahramanan-2',
    '',
    'finished',
    'https://s1.chess-results.com/tnr1286061.aspx?lan=26&turdet=YES&SNode=S0',
    2
  ),
  (
    'سومین دوره جام قهرمانان شطرنج نیشابور',
    'jam-ghahramanan-3',
    '',
    'finished',
    'https://s3.chess-results.com/tnr1360364.aspx?lan=23&SNode=S0',
    3
  ),
  (
    'چهارمین دوره جام قهرمانان شطرنج نیشابور',
    'jam-ghahramanan-4',
    '',
    'finished',
    'https://s3.chess-results.com/tnr1430333.aspx?lan=1&SNode=S0',
    4
  ),
  (
    'پنجمین دوره جام قهرمانان شطرنج نیشابور',
    'jam-ghahramanan-5',
    '',
    'finished',
    'https://s2.chess-results.com/tnr1431244.aspx?lan=5&SNode=S0',
    5
  ),
  (
    'ششمین دوره جام قهرمانان شطرنج نیشابور',
    'jam-ghahramanan-6',
    '',
    'finished',
    'https://s3.chess-results.com/tnr1469355.aspx?lan=1&art=0&SNode=S0',
    6
  ),
  (
    'هفتمین دوره جام قهرمانان شطرنج نیشابور',
    'jam-ghahramanan-7',
    '',
    'finished',
    'https://s3.chess-results.com/tnr1469364.aspx?lan=1&art=0&SNode=S0',
    7
  ),
  (
    'هشتمین دوره جام قهرمانان شطرنج نیشابور',
    'jam-ghahramanan-8',
    '',
    'finished',
    'https://s3.chess-results.com/tnr1498847.aspx?lan=1&turdet=YES&SNode=S0',
    8
  )
on conflict (slug) do nothing;
