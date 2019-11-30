import Ipfs from 'ipfs'
let ipfsInstance = null

export async function ipfs({ commands }) {
    return await Ipfs.create()
}