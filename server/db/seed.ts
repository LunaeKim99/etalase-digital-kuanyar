import { db } from './client.js'
import { users, umkm, products, posts, postImages, categories as categoriesTbl, villageProfile, potensiCategories, potensiItems, potensiImages, potensiFeatures } from './schema.js'
import { hashPassword } from '../middleware/password.js'
import * as mockData from '../data/mockData.js'
import { sql, eq } from 'drizzle-orm'

// Import potensi data types and data
const potensiData = {
  categories: [
    { slug: 'konveksi', title: 'Konveksi', description: 'Usaha konveksi pakaian yang menyerap tenaga kerja lokal dan memasarkan produk ke dalam maupun luar kota.', icon: 'Shirt', color: 'bg-primary-container text-on-primary-container', lightColor: 'bg-primary-container text-on-primary-container' },
    { slug: 'umkm-makanan', title: 'UMKM Makanan', description: 'Usaha catering dan bakery dengan produk unggulan khas Desa Kuanyar.', icon: 'UtensilsCrossed', color: 'bg-tertiary-container text-on-tertiary-container', lightColor: 'bg-tertiary-container text-on-tertiary-container' },
    { slug: 'pertanian', title: 'Pertanian', description: 'Sektor pertanian unggulan dengan komoditas padi dan jagung, didukung kelompok tani aktif.', icon: 'Wheat', color: 'bg-secondary-container text-on-secondary-container', lightColor: 'bg-secondary-container text-on-secondary-container' },
  ],
  items: [
    {
      id: 'konveksi-1',
      name: 'MYG Collection',
      description: 'Usaha konveksi milik Bapak H. Miftah yang memproduksi celana cewek dan cowok dengan kapasitas sekitar 1.000 pcs per bulan. MYG Collection menerima pesanan custom sesuai permintaan pelanggan.',
      images: ['/images/potensi/konveksi-1/IMG_7875.jpg', '/images/potensi/konveksi-1/IMG_7876.jpg', '/images/potensi/konveksi-1/IMG_7877.jpg', '/images/potensi/konveksi-1/IMG_7878.jpg'],
      category: 'konveksi',
      owner: 'Bapak H. Miftah',
      rtRw: 'RT 03/RW 02',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 2015,
      capacity: '1.000 pcs/bulan',
      features: ['Celana cewek & cowok', 'Pesanan custom', 'Distribusi via sales & agen'],
      contact: { whatsapp: '628708530076' },
      isSector: false,
      sectorData: null,
    },
    {
      id: 'konveksi-2',
      name: 'Reza Collection',
      description: 'Usaha konveksi milik Ibu Nur Aini yang memproduksi atasan seragam sekolah, celana anak, dan celana dewasa. Melayani pesanan custom dengan kapasitas 200 pcs per minggu, termasuk penjualan grosir ke Pasar Kliwon.',
      images: ['/images/potensi/konveksi-2/IMG_7882.jpg', '/images/potensi/konveksi-2/IMG_7883.jpg', '/images/potensi/konveksi-2/IMG_7884.jpg', '/images/potensi/konveksi-2/IMG_7885.jpg', '/images/potensi/konveksi-2/IMG_7887.jpg'],
      category: 'konveksi',
      owner: 'Ibu Nur Aini',
      rtRw: 'RT 03/RW 02',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 1997,
      capacity: '200 pcs/minggu',
      features: ['Atasan seragam sekolah', 'Celana anak & dewasa', 'Grosir ke Pasar Kliwon'],
      contact: { whatsapp: '6281227110647' },
      isSector: false,
      sectorData: null,
    },
    {
      id: 'konveksi-3',
      name: 'Mila Collection',
      description: 'Usaha konveksi milik Hj. Solikin yang memproduksi celana kulot dan celana cewek dengan kapasitas sekitar 500 pcs per minggu. Produk didistribusikan melalui pengiriman.',
      images: ['/images/potensi/konveksi-3/IMG_7935.jpg', '/images/potensi/konveksi-3/IMG_7936.jpg', '/images/potensi/konveksi-3/IMG_7942.jpg'],
      category: 'konveksi',
      owner: 'Hj. Solikin',
      rtRw: 'RT 01/RW 01',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 2004,
      capacity: '500 pcs/minggu',
      features: ['Celana kulot & cewek', 'Distribusi via pengiriman', 'Kapasitas 500 pcs/minggu'],
      contact: { marketplace: 'Pemesanan via WhatsApp' },
      isSector: false,
      sectorData: null,
    },
    {
      id: 'konveksi-4',
      name: 'Mudah Collection',
      description: 'Usaha konveksi milik Bu Mahmudah yang memproduksi berbagai jenis celana: kulot, pendek, dan panjang. Pemasaran dilakukan melalui TikTok dan melayani pesanan grosir ke Surabaya, Jepara, Demak, dan Kudus.',
      images: ['/images/potensi/konveksi-4/bce7c4a8-4b28-4538-a83b-dde7f918934b.jpeg', '/images/potensi/konveksi-4/d3e3ca4f-fab8-40c1-ac0e-f4114fde6ec7.jpeg'],
      category: 'konveksi',
      owner: 'Bu Mahmudah',
      rtRw: 'RT 03/RW 02',
      dusun: 'Mayong, Kuanyar',
      yearFounded: null,
      capacity: null,
      features: ['Celana kulot, pendek, panjang', 'Jualan via TikTok', 'Grosir ke Surabaya/Jepara/Demak/Kudus'],
      contact: { tiktok: 'Mudah Collection', marketplace: 'Grosir ke Surabaya, Jepara, Demak, Kudus' },
      isSector: false,
      sectorData: null,
    },
    {
      id: 'umkm-makanan-1',
      name: 'Dahlia Jaya Catering',
      description: 'Usaha catering milik Ibu Dwi Ratna Safitri yang menyediakan nasi box, jajan basah, bento, kue ulang tahun, tumpeng, dan snack. Produk unggulan: nasi box ayam bakar. Melayani hajatan, rapat, acara desa, dan prasmanan.',
      images: ['/images/potensi/umkm-makanan-1/IMG_7969.jpg', '/images/potensi/umkm-makanan-1/IMG_7971.jpg', '/images/potensi/umkm-makanan-1/IMG_7972.jpg', '/images/potensi/umkm-makanan-1/IMG_7973.jpg', '/images/potensi/umkm-makanan-1/IMG_7974.jpg', '/images/potensi/umkm-makanan-1/IMG_7976.jpg', '/images/potensi/umkm-makanan-1/IMG_7977.jpg'],
      category: 'umkm-makanan',
      owner: 'Ibu Dwi Ratna Safitri',
      rtRw: 'RT 05/RW 02',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 2016,
      capacity: '~30 pelanggan/bulan',
      features: ['Nasi box ayam bakar (unggulan)', 'Jajan basah, bento, tumpeng, snack', 'Catering hajatan & rapat'],
      contact: { whatsapp: '6282224311491', instagram: 'dahliajayacatering', tiktok: 'Dahlia Jaya 1' },
      isSector: false,
      sectorData: null,
    },
    {
      id: 'umkm-makanan-2',
      name: 'Naning Bakery',
      description: 'Usaha catering dan bakery milik Ibu Naning yang menyediakan jajan basah, kue, roti, dessert, hingga nasi box savory. Produk unggulan: roti pisang. Menerima pesanan custom untuk hajatan, rapat, dan acara lainnya.',
      images: ['/images/potensi/umkm-makanan-2/IMG_8013.jpg', '/images/potensi/umkm-makanan-2/IMG_8014.jpg'],
      category: 'umkm-makanan',
      owner: 'Ibu Naning',
      rtRw: 'RT 04/RW 03',
      dusun: 'Mayong, Kuanyar',
      yearFounded: 2014,
      capacity: '~100 pesanan/bulan',
      features: ['Roti pisang (unggulan)', 'Jajan basah, kue, roti, dessert', 'Nasi box savory'],
      contact: { whatsapp: '6285701601135' },
      isSector: false,
      sectorData: null,
    },
    {
      id: 'pertanian-1',
      name: 'Pertanian',
      description: 'Sektor pertanian merupakan salah satu potensi unggulan di Desa Kuanyar, dengan komoditas utama berupa padi dan jagung. Padi menjadi hasil pertanian yang paling banyak dihasilkan sekaligus menjadi salah satu ciri khas Desa Kuanyar.',
      images: ['/images/potensi/pertanian-1/IMG_7961.jpg', '/images/potensi/pertanian-1/IMG_7962.jpg'],
      category: 'pertanian',
      owner: null,
      rtRw: null,
      dusun: null,
      yearFounded: null,
      capacity: null,
      features: null,
      contact: null,
      isSector: true,
      sectorData: {
        komoditas: [
          { nama: 'Padi', deskripsi: 'Hasil pertanian terbanyak sekaligus menjadi ciri khas Desa Kuanyar.' },
          { nama: 'Jagung', deskripsi: 'Ditanam pada Musim Tanam 3 (MT3), diolah menjadi nto-nto maupun digunakan sebagai bahan campuran produk catering.' },
        ],
        musimTanam: [
          { musim: 'MT1', lahanAktif: '80%', lahanKosong: '20%' },
          { musim: 'MT2', lahanAktif: '90%', lahanKosong: '10%' },
          { musim: 'MT3', lahanAktif: '20% (jagung)', lahanKosong: '80%' },
        ],
        kelompokTani: ['Karya Bhakti 1', 'Karya Bhakti 2', 'Mudi Rejeki', 'Bhakti Jaya'],
        pemasaran: 'Hasil umumnya untuk kebutuhan pribadi dan dijual ke pengkulak. MT1 lebih sering dijual karena kendala penjemuran padi. MT2 dijual ketika harga dianggap menguntungkan, bahkan dapat disimpan hingga musim tanam berikutnya. Sebagian hasil juga diolah menjadi produk turunan seperti nto-nto dari jagung.',
        modernisasi: 'Pemerintah Desa Kuanyar mendorong modernisasi pertanian melalui penggunaan bibit unggul serta pemanfaatan alsintan (alat dan mesin pertanian).',
      },
    },
  ],
  getAllItems() { return this.items },
}

