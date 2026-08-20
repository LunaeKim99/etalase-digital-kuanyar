import 'dotenv/config'
import { db } from './client.js'
import { posts, postImages } from './schema.js'
import { sql } from 'drizzle-orm'

const now = new Date().toISOString()

interface SeedBerita {
  id: number
  title: string
  slug: string
  content: string
  category: string
  publishedAt: string
  authorId: number
  coverImage?: string
  images: { imageUrl: string; caption?: string; sortOrder: number }[]
}

export const beritaRows: SeedBerita[] = [
  {
    id: 1,
    title: 'Kegiatan Maulid Nabi Fatayat NU Ranting Kuanyar',
    slug: 'peringatan-maulid-nabi-ibu-ibu-fatayat-ranting-kuanyar',
    content:
      'Kegiatan Maulid Nabi merupakan salah satu kegiatan keagamaan yang dilaksanakan oleh Fatayat NU Ranting Kuanyar sebagai bentuk kecintaan dan penghormatan kepada Nabi Muhammad SAW. Kegiatan ini menjadi momentum untuk mempererat silaturahmi antaranggota serta meningkatkan nilai-nilai keagamaan dan kebersamaan di masyarakat Desa Kuanyar.',
    category: 'Kegiatan',
    publishedAt: now,
    authorId: 1,
    coverImage: '/images/berita/maulid-nabi-fatayat/aa37489a-25b2-4133-ae7b-c8e66e925bdd.jpg',
    images: [
      { imageUrl: '/images/berita/maulid-nabi-fatayat/aa37489a-25b2-4133-ae7b-c8e66e925bdd.jpg', caption: 'Ibu-ibu Fatayat mengikuti peringatan Maulid Nabi', sortOrder: 0 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/1b9711bb-4809-45dc-867e-8f7e00146c73.jpg', caption: 'Pembacaan sholawat bersama', sortOrder: 1 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3162.PNG', caption: 'Suasana peringatan Maulid Nabi', sortOrder: 2 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3163.PNG', caption: 'Tausiyah Maulid Nabi', sortOrder: 3 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3164.PNG', caption: 'Dokumentasi bersama ibu-ibu Fatayat', sortOrder: 4 },
      { imageUrl: '/images/berita/maulid-nabi-fatayat/IMG_3165.PNG', caption: 'Kegiatan Fatayat NU Ranting Kuanyar', sortOrder: 5 },
    ],
  },
  {
    id: 2,
    title: 'Pengajian Idaroh Fatayat NU Ranting Kuanyar',
    slug: 'acara-idaroh-ibu-ibu-fatayat-ranting-kuanyar',
    content:
      'Pengajian Idaroh merupakan salah satu program unggulan Fatayat NU Ranting Kuanyar yang dilaksanakan bersama Muslimat NU. Kegiatan ini menjadi sarana untuk mempererat silaturahmi, meningkatkan pemahaman keagamaan, serta memperkuat kebersamaan antara anggota Fatayat dan Muslimat dalam menjalankan kegiatan sosial dan keagamaan di Desa Kuanyar.',
    category: 'Kegiatan',
    publishedAt: now,
    authorId: 1,
    coverImage: '/images/berita/acara-idaroh/aa37489a-25b2-4133-ae7b-c8e66e925bdd.jpg',
    images: [
      { imageUrl: '/images/berita/acara-idaroh/aa37489a-25b2-4133-ae7b-c8e66e925bdd.jpg', caption: 'Ibu-ibu Fatayat mengikuti acara Idaroh', sortOrder: 0 },
      { imageUrl: '/images/berita/acara-idaroh/1b9711bb-4809-45dc-867e-8f7e00146c73.jpg', caption: 'Pembacaan sholawat dan doa bersama', sortOrder: 1 },
    ],
  },
  {
    id: 3,
    title: 'Fatayat NU Ranting Kuanyar',
    slug: 'fatayat-nu-ranting-kuanyar',
    content:
      'Fatayat NU Ranting Kuanyar merupakan organisasi perempuan muda Nahdlatul Ulama yang berdiri pada 10 April 2018. Saat ini, Fatayat NU Ranting Kuanyar dipimpin oleh Sahabat Yasalil Sairoh sebagai ketua dan Sahabat Siti Sofiatun sebagai wakil ketua, dengan jumlah sekitar 40 anggota aktif.\n\nDalam menjalankan kegiatannya, Fatayat NU Ranting Kuanyar aktif melaksanakan berbagai kegiatan keagamaan, seperti Al-Barzanji/Dziba\'iyah, pembacaan Al-Waqi\'ah, istighosah, khataman binnadhor, yasinan, serta manaqib yang dilaksanakan secara rutin di mushola maupun rumah-rumah pengurus.\n\nBeberapa program unggulan Fatayat NU Ranting Kuanyar antara lain Pengajian Idaroh bersama Muslimat, Zarkasi yang dilaksanakan setiap tahun, serta santunan yatama bersama Banom NU. Selain itu, Fatayat juga turut berkontribusi dalam berbagai kegiatan kemasyarakatan dan membantu pelaksanaan acara bersama Badan Otonom (Banom) NU di Desa Kuanyar.\n\nFatayat NU Ranting Kuanyar juga aktif membagikan informasi dan dokumentasi kegiatannya melalui media sosial dengan nama Fatayat Ranting Kuanyar di Facebook, TikTok, dan Instagram.',
    category: 'Kegiatan',
    publishedAt: now,
    authorId: 1,
    coverImage: undefined,
    images: [],
  },
]

async function seedBerita() {
  console.log('Seeding berita...')

  // Clear old template posts first (cascade not enabled, delete images then posts)
  console.log('Clearing existing posts...')
  await db.delete(postImages).catch((e) => console.warn('clear images failed:', e.message))
  await db.delete(posts).catch((e) => console.warn('clear posts failed:', e.message))

  // Reset sqlite autoincrement sequence so IDs are deterministic
  await db.run(sql`DELETE FROM sqlite_sequence WHERE name='posts'`).catch(() => {})
  await db.run(sql`DELETE FROM sqlite_sequence WHERE name='post_images'`).catch(() => {})

  for (const post of beritaRows) {
    await db.insert(posts)
      .values({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        category: post.category,
        publishedAt: post.publishedAt,
        authorId: post.authorId,
        coverImage: post.coverImage,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: posts.slug })
      .catch((e: Error) => console.warn(`post ${post.slug} skipped:`, e.message))

    for (const img of post.images) {
      await db.insert(postImages)
        .values({
          postId: post.id,
          imageUrl: img.imageUrl,
          caption: img.caption ?? null,
          sortOrder: img.sortOrder,
        })
        .onConflictDoNothing()
        .catch(() => {})
    }
  }

  const res = await db.run(sql`SELECT COUNT(*) as c FROM posts`)
  console.log('Seed completed. Posts:', Number(res.rows?.[0]?.c ?? 0))
}

seedBerita().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})