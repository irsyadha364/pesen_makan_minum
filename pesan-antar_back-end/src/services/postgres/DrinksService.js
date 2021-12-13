const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const AuthorizationError = require('../../exception/AuthorizationError')



class DrinkService{
    constructor(){
        this._pool = new Pool()
    }
    async addDrink({name , price , shops_id , owner}){
        const id = "drink-" + nanoid(16);

        const createdAt = new Date().toISOString()
        const insertAt = createdAt;

        const query = {
            text: 'INSERT INTO drinks VALUES($1, $2, $3 , $4 , $5 , $6 , $7) RETURNING id',
            values: [id, name , price , createdAt , insertAt , shops_id , owner],
        };

        const result = await this._pool.query(query)

        if (!result.rows[0].id) {
            throw new InvariantError('Food failed added')
        }
        return result.rows[0].id;

    }

    async getDrink(owner){
        const query = {
            text: `SELECT  
            d.name , d.price FROM shops s 
            INNER JOIN drinks d ON s.id = d.shops_id 
            WHERE s.owner = $1 `,
            values: [owner],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Drinks tidak ditemukan');
        }
        return result.rows.map(drink => ({name : drink.name , price : drink.price})) 
    }

}

module.exports   = DrinkService