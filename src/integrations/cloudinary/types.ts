export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
  resource_type: string
  created_at: string
}

export interface CloudinaryDestroyResult {
  result: 'ok' | 'not found'
}

export interface CloudinarySignatureResult {
  signature: string
  timestamp: number
  api_key: string
}
