import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function SEO({
  title = 'Etalase Digital Desa Kuanyar',
  description = 'Temui kekayaan potensi Desa Kuanyar — konveksi, UMKM makanan, dan pertanian yang menjadi tulang punggung ekonomi desa.',
  image = 'https://etalase-kuanyar.vercel.app/og-default.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: SEOProps) {
  const location = useLocation()
  const fullUrl = url ?? `https://etalase-kuanyar.vercel.app${location.pathname}`
  const siteName = 'Etalase Digital Desa Kuanyar'

  return (
    <Helmet>
      <html lang="id" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#166534" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  )
}

export function JsonLd({ data }: { data: object }) {
  return (
    <Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Helmet>
  )
}

export const schema = {
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Etalase Digital Desa Kuanyar',
    url: 'https://etalase-kuanyar.vercel.app',
  },
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Desa Kuanyar',
    url: 'https://etalase-kuanyar.vercel.app',
  },
}

export default SEO
