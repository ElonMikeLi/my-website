/**
 * ============================================================
 *  专辑 & 歌曲 配置文件
 * ============================================================
 *
 *  在这里填入你的音乐收藏，页面会自动加载并生成螺旋墙。
 *
 *  目录约定（你自己在仓库里建对应的文件夹放文件）：
 *
 *    pictures/        ← 专辑封面图
 *      01.jpg         ← 第 1 张专辑封面
 *      02.jpg         ← 第 2 张专辑封面
 *      ...
 *
 *    mp3/             ← 音乐文件（按专辑分子文件夹）
 *      01/            ← 第 1 张专辑的歌曲
 *        01.mp3       ← 第 1 首
 *        02.mp3       ← 第 2 首
 *        ...
 *      02/            ← 第 2 张专辑的歌曲
 *        01.mp3
 *        ...
 *
 *  编号从 01 开始，对应下面数组的顺序。
 *  封面图和音乐文件都支持 jpg/png/mp3/wav/ogg 等常见格式。
 *  如果某张专辑缺封面，自动显示渐变色背景 + 专辑名。
 *  如果某首歌缺文件，自动跳过不播放。
 *
 * ============================================================
 *  字段说明：
 *    title       [必填] 专辑名称
 *    artist      [必填] 艺人/乐队
 *    genre       [可选] 流派
 *    year        [可选] 发行年份
 *    cover       [可选] 封面图路径，不填就用 pictures/XX.jpg
 *    tracks      [可选] 歌曲列表，不填就只有 1 首合成音乐
 *      - title   歌曲名
 *      - file    音乐文件路径，不填就用 mp3/XX/YY.mp3
 *
 *  想加专辑就往数组里加对象，想删就删掉，数量不限。
 * ============================================================
 */

const ALBUM_DATA = [
  // ===== 示例：填了就是你的真实专辑，不填用默认合成音乐 =====
  //
  // {
  //   title: '专辑名称',
  //   artist: '艺人名字',
  //   genre: '摇滚',
  //   year: 2023,
  //   tracks: [
  //     { title: '第一首歌', file: 'mp3/01/01.mp3' },
  //     { title: '第二首歌', file: 'mp3/01/02.mp3' },
  //     { title: '第三首歌', file: 'mp3/01/03.mp3' },
  //   ]
  // },
  //
  // {
  //   title: '第二张专辑',
  //   artist: '另一位艺人',
  //   genre: '电子',
  //   year: 2024,
  //   tracks: [
  //     { title: 'Intro' },
  //     { title: '主打歌' },
  //     { title: 'Outro' },
  //   ]
  // },
  //
  // ===== 以下是默认占位专辑，你填了自己的之后可以删掉 =====
  { title: '高手', artist: '潘玮柏', genre: 'Pop', year: 2005, tracks: [{ title: '不得不爱 (feat. 弦子)' }] },
  { title: 'Midnight Echoes', artist: 'Luna Wave', genre: 'Electronic', year: 2023, tracks: [{ title: 'Midnight Drive' }, { title: 'Neon Rain' }, { title: 'After Hours' }] },
  { title: 'Urban Solitude', artist: 'The City Lights', genre: 'Indie', year: 2022, tracks: [{ title: 'Empty Streets' }, { title: 'Window Seat' }] },
  { title: 'Ocean Dreams', artist: 'Deep Blue', genre: 'Ambient', year: 2024, tracks: [{ title: 'Deep Dive' }, { title: 'Coral Reef' }, { title: 'Surface Light' }, { title: 'Abyss' }] },
  { title: 'Velvet Night', artist: 'Jazz Collective', genre: 'Jazz', year: 2021, tracks: [{ title: 'Smoke & Mirrors' }, { title: 'Blue Hour' }, { title: 'Last Call' }] },
  { title: 'Raw Power', artist: 'Thunder Strike', genre: 'Rock', year: 2023, tracks: [{ title: 'Ignition' }, { title: 'Highway' }, { title: 'Burn Out' }] },
  { title: 'Street Poetry', artist: 'MC Flow', genre: 'Hip Hop', year: 2024, tracks: [{ title: 'Concrete Jungle' }, { title: 'Mic Check' }, { title: 'Storyteller' }, { title: 'Cypher' }] },
  { title: 'Neon Pulse', artist: 'Synthwave Kid', genre: 'Synthwave', year: 2023, tracks: [{ title: 'Retro Future' }, { title: 'Laser Beam' }, { title: 'Digital Love' }] },
  { title: 'Folk Tales', artist: 'Mountain String', genre: 'Folk', year: 2022, tracks: [{ title: 'Wanderer' }, { title: 'Mountain Song' }, { title: 'Campfire' }] },
  { title: 'Classical Moods', artist: 'Symphony Orchestra', genre: 'Classical', year: 2020, tracks: [{ title: 'Morning Light' }, { title: 'Adagio' }, { title: 'Allegro' }, { title: 'Nocturne' }, { title: 'Finale' }] },
  { title: 'Soulful Nights', artist: 'Melody King', genre: 'R&B', year: 2023, tracks: [{ title: 'Midnight Text' }, { title: 'Come Over' }, { title: 'Stay' }] },
  { title: 'Funk Town', artist: 'Groove Masters', genre: 'Funk', year: 2022, tracks: [{ title: 'Get Down' }, { title: 'Shake It' }, { title: 'Party Time' }, { title: 'Good Vibes' }] },
  { title: 'Lo-fi Beats', artist: 'Chill Hopper', genre: 'Lo-fi', year: 2024, tracks: [{ title: 'Rainy Day' }, { title: 'Coffee Break' }, { title: 'Study Mode' }, { title: 'Sleepy' }] },
  { title: 'Island Vibes', artist: 'Reggae Roots', genre: 'Reggae', year: 2021, tracks: [{ title: 'Sunshine' }, { title: 'One Love' }, { title: 'Island Breeze' }] },
  { title: 'Heavy Storm', artist: 'Metal Force', genre: 'Metal', year: 2023, tracks: [{ title: 'Thunder' }, { title: 'Ragnarok' }, { title: 'Iron Fist' }, { title: 'Darkness' }] },
  { title: 'Country Roads', artist: 'Western Star', genre: 'Country', year: 2022, tracks: [{ title: 'Home' }, { title: 'Dust & Dreams' }, { title: 'Old Guitar' }] },
  { title: 'World Rhythm', artist: 'Global Beats', genre: 'World', year: 2024, tracks: [{ title: 'Sahara' }, { title: 'Tokyo Nights' }, { title: 'Amazon' }, { title: 'Andes' }, { title: 'Desert Wind' }] },
  { title: 'Post Rock Days', artist: 'Silent Echo', genre: 'Post Rock', year: 2023, tracks: [{ title: 'Dawn' }, { title: 'Build Up' }, { title: 'Climax' }, { title: 'Fade Away' }] },
  { title: 'Pop Sensation', artist: 'Star Bright', genre: 'Pop', year: 2024, tracks: [{ title: 'Summer Hit' }, { title: 'Heartbreak' }, { title: 'Comeback' }] },
];
