// script.js
let currentAdIndex = 0;
const ads = document.querySelectorAll('.ads-slider .ad');

function showAd(index) {
    ads.forEach((ad, i) => {
        ad.style.display = i === index ? 'flex' : 'none';
    });
}

function nextAd() {
    currentAdIndex = (currentAdIndex + 1) % ads.length;
    showAd(currentAdIndex);
}

showAd(currentAdIndex);
setInterval(nextAd, 5000);

// script.js

document.getElementById('connectButton').addEventListener('click', function() {
    // MetaMask cüzdan bağlantı işlemleri burada yapılacak
    alert('MetaMask cüzdanı bağlanacak!');
});

class Dapp {
    constructor() {
        this.web3 = new Web3(window.ethereum); // web3 library for MetaMask
    }

    async getConnectedNetwork() {
        const networkId = await window.ethereum.request({ method: 'eth_chainId' });
        return networkId;
    }

    async switchToNetwork() {
        // Define network.
        const amoyChain = {
            chainId: '0x13882', // Polygon Amoy Testnet chainId
            chainName: 'Polygon Amoy Testnet',
            nativeCurrency: {
                name: 'Matic',
                symbol: 'MATIC',
                decimals: 18,
            },
            rpcUrls: ['https://rpc-amoy.polygon.technology/'],
            blockExplorerUrls: ['https://amoy.polygonscan.com/'],
        };

        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [amoyChain],
            });
        } catch (error) {
            console.error('Ağa geçiş başarısız:', error);
        }
    }

    async initialize() {
        if (window.ethereum) { // Check if MetaMask exists.
            try {
                const networkId = await this.getConnectedNetwork(); // Check if user is connected to the correct network
                if (networkId !== '0x13882') { // Check if connected to the correct network
                    await this.switchToNetwork(); // If user is not connected to the correct network, switch it
                }
                // Get user's MetaMask address.
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                this.userAddress = accounts[0]; // Define user's first address from MetaMask.
                await this.buildPage();
                console.log(this.userAddress);
            } catch (error) {
                console.error("Access denied, please try again.", error);
            }
        } else {
            alert("MetaMask extension is not found.");
        }
    }

    async connectWallet() {
        try {
            if (window.ethereum) {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Check connected network and switch if necessary
                const networkId = await this.getConnectedNetwork();
                if (networkId !== '0x13882') { // Eğer bağlı olduğu ağ Amoy Testnet değilse, geçiş yap
                    await this.switchToNetwork();
                }
                alert('Cüzdan başarıyla bağlandı!');
            } else {
                alert('MetaMask bulunamadı! Lütfen MetaMask eklentisini kurun.');
            }
        } catch (error) {
            console.error('Cüzdan bağlantısı başarısız:', error);
        }
    }
}

const dapp = new Dapp();

document.getElementById('connectButton').addEventListener('click', function() {
    dapp.connectWallet();
});
window.onload = async function () {
    let dapp = new Dapp();
    await dapp.initialize();
}