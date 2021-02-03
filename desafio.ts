import express, {Application, Request, Response} from 'express';
import { emitWarning } from 'process';

const fs = require('fs');

const app = express();

app.use(express.json());

function leerArchivo() {
    let emptyArray: any[] = [];

    try {
        return fs.readFileSync('./producto.txt', 'utf-8').split('\n');
            
    } catch (err) {
        console.log('Error de lectura. ', err);
        return emptyArray;
    }
}

let productos: any[] = leerArchivo();

let viewsItem = 0;
let viewsRandom = 0;

app.get('/items', (req, res)=>{ //agregar cant de productos al .txt
    viewsItem++;
    res.json(productos);
})

app.get('/item-random', (req, res)=>{
    viewsRandom++;
    const randomElement = productos[Math.floor(Math.random() * productos.length)];

    res.json(randomElement);
})

app.get('/visitas', (req, res)=>{

    const visitas = {
        items: viewsItem,
        itemRandom: viewsRandom
    };

    res.json(visitas);

})


app.listen(8080, ()=>{
    console.log('Server listening - Port 8080');
})
