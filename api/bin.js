// api/bin.js
export default async function handler(req, res) {
    const { bin } = req.query;
    const token = req.headers.authorization;
    const sellerId = req.headers['seller_id'];

    if (!bin || !token || !sellerId) {
        return res.status(400).json({ error: "Parâmetros ausentes" });
    }

    try {
        const response = await fetch(`https://api-homologacao.getnet.com.br/v1/cards/binlookup/${bin}`, {
        method: 'GET',
        headers: {
            Authorization: token,
            seller_id: sellerId
        }
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao consultar BIN', detalhes: err.message });
    }
}
