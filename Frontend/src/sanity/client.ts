import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'nv4mugkl',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const builder = createImageUrlBuilder(client)

export function hasSanityImage(source: unknown): boolean {
  if (!source || typeof source !== 'object') return false
  const img = source as { asset?: { _ref?: string; _id?: string; url?: string } }
  return Boolean(img.asset?._ref || img.asset?._id || img.asset?.url)
}

export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0])
}

export function getImageUrl(
  source: unknown,
  options?: { width?: number; height?: number },
): string | null {
  if (!hasSanityImage(source)) return null
  try {
    let imageBuilder = urlFor(source)
    if (options?.width) imageBuilder = imageBuilder.width(options.width)
    if (options?.height) imageBuilder = imageBuilder.height(options.height)
    return imageBuilder.url()
  } catch {
    return null
  }
}
