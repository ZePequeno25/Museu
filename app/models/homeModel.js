module.exports = {
    getPaintings: (db, callback) => {
        console.log('[Model] Função que fará a leitura de trodas as obras no banco de dados');
        const sql = 'select * from obrasdearte';
        db.query(sql, callback);
    },
    addPainting: (db, painting, callback) => {
        const sql = 'INSERT INTO obrasdearte (nome, artista, ano, urlimagem) VALUES(?,?,?,?)';
        console.log('[Homme model add painting]');
        db.query(sql, [painting.nome, painting.artista, painting.ano, painting.urlimagem], callback );
    },
    getPaintingModel: (idObra, db, callback) => {
        console.log('Get painting Model');
        const sql = `SELECT * FROM obrasdearte where id = ${idObra};`;
        db.query(sql, callback);
    }
}

