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
  coverImage: string
  images: { imageUrl: string; caption?: string; sortOrder: number }[]
}

export const beritaRows: SeedBerita[] = [
  {
    id: 1,
    title: 'Peringatan Maulid Nabi Muhammad SAW oleh Ibu-Ibu Fatayat Ranting Kuanyar',
    slug: 'peringatan-maulid-nabi-ibu-ibu-fatayat-ranting-kuanyar',
    content:
      'Ibu-ibu Fatayat NU Ranting Kuanyar menggelar peringatan Maulid Nabi Muhammad SAW dengan penuh khidmat. Acara ini menjadi salah satu wujud kecintaan warga Desa Kuanyar terhadap kelahiran Rasulullah SAW sekaligus mempererat tali silaturahmi antarwarga.\n\nFatayat NU Ranting Kuanyar merupakan organisasi perempuan muda Nahdlatul Ulama yang berdiri pada 10 April 2018. Saat ini, organisasi ini dipimpin oleh Sahabat Yasalil Sairoh sebagai ketua dan Sahabat Siti Sofiatun sebagai wakil ketua, dengan jumlah sekitar 40 anggota aktif.\n\nDalam kegiatan keagamaan, Fatayat NU aktif melaksanakan Al-Barzanji/Dziba\'iyah, pembacaan Al-Waqi\'ah, istighosah, khataman binnadhor, yasinan, serta manaqib yang dilaksanakan secara rutin di mushola maupun rumah-rumah pengurus.\n\nPeringatan Maulid Nabi pada kesempatan kali ini diisi dengan pembacaan sholawat, tausiyah, serta doa bersama yang dihadiri ibu-ibu Fatayat dan warga sekitar. Kegiatan semacam ini menjadi wadah penguatan keimanan dan kebersamaan masyarakat Desa Kuanyar.',
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