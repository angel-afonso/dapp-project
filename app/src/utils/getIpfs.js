import Ipfs from 'ipfs'
let ipfsInstance = null

export async function ipfs({ commands }) {
    if (ipfsInstance) {
        return ipfsInstance;
    } else if (window.ipfs && window.ipfs.enable) {
        ipfsInstance = await window.ipfs.enable({ commands })
    } else {
        try {
            ipfsInstance = await Ipfs.create()
        } catch (error) {
            ipfsInstance = null
        }
    }
    return ipfsInstance
}