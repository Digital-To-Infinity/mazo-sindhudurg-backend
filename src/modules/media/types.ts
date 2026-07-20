export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
  resource_type: string
}

export interface CloudinaryDestroyResult {
  result: 'ok' | 'not found'
}

export interface UploadOptions {
  folder?: string
  resource_type?: 'image' | 'video' | 'raw'
  transformation?: Record<string, unknown>[]
}
