import { Connect_Wallet } from './connect_wallet.js';

class Petrol_World {
    
}


window.onload = function () {
    const connectWallet = new Connect_Wallet(); // Sınıfı başlatıyoruz

    // Connect butonuna tıklanınca initialize metodunu çağırıyoruz
    document.getElementById('connectButton').addEventListener('click', async () => {
        await connectWallet.initialize();
    });
}