function kebabCase(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '-')
}

async function countRows(): Promise<{ users: number; umkm: number; products: number; posts: number; villageProfile: number; potensiCategories: number; potensiItems: number }> {
  const safe = async (t: string) => {
    try {
      const r = await db.run(sql`SELECT COUNT(*) as c FROM ${sql.identifier(t)}`)
      return Number(r.rows?.[0]?.c ?? 0)
    } catch {
      return 0
    }
  }
  return {
    users: await safe('users'),
    umkm: await safe('umkm'),
    products: await safe('products'),
    posts: await safe('posts'),
    villageProfile: await safe('village_profile'),
    potensiCategories: await safe('potensi_categories'),
    potensiItems: await safe('potensi_items'),
  }
}

async function seed() {
  console.log('Seeding database...')

  const counts = await countRows()
  const alreadySeeded =
    counts.users > 0 && counts.villageProfile > 0 && counts.umkm > 0 && counts.products > 0 && counts.posts > 0 && counts.potensiCategories > 0 && counts.potensiItems > 0
  if (alreadySeeded) {
    console.log('Database already seeded. Skipping.')
    console.log(`  users: ${counts.users}, umkm: ${counts.umkm}, products: ${counts.products}, posts: ${counts.posts}, village_profile: ${counts.villageProfile}, potensi_categories: ${counts.potensiCategories}, potensi_items: ${counts.potensiItems}`)
    return
  }

  const now = new Date().toISOString()

  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  await db.insert(users)
    .values({
      name: 'Administrator',
      email: 'admin@kuanyar.desa.id',
      passwordHash: hashPassword(adminPassword),
      role: 'admin',
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing({ target: users.email })
    .catch((e) => console.warn('admin insert skipped:', e.message))

  const userRows = [
    { id: 2, name: 'H. Miftah', email: 'miftah@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 3, name: 'Nur Aini', email: 'nuraini@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 4, name: 'Hj. Solikin', email: 'solikin@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 5, name: 'Mahmudah', email: 'mahmudah@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 6, name: 'Dwi Ratna Safitri', email: 'dwi.ratna@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 7, name: 'Naning', email: 'naning@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 8, name: 'Iswati', email: 'iswati@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 9, name: 'Pak Anyam', email: 'anyaman@kuanyar.desa.id', role: 'umkm_owner' as const },
    { id: 10, name: 'Pak Ukir', email: 'ukirjati@kuanyar.desa.id', role: 'umkm_owner' as const },
  ]

  for (const u of userRows) {
    await db.insert(users)
      .values({
        id: u.id,
        name: u.name,
        email: u.email,
        passwordHash: hashPassword('owner123'),
        role: u.role,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: users.email })
      .catch((e) => console.warn(`user ${u.email} insert skipped:`, e.message))
  }

  const categoryRows = mockData.categories.map((c) => ({ name: c, slug: kebabCase(c) }))
  for (const c of categoryRows) {
    await db.insert(categoriesTbl).values(c).onConflictDoNothing({ target: categoriesTbl.slug }).catch((e) => console.warn(`category ${c.slug} skipped:`, e.message))
  }

  const umkmRows = mockData.umkms.map((u) => ({
    id: u.id,
    ownerId: u.ownerId,
    name: u.name,
    description: u.description,
    address: u.address,
    whatsapp: u.whatsapp,
    logo: u.logo,
    status: u.status as 'pending' | 'approved' | 'rejected',
    createdAt: now,
    updatedAt: now,
  }))
  for (const u of umkmRows) {
    await db.insert(umkm).values(u).onConflictDoNothing({ target: umkm.id }).catch((e) => console.warn(`umkm ${u.id} skipped:`, e.message))
  }

  const productRows = mockData.products.map((p) => ({
    id: p.id,
    umkmId: p.umkmId,
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.image,
    stock: p.stock,
    status: p.status as 'active' | 'draft' | 'inactive',
    createdAt: now,
    updatedAt: now,
  }))
  for (const p of productRows) {
    await db.insert(products).values(p).onConflictDoNothing({ target: products.id }).catch((e) => console.warn(`product ${p.id} skipped:`, e.message))
  }

  for (const post of mockData.posts) {
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
      .catch((e) => console.warn(`post ${post.slug} skipped:`, e.message))

    for (const img of post.images) {
      await db.insert(postImages)
        .values({
          postId: post.id,
          imageUrl: img.imageUrl,
          caption: img.caption ?? null,
          sortOrder: img.sortOrder ?? 0,
        })
        .onConflictDoNothing()
        .catch(() => {})
    }
  }

  await db.insert(villageProfile)
    .values({
      id: mockData.villageProfile.id,
      name: mockData.villageProfile.name,
      overview: mockData.villageProfile.overview,
      history: mockData.villageProfile.history,
      vision: mockData.villageProfile.vision,
      mission: mockData.villageProfile.mission,
      demographics: mockData.villageProfile.demographics,
      facilities: mockData.villageProfile.facilities,
      adminInfo: mockData.villageProfile.adminInfo,
      contactInfo: mockData.villageProfile.contactInfo,
      lat: mockData.villageProfile.lat,
      lng: mockData.villageProfile.lng,
      updatedAt: now,
    })
    .onConflictDoNothing({ target: villageProfile.id })
    .catch((e) => console.warn('village_profile skipped:', e.message))

  // Seed potensi categories
  const catSlugToId: Record<string, number> = {}
  for (const cat of potensiData.categories) {
    const result = await db.insert(potensiCategories)
      .values({
        slug: cat.slug,
        title: cat.title,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        lightColor: cat.lightColor,
        sortOrder: 0,
      })
      .onConflictDoNothing({ target: potensiCategories.slug })
      .returning({ id: potensiCategories.id })
      .catch((e) => console.warn(`potensi_category ${cat.slug} skipped:`, e.message))
    if (result && result[0]) {
      catSlugToId[cat.slug] = result[0].id
    } else {
      // Fetch existing
      const existing = await db.select({ id: potensiCategories.id }).from(potensiCategories).where(eq(potensiCategories.slug, cat.slug)).limit(1)
      if (existing[0]) catSlugToId[cat.slug] = existing[0].id
    }
  }

  // Seed potensi items
  const allPotensiItems = potensiData.getAllItems()
  for (let i = 0; i < allPotensiItems.length; i++) {
    const item = allPotensiItems[i]
    const categoryId = catSlugToId[item.category]
    if (!categoryId) {
      console.warn(`Category not found for item ${item.id}: ${item.category}`)
      continue
    }

    const itemResult = await db.insert(potensiItems)
      .values({
        categoryId,
        name: item.name,
        description: item.description,
        owner: item.owner ?? null,
        rtRw: item.rtRw ?? null,
        dusun: item.dusun ?? null,
        yearFounded: item.yearFounded ?? null,
        capacity: item.capacity ?? null,
        contact: item.contact ? JSON.stringify(item.contact) : null,
        isSector: item.isSector ?? false,
        sectorData: item.sectorData ? JSON.stringify(item.sectorData) : null,
        sortOrder: i,
        createdAt: now,
        updatedAt: now,
      })
      .returning({ id: potensiItems.id })
      .catch((e) => console.warn(`potensi_item ${item.id} skipped:`, e.message))

    if (itemResult && itemResult[0]) {
      const itemId = itemResult[0].id

      // Seed images
      for (let j = 0; j < item.images.length; j++) {
        await db.insert(potensiImages)
          .values({
            itemId,
            imageUrl: item.images[j],
            sortOrder: j,
          })
          .onConflictDoNothing()
          .catch(() => {})
      }

      // Seed features
      if (item.features) {
        for (let j = 0; j < item.features.length; j++) {
          await db.insert(potensiFeatures)
            .values({
              itemId,
              feature: item.features[j],
              sortOrder: j,
            })
            .onConflictDoNothing()
            .catch(() => {})
        }
      }
    }
  }

  const final = await countRows()
  console.log('Seed completed:')
  console.log(`  users: ${final.users}`)
  console.log(`  categories: ${categoryRows.length}`)
  console.log(`  umkm: ${final.umkm}`)
  console.log(`  products: ${final.products}`)
  console.log(`  posts: ${final.posts}`)
  console.log(`  village_profile: ${final.villageProfile}`)
  console.log(`  potensi_categories: ${final.potensiCategories}`)
  console.log(`  potensi_items: ${final.potensiItems}`)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})