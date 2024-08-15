export class Connect_Wallet {
    constructor() {
        this.web3 = new Web3(window.ethereum);
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
            // Add network to MetaMask.
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [amoyChain],
            });

            // And switch to network we added.
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: amoyChain.chainId }],
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Connect MetaMask and start to update and pull data.
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
                console.log(this.userAddress);
            } catch (error) {
                console.error("Access denied, please try again.", error);
            }
        } else {
            alert("MetaMask extension is not found.");
        }
    }
}