import jimp from 'jimp'
import { jidNormalizedUser } from 'baileys'

async function setpp({ xp }) {
  xp.setProfilePicture = async (id, buffer) => {
    try {
      id = jidNormalizedUser(id)

      const img = await jimp.read(buffer),
            buff = await img
              .scaleToFit(720, 720)
              .quality(100)
              .getBufferAsync(jimp.MIME_JPEG)

      return await xp.query({
        tag: 'iq',
        attrs: {
          ...(id.endsWith('@g.us') ? { target: id } : {}),
          to: '@s.whatsapp.net',
          type: 'set',
          xmlns: 'w:profile:picture'
        },
        content: [{
          tag: 'picture',
          attrs: { type: 'image' },
          content: buff
        }]
      })
    } catch (e) {
      throw new Error(String(e))
    }
  }
}

export default {
  setpp
}